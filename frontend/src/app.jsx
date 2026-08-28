import React, { useState, useMemo } from "react";
import {
  Leaf,
  Lock,
  Heart,
  Users,
  BookOpen,
  Home,
  ChevronRight,
  X,
  Check,
  Phone,
  ShieldCheck,
  Moon,
  Sun,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/* ==========================================================================
   BLOOM — Beyond screening. Towards continuous care.

   DESIGN TOKENS
   Color:
     --ivory:      #FAF5EC   base background, warm cream (not stark white)
     --ink:        #2E2833   primary text, near-black plum (never pure black)
     --plum:       #6E5A7B   primary brand purple, restrained, dusty — not violet/neon
     --plum-deep:  #4E3F5C   plum for text-on-light emphasis / active states
     --lavender:   #D7CBE8   soft accent surfaces, tags, quiet highlights
     --sage:       #9CAE93   "steady / grounded" signal, secondary accent
     --rose:       #D8A9A6   "tender / notice" signal, warm accent
     --paleblue:   #AFC2D6   "calm / rest" signal, cool accent
     --beige:      #EDE3D3   card surfaces, subtle contrast to ivory
     --line:       #E3D9C9   hairline borders (warm, not cold gray)

   Type:
     Display/editorial — "Fraunces" (serif, has real personality, optical
       sizing reads warm+premium rather than clinical or techy)
     Body/UI — "Inter" (quiet, highly legible, gets out of the way)

   Layout: calm single-column flows, generous whitespace, soft 1px borders
     instead of shadow-heavy cards. No large uniform rounded-corner grid.

   Signature element: the "bloom ring" — a hand-built concentric-arc SVG
     motif standing in for a line chart. Each week is a ring; ring
     thickness/opacity reflects reported steadiness, not a diagnostic
     score. It's the one place the brand's namesake actually appears as
     a *mechanism*, not just a logo — growth rendered as accumulation of
     gentle, non-alarming layers rather than a rising/falling line (a
     line implies pass/fail; rings imply accumulated care).
   ========================================================================== */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');`;

/* --------------------------------------------------------------------------
   MOCK SERVICE LAYER
   Every "backend" interaction goes through this object. Swapping to a real
   FastAPI backend later means replacing the bodies of these functions with
   fetch() calls — nothing else in the app needs to change.
   -------------------------------------------------------------------------- */
const BloomAPI = {
  async submitCheckIn(entry) {
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, id: crypto.randomUUID(), receivedAt: new Date().toISOString() };
  },
  async getTrend() {
    await new Promise((r) => setTimeout(r, 200));
    return MOCK_WEEKS;
  },
  async getSupportCircle() {
    await new Promise((r) => setTimeout(r, 150));
    return MOCK_CIRCLE;
  },
  async updateSharingPermission(personId, granted) {
    await new Promise((r) => setTimeout(r, 150));
    return { ok: true, personId, granted };
  },
};

const MOCK_WEEKS = [
  { week: "Wk 1", steadiness: 0.4, note: "Adjusting to a new rhythm" },
  { week: "Wk 2", steadiness: 0.35, note: "A few harder nights" },
  { week: "Wk 3", steadiness: 0.55, note: "Sleep improving slightly" },
  { week: "Wk 4", steadiness: 0.5, note: "Steady, some low moments" },
  { week: "Wk 5", steadiness: 0.68, note: "More settled this week" },
  { week: "Wk 6", steadiness: 0.72, note: "Feeling more like yourself" },
];

const MOCK_CIRCLE = [
  { id: "p1", name: "Aman", relation: "Partner", shared: true },
  { id: "p2", name: "Mum", relation: "Family", shared: false },
  { id: "p3", name: "Dr. Nair", relation: "OB-GYN", shared: true },
];

const RESOURCES = [
  {
    title: "Understanding the 'baby blues' vs. something longer-lasting",
    tag: "Read",
    minutes: "6 min",
  },
  {
    title: "Gentle breathing exercise for overwhelming moments",
    tag: "Practice",
    minutes: "3 min",
  },
  {
    title: "How to talk to your partner about how you're really doing",
    tag: "Read",
    minutes: "5 min",
  },
  {
    title: "Finding a perinatal mental health professional near you",
    tag: "Guide",
    minutes: "4 min",
  },
];

/* --------------------------------------------------------------------------
   PRIMITIVES
   -------------------------------------------------------------------------- */
function Shell({ children }) {
  return (
    <div
      style={{
        background: "#FAF5EC",
        color: "#2E2833",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{FONT_IMPORT}</style>
      {children}
    </div>
  );
}

function Wordmark({ size = 20 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Leaf size={size} color="#6E5A7B" strokeWidth={2} />
      <span
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 600,
          fontSize: size,
          letterSpacing: "0.01em",
        }}
      >
        BLOOM
      </span>
    </div>
  );
}

function PrivacyChip() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 999,
        border: "1px solid #E3D9C9",
        background: "#FFFFFF",
        fontSize: 12.5,
        color: "#4E3F5C",
        fontWeight: 500,
      }}
    >
      <Lock size={13} />
      Private by default — you decide what to share
    </div>
  );
}

function NavBar({ screen, setScreen, onCrisis }) {
  const items = [
    { id: "dashboard", label: "Your space", icon: Home },
    { id: "checkin", label: "Check in", icon: Heart },
    { id: "circle", label: "Support circle", icon: Users },
    { id: "resources", label: "Resources", icon: BookOpen },
  ];
  return (
    <div
      style={{
        borderBottom: "1px solid #E3D9C9",
        background: "rgba(250,245,236,0.9)",
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ cursor: "pointer" }} onClick={() => setScreen("landing")}>
          <Wordmark size={18} />
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {items.map((it) => {
            const Icon = it.icon;
            const active = screen === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setScreen(it.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 12px",
                  borderRadius: 8,
                  border: "1px solid transparent",
                  background: active ? "#EDE3D3" : "transparent",
                  color: active ? "#4E3F5C" : "#5B5460",
                  fontSize: 13.5,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                <Icon size={14} />
                {it.label}
              </button>
            );
          })}
        </div>
        <button
          onClick={onCrisis}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#8A4A45",
            background: "#F4E4E1",
            border: "1px solid #E2C3BE",
            borderRadius: 8,
            padding: "7px 12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Need urgent help?
        </button>
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E3D9C9",
        borderRadius: 14,
        padding: 22,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   BLOOM RING — signature trend visualization (replaces a generic line chart)
   -------------------------------------------------------------------------- */
function BloomRings({ weeks }) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 108;
  const minR = 34;
  const ringGap = (maxR - minR) / (weeks.length - 1);

  const colorFor = (s) => {
    if (s < 0.45) return "#D8A9A6"; // rose — tender
    if (s < 0.62) return "#D7CBE8"; // lavender — steady-ish
    return "#9CAE93"; // sage — settled
  };

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="auto" style={{ maxWidth: 260 }}>
      {weeks.map((w, i) => {
        const r = minR + i * ringGap;
        return (
          <circle
            key={w.week}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={colorFor(w.steadiness)}
            strokeWidth={ringGap * 0.62}
            opacity={0.35 + w.steadiness * 0.5}
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * r * (0.35 + w.steadiness * 0.6)} ${2 * Math.PI * r}`}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={minR - 14} fill="#FAF5EC" stroke="#E3D9C9" />
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="15"
        fill="#4E3F5C"
        fontWeight="600"
      >
        {weeks.length}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="9.5"
        fill="#8A8391"
      >
        weeks tracked
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------------------
   SCREENS
   -------------------------------------------------------------------------- */
function LandingScreen({ setScreen }) {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "64px 20px 40px" }}>
      <div style={{ marginBottom: 18 }}>
        <PrivacyChip />
      </div>
      <h1
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 500,
          fontSize: "clamp(32px, 5vw, 52px)",
          lineHeight: 1.1,
          margin: "0 0 18px",
          maxWidth: 620,
          color: "#2E2833",
        }}
      >
        Beyond screening.
        <br />
        Towards continuous care.
      </h1>
      <p style={{ fontSize: 17, lineHeight: 1.6, color: "#5B5460", maxWidth: 520, margin: "0 0 32px" }}>
        BLOOM helps you notice how you're really doing in the weeks and months
        after birth — quietly, privately, and on your own terms. No labels.
        No judgment. Just a clearer view of your own patterns, and options
        when you want them.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
        <button
          onClick={() => setScreen("checkin")}
          style={{
            background: "#6E5A7B",
            color: "#FFF",
            border: "none",
            borderRadius: 10,
            padding: "13px 22px",
            fontSize: 15,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          Start today's check-in <ArrowRight size={16} />
        </button>
        <button
          onClick={() => setScreen("dashboard")}
          style={{
            background: "transparent",
            color: "#4E3F5C",
            border: "1px solid #D9CDBF",
            borderRadius: 10,
            padding: "13px 22px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          See a sample space
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
        {[
          {
            icon: Lock,
            title: "Your space. Your choices.",
            body: "Nothing you share becomes visible to anyone else unless you explicitly turn it on.",
          },
          {
            icon: Sparkles,
            title: "Not a diagnosis",
            body: "BLOOM notices patterns and offers gentle, plain-language reflections — never a clinical label.",
          },
          {
            icon: Users,
            title: "Bring people in when ready",
            body: "Invite a partner, family member, or clinician into exactly what you choose, whenever you choose.",
          },
        ].map((f) => (
          <Card key={f.title}>
            <f.icon size={20} color="#6E5A7B" style={{ marginBottom: 10 }} />
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>
              {f.title}
            </div>
            <div style={{ fontSize: 13.5, color: "#5B5460", lineHeight: 1.5 }}>{f.body}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CheckInScreen({ setScreen }) {
  const [mood, setMood] = useState(3);
  const [sleep, setSleep] = useState(3);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const moodWords = ["Really struggling", "Having a hard time", "Getting by", "Doing alright", "Feeling good"];
  const sleepWords = ["Barely any", "Broken, little rest", "Okay, some rest", "Fairly rested", "Well rested"];

  const handleSubmit = async () => {
    setSubmitting(true);
    await BloomAPI.submitCheckIn({ mood, sleep, note, date: new Date().toISOString() });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <Check size={36} color="#9CAE93" style={{ marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, marginBottom: 10 }}>
          Thank you for checking in
        </h2>
        <p style={{ color: "#5B5460", fontSize: 14.5, lineHeight: 1.6, marginBottom: 28 }}>
          This stays in your private space. Nothing is shared with anyone
          unless you choose to share it from your support circle.
        </p>
        <button
          onClick={() => setScreen("dashboard")}
          style={{
            background: "#6E5A7B",
            color: "#FFF",
            border: "none",
            borderRadius: 10,
            padding: "12px 22px",
            fontSize: 14.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View your space
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 20px 60px" }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, marginBottom: 6 }}>
        How has today felt?
      </h2>
      <p style={{ color: "#8A8391", fontSize: 13.5, marginBottom: 32 }}>
        Two minutes. There are no right answers.
      </p>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 14 }}>Overall, today felt like…</div>
        <input
          type="range"
          min="0"
          max="4"
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#6E5A7B" }}
        />
        <div style={{ fontSize: 13.5, color: "#4E3F5C", marginTop: 8, fontWeight: 500 }}>
          {moodWords[mood]}
        </div>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 14 }}>Sleep last night</div>
        <input
          type="range"
          min="0"
          max="4"
          value={sleep}
          onChange={(e) => setSleep(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#6E5A7B" }}
        />
        <div style={{ fontSize: 13.5, color: "#4E3F5C", marginTop: 8, fontWeight: 500 }}>
          {sleepWords[sleep]}
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 10 }}>
          Anything you'd like to note? <span style={{ color: "#8A8391", fontWeight: 400 }}>(optional)</span>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Only visible to you"
          rows={3}
          style={{
            width: "100%",
            border: "1px solid #E3D9C9",
            borderRadius: 8,
            padding: 10,
            fontSize: 13.5,
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </Card>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          width: "100%",
          background: "#6E5A7B",
          color: "#FFF",
          border: "none",
          borderRadius: 10,
          padding: "13px 22px",
          fontSize: 15,
          fontWeight: 600,
          cursor: submitting ? "default" : "pointer",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Saving privately…" : "Save today's check-in"}
      </button>
    </div>
  );
}

function DashboardScreen({ setScreen }) {
  const weeks = MOCK_WEEKS;
  const latest = weeks[weeks.length - 1];
  const trendUp = latest.steadiness > weeks[0].steadiness;

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "44px 20px 60px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        <div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 27, margin: "0 0 6px" }}>Your space</h2>
          <p style={{ color: "#8A8391", fontSize: 13.5, margin: 0 }}>
            Only you can see this page unless you choose to share it.
          </p>
        </div>
        <PrivacyChip />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(260px, 320px) 1fr", gap: 24, marginBottom: 24 }}>
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <BloomRings weeks={weeks} />
          <div style={{ fontSize: 13, color: "#5B5460", marginTop: 8 }}>
            Each ring is a week — deeper color means a steadier week.
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>A gentle reflection</div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: "#3B3542", marginBottom: 14 }}>
            {trendUp
              ? "Over the last six weeks, your check-ins suggest things have felt a little steadier lately — especially around sleep. That's worth noticing."
              : "Your check-ins over the last six weeks show some harder stretches. That's common, and it's worth paying attention to."}{" "}
            This isn't a diagnosis — just a reflection of what you've told us. If these feelings continue or feel
            hard to manage, consider speaking with a qualified professional.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setScreen("resources")}
              style={{
                background: "#EDE3D3",
                color: "#4E3F5C",
                border: "none",
                borderRadius: 8,
                padding: "9px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              See resources
            </button>
            <button
              onClick={() => setScreen("circle")}
              style={{
                background: "transparent",
                color: "#4E3F5C",
                border: "1px solid #D9CDBF",
                borderRadius: 8,
                padding: "9px 14px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Talk to someone about this
            </button>
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 14 }}>Recent check-ins</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[...weeks].reverse().map((w) => (
            <div
              key={w.week}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #F0E9DC",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: w.steadiness < 0.45 ? "#D8A9A6" : w.steadiness < 0.62 ? "#D7CBE8" : "#9CAE93",
                  }}
                />
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>{w.week}</span>
              </div>
              <span style={{ fontSize: 13, color: "#8A8391" }}>{w.note}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SupportCircleScreen() {
  const [circle, setCircle] = useState(MOCK_CIRCLE);

  const toggle = async (id) => {
    const person = circle.find((p) => p.id === id);
    await BloomAPI.updateSharingPermission(id, !person.shared);
    setCircle((c) => c.map((p) => (p.id === id ? { ...p, shared: !p.shared } : p)));
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "44px 20px 60px" }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 27, marginBottom: 6 }}>Your support circle</h2>
      <p style={{ color: "#5B5460", fontSize: 13.5, marginBottom: 28, maxWidth: 480, lineHeight: 1.6 }}>
        Nobody sees anything by default. Turn sharing on for a person and
        they'll receive a plain-language summary of how you're doing — never
        your raw check-ins or private notes. You can turn it off at any time.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {circle.map((p) => (
          <Card key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14.5 }}>{p.name}</div>
              <div style={{ fontSize: 12.5, color: "#8A8391" }}>{p.relation}</div>
            </div>
            <button
              onClick={() => toggle(p.id)}
              style={{
                width: 46,
                height: 26,
                borderRadius: 999,
                border: "none",
                background: p.shared ? "#9CAE93" : "#E3D9C9",
                position: "relative",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              aria-label={p.shared ? `Stop sharing with ${p.name}` : `Share with ${p.name}`}
            >
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  left: p.shared ? 23 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#FFF",
                  transition: "left 0.15s",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
                }}
              />
            </button>
          </Card>
        ))}
      </div>

      <button
        style={{
          background: "transparent",
          color: "#4E3F5C",
          border: "1px dashed #D9CDBF",
          borderRadius: 10,
          padding: "12px 18px",
          fontSize: 13.5,
          fontWeight: 600,
          cursor: "pointer",
          width: "100%",
        }}
      >
        + Invite someone new
      </button>
    </div>
  );
}

function ResourcesScreen() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "44px 20px 60px" }}>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 27, marginBottom: 6 }}>Resources, when you want them</h2>
      <p style={{ color: "#5B5460", fontSize: 13.5, marginBottom: 28 }}>
        Curated, plain-language, and never pushed on you based on your check-ins without asking first.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {RESOURCES.map((r) => (
          <Card
            key={r.title}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#4E3F5C",
                  background: "#D7CBE8",
                  borderRadius: 999,
                  padding: "2px 9px",
                  marginBottom: 8,
                }}
              >
                {r.tag}
              </div>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: "#8A8391" }}>{r.minutes}</div>
            </div>
            <ChevronRight size={18} color="#8A8391" />
          </Card>
        ))}
      </div>

      <Card style={{ marginTop: 24, background: "#F4EEE3" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <ShieldCheck size={16} color="#6E5A7B" />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Ready to talk to a professional?</span>
        </div>
        <p style={{ fontSize: 13, color: "#5B5460", lineHeight: 1.6, marginBottom: 12 }}>
          We can help you find a perinatal mental health professional near
          you. This is entirely optional and confidential.
        </p>
        <button
          style={{
            background: "#6E5A7B",
            color: "#FFF",
            border: "none",
            borderRadius: 8,
            padding: "9px 16px",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Find someone to talk to
        </button>
      </Card>
    </div>
  );
}

function CrisisModal({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(46,40,51,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          maxWidth: 440,
          width: "100%",
          padding: 28,
          border: "1px solid #E3D9C9",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Phone size={18} color="#8A4A45" />
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600 }}>
              Get immediate help
            </span>
          </div>
          <X size={18} style={{ cursor: "pointer" }} onClick={onClose} />
        </div>
        <p style={{ fontSize: 13.5, color: "#3B3542", lineHeight: 1.6, marginBottom: 16 }}>
          BLOOM is not an emergency service and can't respond in real time.
          If you are in immediate danger, or having thoughts of harming
          yourself or your baby, please contact emergency services or a
          crisis line in your area right now.
        </p>
        <div
          style={{
            background: "#F4E4E1",
            border: "1px solid #E2C3BE",
            borderRadius: 10,
            padding: 14,
            fontSize: 13,
            color: "#5B3230",
            marginBottom: 16,
            lineHeight: 1.6,
          }}
        >
          Call your local emergency number, or reach a maternal/perinatal
          mental health crisis line if one is available where you live. A
          real deployment of BLOOM would show a verified, location-specific
          hotline here.
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            background: "#6E5A7B",
            color: "#FFF",
            border: "none",
            borderRadius: 10,
            padding: "11px 18px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ROOT
   -------------------------------------------------------------------------- */
export default function BloomApp() {
  const [screen, setScreen] = useState("landing");
  const [showCrisis, setShowCrisis] = useState(false);

  const body = useMemo(() => {
    switch (screen) {
      case "checkin":
        return <CheckInScreen setScreen={setScreen} />;
      case "dashboard":
        return <DashboardScreen setScreen={setScreen} />;
      case "circle":
        return <SupportCircleScreen />;
      case "resources":
        return <ResourcesScreen />;
      default:
        return <LandingScreen setScreen={setScreen} />;
    }
  }, [screen]);

  return (
    <Shell>
      <NavBar screen={screen} setScreen={setScreen} onCrisis={() => setShowCrisis(true)} />
      {body}
      {showCrisis && <CrisisModal onClose={() => setShowCrisis(false)} />}
      <div style={{ textAlign: "center", padding: "20px 20px 40px", color: "#B0A99A", fontSize: 11.5 }}>
        BLOOM — a supportive space, not a diagnostic tool. Always consult a
        qualified professional for medical concerns.
      </div>
    </Shell>
  );
}
