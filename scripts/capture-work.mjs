// Re-captures every project's desktop shot, phone shot and scroll loop from its live site.
// Usage: node scripts/capture-work.mjs [slug ...]
// Needs a Chromium build (set CHROME_PATH, or have Playwright's installed) and Playwright's ffmpeg for the loops.
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { projects } from "../src/data/projects.ts";

const OUT = join(import.meta.dirname, "..", "public", "work");
const PLAYWRIGHT = join(homedir(), "Library", "Caches", "ms-playwright");
const newest = (prefix) => readdirSync(PLAYWRIGHT).filter((d) => d.startsWith(prefix)).sort().at(-1);

const CHROME = process.env.CHROME_PATH ?? join(PLAYWRIGHT, newest("chromium-"), "chrome-mac-arm64", "Google Chrome for Testing.app", "Contents", "MacOS", "Google Chrome for Testing");
const FFMPEG = process.env.FFMPEG_PATH ?? join(PLAYWRIGHT, newest("ffmpeg-"), "ffmpeg-mac");
const PHONE_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const FPS = 30;

if (!existsSync(CHROME)) throw new Error(`No Chromium at ${CHROME}. Set CHROME_PATH.`);
const wanted = process.argv.slice(2);
const targets = projects.filter((p) => !wanted.length || wanted.includes(p.slug));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=9335", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
await sleep(1500);

const page = (await (await fetch("http://127.0.0.1:9335/json")).json()).find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true })).result.value;
const shoot = async (quality) => Buffer.from((await send("Page.captureScreenshot", { format: "jpeg", quality })).data, "base64");

const viewports = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false, userAgent: "" },
  phone: { width: 390, height: 844, deviceScaleFactor: 3, mobile: true, userAgent: PHONE_UA },
  loop: { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, userAgent: "" },
};

async function open(url, { userAgent, ...metrics }) {
  await send("Emulation.setDeviceMetricsOverride", metrics);
  await send("Emulation.setUserAgentOverride", { userAgent: userAgent || (await evaluate("navigator.userAgent")).replace("HeadlessChrome", "Chrome") });
  await send("Page.navigate", { url });
  await sleep(7000);
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
// Hold, scroll down, hold, scroll back: the last frame matches the first, so the loop has no seam.
function timeline(depth) {
  const frames = [0];
  const hold = (s) => { for (let i = 0; i < s * FPS; i++) frames.push(frames.at(-1)); };
  const move = (from, to, s) => { const n = s * FPS; for (let i = 1; i <= n; i++) frames.push(from + (to - from) * ease(i / n)); };
  hold(1); move(0, depth, 3.2); hold(1.2); move(depth, 0, 3.2); hold(0.4);
  return frames;
}

async function recordLoop(project) {
  await open(project.liveUrl, viewports.loop);
  // Some apps scroll an inner container instead of the document; drive whichever has the most room.
  await evaluate(`window.__scroller = (() => {
    let best = document.scrollingElement, room = best.scrollHeight - best.clientHeight;
    for (const el of document.querySelectorAll("*")) {
      const oy = getComputedStyle(el).overflowY;
      if ((oy === "auto" || oy === "scroll") && el.scrollHeight - el.clientHeight > room) { best = el; room = el.scrollHeight - el.clientHeight; }
    }
    best.style.scrollBehavior = "auto";
    return best;
  })(); 0`);
  const room = await evaluate("window.__scroller.scrollHeight - window.__scroller.clientHeight");
  const depth = Math.min(room, Math.round(viewports.loop.height * 1.6));
  await evaluate(`window.__scroller.scrollTop = ${depth}`);
  await sleep(1500);
  await evaluate("window.__scroller.scrollTop = 0");
  await sleep(800);

  const frames = [];
  for (const y of timeline(depth)) {
    await evaluate(`window.__scroller.scrollTop = ${Math.round(y)}`);
    frames.push(await shoot(92));
  }
  // Playwright's ffmpeg build reads images only through the image2pipe demuxer, from a file.
  const stream = join(tmpdir(), `${project.slug}.mjpeg`);
  writeFileSync(stream, Buffer.concat(frames));
  execFileSync(FFMPEG, ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", stream,
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1", "-pix_fmt", "yuv420p", "-an", join(OUT, `${project.slug}.webm`)]);
  rmSync(stream);
  return depth;
}

mkdirSync(OUT, { recursive: true });
await send("Page.enable");
for (const project of targets) {
  await open(project.liveUrl, viewports.desktop);
  writeFileSync(join(OUT, `${project.slug}-desktop.jpg`), await shoot(82));
  await open(project.liveUrl, viewports.phone);
  writeFileSync(join(OUT, `${project.slug}-mobile.jpg`), await shoot(85));
  const depth = await recordLoop(project);
  console.log(`${project.slug}: desktop, phone, loop (${depth}px of scroll)`);
}
ws.close();
chrome.kill();
