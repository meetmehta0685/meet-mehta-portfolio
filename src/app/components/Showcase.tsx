"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { filters, tiles, type Filter, type Tile } from "@/data/gallery";
import { projects, shotsOf, type Project } from "@/data/projects";
import CodeSheet from "./CodeSheet";
import LoopVideo from "./LoopVideo";
import ProjectDialog from "./ProjectDialog";
import ResumeMenu from "./ResumeMenu";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Swaps the shelf inside a view transition so every tile glides to its new
// column instead of jumping. Browsers without the API just swap.
function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || reduced()) return update();
  doc.startViewTransition(() => flushSync(update));
}

function themeOf(project: Project) {
  return {
    "--field": project.theme.field,
    "--field-ink": project.theme.ink,
    "--field-soft": project.theme.soft,
    "--field-accent": project.theme.accent,
  } as CSSProperties;
}

function FilterTabs({ value, onChange }: { value: Filter; onChange: (next: Filter) => void }) {
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const place = () => {
      const tab = bar.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!tab || !pill.current) return;
      pill.current.style.width = `${tab.offsetWidth}px`;
      pill.current.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [value]);

  return (
    <div ref={bar} className="t-tabs" role="group" aria-label="Show on the shelf">
      <span ref={pill} className="t-tabs-pill" aria-hidden="true" />
      {filters.map((filter) => (
        <button key={filter.id} type="button" className="t-tab" aria-pressed={filter.id === value} onClick={() => onChange(filter.id)}>
          {filter.label}
        </button>
      ))}
    </div>
  );
}

function Caption({ title, note, mark }: { title: string; note: string; mark?: string }) {
  return (
    <span className="tile-caption">
      {mark && <span className="tile-mark" aria-hidden="true">{mark}</span>}
      <span className="tile-title">{title}</span>
      <span className="tile-note">{note}</span>
    </span>
  );
}

function TileMedia({ tile }: { tile: Tile }) {
  switch (tile.kind) {
    case "screen": {
      const shots = shotsOf(tile.project);
      return tile.view === "desktop" ? (
        <span className="stage stage-desktop">
          <span className="screen">
            <Image src={shots.desktop} alt={`${tile.project.name} on desktop`} width={2880} height={1800} sizes="(max-width: 599px) 90vw, (max-width: 1199px) 45vw, 30vw" />
            <LoopVideo src={shots.loop} />
          </span>
        </span>
      ) : (
        <span className="stage stage-phone">
          <span className="handset">
            <Image src={shots.mobile} alt={`${tile.project.name} on a phone`} width={1170} height={2532} sizes="(max-width: 599px) 60vw, 18vw" />
          </span>
        </span>
      );
    }
    case "code":
      return (
        <span className="stage stage-code">
          <CodeSheet source={tile.project.excerpt.source} />
        </span>
      );
    case "portrait":
      return (
        <span className="stage stage-photo">
          <Image src={tile.src} alt={tile.alt} width={tile.width} height={tile.height} sizes="(max-width: 599px) 90vw, (max-width: 1199px) 45vw, 22vw" />
        </span>
      );
    case "fact":
      return (
        <span className="stage stage-fact">
          <span className="fact-figure">{tile.figure}</span>
          <span className="fact-title">{tile.title}</span>
          <span className="fact-lines">
            {tile.lines.map((line) => <span key={line}>{line}</span>)}
          </span>
        </span>
      );
  }
}

function TileCard({ tile, index, onOpen }: { tile: Tile; index: number; onOpen: (slug: string) => void }) {
  const style = { viewTransitionName: `tile-${tile.id}`, "--i": index } as CSSProperties;

  if (tile.kind === "portrait" || tile.kind === "fact") {
    return (
      <li className="tile" data-kind={tile.kind} style={style}>
        <TileMedia tile={tile} />
      </li>
    );
  }

  const { project } = tile;
  const note = tile.kind === "code" ? tile.project.excerpt.path.split("/").pop()! : project.kind;
  return (
    <li className="tile" data-kind={tile.kind} style={{ ...style, ...themeOf(project) }}>
      <a
        href={`#${project.slug}`}
        className="tile-link"
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          onOpen(project.slug);
        }}
      >
        <TileMedia tile={tile} />
        <Caption title={project.name} note={note} mark={project.name[0]} />
      </a>
    </li>
  );
}

// Height of each tile per unit of column width, close enough to keep the
// columns level when tiles are dealt shortest-column first.
const heightOf: Record<Tile["kind"], (tile: Tile) => number> = {
  screen: (tile) => (tile.kind === "screen" && tile.view === "phone" ? 1.42 : 0.72),
  code: () => 1.3,
  portrait: () => 1.36,
  fact: () => 0.82,
};
const INTRO_HEIGHT = 1.15;

const breakpoints = [
  { query: "(min-width: 1200px)", columns: 4 },
  { query: "(min-width: 760px)", columns: 3 },
  { query: "(min-width: 480px)", columns: 2 },
];

function useColumnCount() {
  const [columns, setColumns] = useState(4);
  useEffect(() => {
    const lists = breakpoints.map((bp) => window.matchMedia(bp.query));
    const update = () => setColumns(breakpoints.find((_, i) => lists[i].matches)?.columns ?? 1);
    update();
    lists.forEach((list) => list.addEventListener("change", update));
    return () => lists.forEach((list) => list.removeEventListener("change", update));
  }, []);
  return columns;
}

// The intro leads the first column on wide screens and spans the top on
// phones, where the shelf is a single column anyway.
function deal(shown: Tile[], columns: number) {
  const stacks: Tile[][] = Array.from({ length: columns }, () => []);
  const heights = stacks.map((_, i): number => (i === 0 && columns > 2 ? INTRO_HEIGHT : 0));
  for (const tile of shown) {
    const i = heights.indexOf(Math.min(...heights));
    stacks[i].push(tile);
    heights[i] += heightOf[tile.kind](tile) + 0.12;
  }
  return stacks;
}

export default function Showcase({ intro }: { intro: ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const open = useCallback((slug: string | null) => {
    setOpenSlug(slug);
    const url = slug ? `#${slug}` : window.location.pathname + window.location.search;
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    const sync = () => {
      const slug = window.location.hash.slice(1);
      if (projects.some((project) => project.slug === slug)) setOpenSlug(slug);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (next: Filter) => {
    if (next === filter) return;
    withViewTransition(() => setFilter(next));
    document.getElementById("work")?.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  };

  const columns = useColumnCount();
  const shown = tiles.filter((tile) => filter === "all" || tile.shelf === filter);
  const stacks = deal(shown, columns);
  const order = new Map(shown.map((tile, i) => [tile.id, i]));
  const introTile = <div className="tile tile-intro" style={{ viewTransitionName: "tile-intro" } as CSSProperties}>{intro}</div>;

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <a href="#top" className="topbar-name">Meet Mehta</a>
          <FilterTabs value={filter} onChange={choose} />
          <nav className="topbar-links" aria-label="Sections">
            <a href="#record">Record</a>
            <a href="#contact">Contact</a>
            <ResumeMenu />
          </nav>
        </div>
      </header>

      <section id="work" className="shelf" aria-label="Work and facts">
        {columns <= 2 && introTile}
        <div className="masonry" style={{ "--columns": columns } as CSSProperties}>
          {stacks.map((stack, i) => (
            <ul key={i} className="masonry-column">
              {i === 0 && columns > 2 && <li>{introTile}</li>}
              {stack.map((tile) => (
                <TileCard key={tile.id} tile={tile} index={order.get(tile.id)!} onOpen={open} />
              ))}
            </ul>
          ))}
        </div>
      </section>

      <ProjectDialog slug={openSlug} onNavigate={open} />
    </>
  );
}
