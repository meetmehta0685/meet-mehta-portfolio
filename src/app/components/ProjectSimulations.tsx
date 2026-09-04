"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  Zap,
  Mic,
  Cpu,
  Radio,
  MapPin,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  UserCheck,
  Stethoscope,
  FlaskConical,
  Pill,
  FileText,
  Activity
} from "lucide-react";
import { sound } from "./SoundEffects";

// ==========================================
// 1. PREPROOM SIMULATOR
// ==========================================
export function PrepRoomSimulator() {
  const [stage, setStage] = useState<"idle" | "listening" | "transcribing" | "evaluating" | "streaming" | "completed">("idle");
  const [tokens, setTokens] = useState<string[]>([]);
  const [latency, setLatency] = useState({ stt: 0, llm: 0, total: 0 });
  const timerRefs = useRef<(NodeJS.Timeout | number)[]>([]);

  const clearAllTimers = () => {
    timerRefs.current.forEach((t) => clearTimeout(t));
    timerRefs.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, []);

  const streamText = [
    "Candidate demonstrates strong grasp of distributed system consensus.",
    " Identified Paxos vs Raft tradeoffs accurately.",
    " Recommended follow-up: Ask about split-brain recovery under high packet loss."
  ];

  const runSimulation = () => {
    sound.click();
    clearAllTimers();
    setStage("listening");
    setTokens([]);
    setLatency({ stt: 0, llm: 0, total: 0 });

    const t1 = setTimeout(() => {
      setStage("transcribing");
      sound.tick();
      setLatency(prev => ({ ...prev, stt: 48 }));
    }, 600);
    timerRefs.current.push(t1);

    const t2 = setTimeout(() => {
      setStage("evaluating");
      sound.tick();
      setLatency(prev => ({ ...prev, llm: 112 }));
    }, 1200);
    timerRefs.current.push(t2);

    const t3 = setTimeout(() => {
      setStage("streaming");
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < streamText.length) {
          const nextWord = streamText[idx];
          setTokens(prev => [...prev, nextWord]);
          sound.tick();
          idx++;
        } else {
          clearInterval(interval);
          setStage("completed");
          setLatency(prev => ({ ...prev, total: 160 }));
          sound.pop();
        }
      }, 350);
      timerRefs.current.push(interval as unknown as number);
    }, 1700);
    timerRefs.current.push(t3);
  };

  const reset = () => {
    sound.click();
    clearAllTimers();
    setStage("idle");
    setTokens([]);
    setLatency({ stt: 0, llm: 0, total: 0 });
  };

  return (
    <div className="flex flex-col gap-4 p-5 bg-background border border-border-custom font-mono text-xs">
      <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-accent" />
          <span className="font-bold text-foreground tracking-wider uppercase text-[11px]">
            Live AI Streaming & Latency Inspector
          </span>
        </div>
        <div className="flex items-center gap-2">
          {stage === "idle" ? (
            <button
              onClick={runSimulation}
              className="px-3 py-1 bg-accent text-background hover:bg-transparent hover:text-accent border border-accent transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-[10.5px]"
            >
              <Play size={11} /> RUN INFERENCE PIPELINE
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-3 py-1 border border-border-custom text-foreground/80 hover:text-accent hover:border-accent transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-[10.5px]"
            >
              <RotateCcw size={11} /> RESET
            </button>
          )}
        </div>
      </div>

      {/* Latency Pipeline Stages */}
      <div className="grid grid-cols-3 gap-2 text-[10px] text-muted">
        <div className={`p-2.5 border transition-all ${stage === "transcribing" || stage === "evaluating" || stage === "streaming" || stage === "completed" ? "border-accent/40 bg-accent/5 text-foreground" : "border-border-custom bg-border-custom/5"}`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Mic size={11} className="text-accent" /> 1. WHISPER STT
          </div>
          <div className="text-[9.5px]">Latency: {latency.stt ? `${latency.stt}ms` : "—"}</div>
        </div>

        <div className={`p-2.5 border transition-all ${stage === "evaluating" || stage === "streaming" || stage === "completed" ? "border-accent/40 bg-accent/5 text-foreground" : "border-border-custom bg-border-custom/5"}`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Cpu size={11} className="text-accent" /> 2. GROQ LPU TTFT
          </div>
          <div className="text-[9.5px]">TTFT: {latency.llm ? `${latency.llm}ms` : "—"}</div>
        </div>

        <div className={`p-2.5 border transition-all ${stage === "streaming" || stage === "completed" ? "border-accent/40 bg-accent/5 text-foreground" : "border-border-custom bg-border-custom/5"}`}>
          <div className="flex items-center gap-1.5 font-bold mb-1">
            <Radio size={11} className="text-accent" /> 3. LIVEKIT STREAM
          </div>
          <div className="text-[9.5px]">Total: {latency.total ? `${latency.total}ms` : "—"}</div>
        </div>
      </div>

      {/* Stream Output Console */}
      <div className="p-3.5 bg-border-custom/10 border border-border-custom/60 min-h-[90px] flex flex-col justify-between">
        <div className="text-[10px] text-muted mb-1.5 flex justify-between">
          <span>REAL-TIME INTERVIEWER OUTPUT</span>
          <span className="text-accent font-semibold">{stage.toUpperCase()}</span>
        </div>

        <div className="text-foreground/90 font-sans text-xs leading-relaxed">
          {stage === "idle" && (
            <span className="text-muted italic font-mono text-[11px]">Click &quot;Run Inference Pipeline&quot; to simulate candidate audio evaluation...</span>
          )}
          {stage === "listening" && (
            <span className="text-accent flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" /> Ingesting candidate audio stream...
            </span>
          )}
          {tokens.map((chunk, i) => (
            <span key={i} className="transition-opacity duration-200">
              {chunk}
            </span>
          ))}
          {stage === "streaming" && (
            <span className="inline-block w-1.5 h-3 bg-accent ml-0.5 animate-pulse" />
          )}
        </div>

        {stage === "completed" && (
          <div className="mt-3 pt-2 border-t border-border-custom/40 flex justify-between items-center text-[10px] text-emerald-500 font-semibold">
            <span className="flex items-center gap-1"><CheckCircle2 size={11} /> Cryptographic report generated</span>
            <span className="font-mono text-muted">Band: 8.5 / 10</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. HARVEST RELAY SIMULATOR
// ==========================================
export function HarvestRelaySimulator() {
  const [step, setStep] = useState<number>(0);
  const [otp] = useState("7492");

  const steps = [
    { title: "Surplus Logged", desc: "Donor logs 45kg surplus food (Expiry: 3h)", icon: MapPin },
    { title: "Top-3 Spatial Match", desc: "Haversine engine scores nearby NGOs (1.2km, 2.4km, 3.8km)", icon: Sliders },
    { title: "Volunteer Dispatched", desc: "Push notification claimed via TTL expiring offer", icon: Truck },
    { title: "2-Factor OTP Verified", desc: `Tamper-proof pickup validated with OTP #${otp}`, icon: ShieldCheck }
  ];

  const advance = () => {
    sound.click();
    setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const reset = () => {
    sound.click();
    setStep(0);
  };

  return (
    <div className="flex flex-col gap-4 p-5 bg-background border border-border-custom font-mono text-xs">
      <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
        <div className="flex items-center gap-2">
          <Truck size={14} className="text-accent" />
          <span className="font-bold text-foreground tracking-wider uppercase text-[11px]">
            Geo-Dispatch &amp; Handshake Lifecycle
          </span>
        </div>
        <div className="flex items-center gap-2">
          {step < steps.length - 1 ? (
            <button
              onClick={advance}
              className="px-3 py-1 bg-accent text-background hover:bg-transparent hover:text-accent border border-accent transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-[10.5px]"
            >
              STEP FORWARD &rarr;
            </button>
          ) : (
            <button
              onClick={reset}
              className="px-3 py-1 border border-border-custom text-foreground/80 hover:text-accent hover:border-accent transition-colors font-semibold flex items-center gap-1.5 cursor-pointer text-[10.5px]"
            >
              <RotateCcw size={11} /> RESTART FLOW
            </button>
          )}
        </div>
      </div>

      {/* Progress Timeline Nodes */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = idx === step;
          const isDone = idx < step;

          return (
            <div
              key={s.title}
              className={`p-2.5 border transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? "border-accent bg-accent/10 text-foreground"
                  : isDone
                  ? "border-emerald-500/50 bg-emerald-500/5 text-foreground"
                  : "border-border-custom bg-border-custom/5 text-muted"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-bold">0{idx + 1}</span>
                <Icon size={12} className={isActive ? "text-accent" : isDone ? "text-emerald-500" : "text-muted"} />
              </div>
              <div>
                <div className="text-[10px] font-bold leading-tight">{s.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live State Machine Feed */}
      <div className="p-3.5 bg-border-custom/10 border border-border-custom/60 flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] text-muted">
          <span>EVENT PAYLOAD &amp; DB AUDIT LOG</span>
          <span className="font-semibold text-accent">STATE: {steps[step].title.toUpperCase()}</span>
        </div>
        <div className="text-foreground/90 font-sans text-xs leading-relaxed font-light">
          {steps[step].desc}
        </div>
        {step === 3 && (
          <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[10px] flex items-center justify-between">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} /> Delivery confirmed to NGO Shelter 4</span>
            <span className="font-mono font-bold">Latency: 18ms Ably Sync</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. IELTSPREP AI SIMULATOR
// ==========================================
export function IELTSPrepSimulator() {
  const [selectedSkill, setSelectedSkill] = useState<"speaking" | "writing">("speaking");
  const [activeScore, setActiveScore] = useState({ fluency: 8.5, lexical: 8.0, grammar: 7.5, pronunciation: 8.5 });

  const changeScore = (key: keyof typeof activeScore, delta: number) => {
    sound.tick();
    setActiveScore(prev => {
      const val = Math.min(9.0, Math.max(5.0, Number((prev[key] + delta).toFixed(1))));
      return { ...prev, [key]: val };
    });
  };

  const overall = (
    (activeScore.fluency + activeScore.lexical + activeScore.grammar + activeScore.pronunciation) / 4
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-4 p-5 bg-background border border-border-custom font-mono text-xs">
      <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-accent" />
          <span className="font-bold text-foreground tracking-wider uppercase text-[11px]">
            4-Criteria Rubric Scoring Matrix
          </span>
        </div>
        <div className="flex items-center gap-1 bg-border-custom/20 p-0.5 text-[10px]">
          <button
            onClick={() => { sound.click(); setSelectedSkill("speaking"); }}
            className={`px-2.5 py-1 cursor-pointer transition-colors ${selectedSkill === "speaking" ? "bg-foreground text-background font-bold" : "text-muted"}`}
          >
            SPEAKING
          </button>
          <button
            onClick={() => { sound.click(); setSelectedSkill("writing"); }}
            className={`px-2.5 py-1 cursor-pointer transition-colors ${selectedSkill === "writing" ? "bg-foreground text-background font-bold" : "text-muted"}`}
          >
            WRITING
          </button>
        </div>
      </div>

      {/* Interactive Rubric Sliders */}
      <div className="grid grid-cols-2 gap-3 text-[10.5px]">
        {[
          { key: "fluency" as const, label: "Fluency & Coherence" },
          { key: "lexical" as const, label: "Lexical Resource" },
          { key: "grammar" as const, label: "Grammatical Accuracy" },
          { key: "pronunciation" as const, label: selectedSkill === "speaking" ? "Pronunciation" : "Task Achievement" }
        ].map((item) => (
          <div key={item.key} className="p-3 border border-border-custom bg-border-custom/5 flex flex-col gap-2">
            <div className="flex justify-between text-muted font-bold text-[9.5px]">
              <span>{item.label}</span>
              <span className="text-foreground font-mono">{activeScore[item.key]}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => changeScore(item.key, -0.5)}
                className="w-8 h-8 sm:w-7 sm:h-7 border border-border-custom hover:border-accent hover:text-accent flex items-center justify-center font-bold cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={`Decrease ${item.label} score`}
              >
                -
              </button>
              <div className="flex-1 bg-border-custom/40 h-1.5 relative overflow-hidden">
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${(activeScore[item.key] / 9.0) * 100}%` }}
                />
              </div>
              <button
                onClick={() => changeScore(item.key, 0.5)}
                className="w-8 h-8 sm:w-7 sm:h-7 border border-border-custom hover:border-accent hover:text-accent flex items-center justify-center font-bold cursor-pointer text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label={`Increase ${item.label} score`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Calculated Overall Band Banner */}
      <div className="p-3.5 bg-accent/10 border border-accent/30 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[10px] text-accent font-bold uppercase">OVERALL CALCULATED BAND</span>
          <span className="text-xs text-foreground/80 font-sans mt-0.5">
            Calibrated against official CEFR C1/C2 IELTS Descriptors
          </span>
        </div>
        <div className="text-2xl font-sans font-bold text-accent">
          {overall}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. AURUM QMS SIMULATOR
// ==========================================
export function AurumQMSSimulator() {
  const [activeRole, setActiveRole] = useState<"patient" | "doctor" | "lab" | "pharmacy">("doctor");

  const roleViews = {
    patient: {
      title: "Patient Portal",
      icon: UserCheck,
      status: "Waiting for Room 204 Consultation",
      actionLabel: "View Digital Token #A-42",
      queueCount: "2 Patients ahead"
    },
    doctor: {
      title: "Doctor Consultation Desk",
      icon: Stethoscope,
      status: "Consulting: Patient Sarah Jenkins",
      actionLabel: "Order Fasting Lipid Profile & EKG",
      queueCount: "8 Consultations remaining"
    },
    lab: {
      title: "Laboratory Diagnostic Hub",
      icon: FlaskConical,
      status: "Analyzing Blood Sample #LAB-904",
      actionLabel: "Verify & Upload Automated Diagnostic PDF",
      queueCount: "3 Tests in queue"
    },
    pharmacy: {
      title: "Pharmacy Dispensing Console",
      icon: Pill,
      status: "Prescription Received from Dr. Vance",
      actionLabel: "Dispense & Sign Digital Handover",
      queueCount: "5 Orders ready"
    }
  };

  const handleRoleSelect = (role: "patient" | "doctor" | "lab" | "pharmacy") => {
    sound.click();
    setActiveRole(role);
  };

  const CurrentIcon = roleViews[activeRole].icon;

  return (
    <div className="flex flex-col gap-4 p-5 bg-background border border-border-custom font-mono text-xs">
      <div className="flex justify-between items-center border-b border-border-custom/50 pb-3">
        <div className="flex items-center gap-2">
          <Stethoscope size={14} className="text-accent" />
          <span className="font-bold text-foreground tracking-wider uppercase text-[11px]">
            Clinical Role State Machine
          </span>
        </div>
        <span className="text-[10px] text-muted font-bold">SUPABASE RLS ISOLATED</span>
      </div>

      {/* Role Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5">
        {(["patient", "doctor", "lab", "pharmacy"] as const).map((r) => (
          <button
            key={r}
            onClick={() => handleRoleSelect(r)}
            className={`p-2 border transition-all text-center uppercase tracking-wider text-[9.5px] cursor-pointer ${
              activeRole === r
                ? "border-accent bg-accent text-background font-bold"
                : "border-border-custom bg-border-custom/5 text-muted hover:text-foreground"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Department Dashboard Mock */}
      <div className="p-4 border border-border-custom/80 bg-border-custom/10 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-border-custom/40 pb-2">
          <div className="flex items-center gap-2 font-bold text-foreground text-xs">
            <CurrentIcon size={14} className="text-accent" />
            <span>{roleViews[activeRole].title}</span>
          </div>
          <span className="text-[9.5px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
            {roleViews[activeRole].queueCount}
          </span>
        </div>

        <div className="text-foreground/80 font-sans text-xs leading-relaxed">
          <strong>Current Activity:</strong> {roleViews[activeRole].status}
        </div>

        <div className="pt-2 flex items-center justify-between text-[10px]">
          <span className="text-muted flex items-center gap-1">
            <FileText size={11} /> Real-time state sync active
          </span>
          <button
            onClick={() => sound.pop()}
            className="px-3 py-1.5 border border-border-custom bg-background hover:border-accent hover:text-accent font-semibold transition-colors cursor-pointer text-[10.5px]"
          >
            {roleViews[activeRole].actionLabel} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
