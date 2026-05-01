import {
  EnvelopeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  HeartIcon,
  DevicePhoneMobileIcon,
  BeakerIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Problem", href: "#problem" },
  { name: "Solution", href: "#solution" },
  { name: "Science", href: "#science" },
];

function Logo({ className = "h-8 w-8" }) {
  return (
    <div
      className={[
        "grid place-items-center rounded-2xl",
        "bg-[#0ea5e9] text-white",
        "shadow-sm",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M3 13h4l2-5 4 10 3-7h4l2-3h2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function Pill({ children, className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full",
        "px-3 py-1 text-xs font-medium",
        "border border-black/10 bg-white/80 text-slate-700",
        "backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={["rounded-2xl bg-white sm-card", className].join(" ")}>
      {children}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "problem", "solution", "science"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActiveSection(visible[0].target.id);
      },
      {
        root: null,
        threshold: [0.25, 0.35, 0.5, 0.65],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav (screenshot style) */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
          <div className="flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur border border-black/5 shadow-sm px-3 md:px-4 py-2">
            <a href="#home" className="flex items-center gap-2">
              <img
                src="/landing/brand-icon.png"
                alt=""
                className="h-9 w-9 rounded-2xl object-contain"
                loading="eager"
                decoding="async"
              />
              <span className="text-lg font-extrabold tracking-tight">
                ScubaMind
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-1 rounded-full bg-slate-900/5 p-1">
              {[
                { name: "Home", href: "#home", id: "home" },
                { name: "Problem", href: "#problem", id: "problem" },
                { name: "Solution", href: "#solution", id: "solution" },
                { name: "Science", href: "#science", id: "science" },
              ].map((i) => (
                <a
                  key={i.name}
                  href={i.href}
                  className={[
                    "px-3 py-1.5 rounded-full text-sm font-semibold transition-all",
                    activeSection === i.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-700 hover:text-slate-900 hover:bg-white/60",
                  ].join(" ")}
                >
                  {i.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="sm-hero-bg sm-snap-section min-h-screen pt-16 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl w-full px-4 md:px-6 py-14 md:py-16">
          <div className="min-h-[calc(100vh-64px)] flex items-center">
            <div className="-translate-y-20 md:-translate-y-24 w-full">
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-10 lg:gap-14 items-stretch">
                {/* Left column: top aligned to video top, bottom aligned to video bottom */}
                <div className="flex flex-col h-full">
                  <div>
                    <h1 className="mt-0 text-[40px] md:text-[52px] xl:text-[56px] font-extrabold leading-[1.04] tracking-tight text-slate-900">
                      See how ScubaMind
                      <br />
                      supports mental
                      <br />
                      well-being<span className="text-emerald-500">.</span>
                    </h1>

                    <p className="mt-5 text-[15px] md:text-base text-slate-600 max-w-[520px] leading-relaxed">
                      On-device passive sensing, privacy-first design, and timely
                      support—working together to detect risk early, track progress,
                      and help you feel better, without sending your data anywhere.
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-x-8 gap-y-4 text-[11px]">
                    <div className="flex items-start gap-2">
                      <ShieldCheckIcon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-emerald-700">
                          100% On-device
                        </div>
                        <div className="text-slate-600 leading-snug">
                          No raw data leaves
                          <br />
                          your device.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <LockClosedIcon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-emerald-700">
                          Privacy First
                        </div>
                        <div className="text-slate-600 leading-snug">
                          Your data stays
                          <br />
                          yours, always.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <HeartIcon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="font-bold text-emerald-700">
                          Timely Support
                        </div>
                        <div className="text-slate-600 leading-snug">
                          Insights and care
                          <br />
                          when it matters.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column: 16:9 video */}
                <div id="watch" className="relative">
                  <div className="rounded-2xl overflow-hidden border border-black/10 bg-white shadow-2xl">
                    <div className="relative aspect-video bg-black/10">
                      <img
                        src="/landing/trailer-poster.png"
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section
        id="problem"
        className="sm-challenge-bg sm-snap-section min-h-screen pt-16"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <div className="text-center">
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Why early support is so hard
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Depression risk often develops gradually, while traditional check-ins
              are infrequent and self-tracking is hard to sustain.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Card className="px-7 pt-5 pb-7 rounded-3xl bg-white/80 backdrop-blur">
              <div className="text-center">
                <div className="mx-auto h-34 w-34 grid place-items-center">
                  <img
                    src="/landing/icons/challenge-early-recognition.png"
                    alt=""
                    className="h-34 w-34 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-0 text-lg font-extrabold text-slate-900">
                  Early recognition is difficult
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Changes in mood and behavior are subtle, personal, and easy to miss
                  until symptoms become more severe.
                </p>
              </div>
            </Card>

            <Card className="px-7 pt-5 pb-7 rounded-3xl bg-white/80 backdrop-blur">
              <div className="text-center">
                <div className="mx-auto h-34 w-34 grid place-items-center">
                  <img
                    src="/landing/icons/challenge-intervention-late.png"
                    alt=""
                    className="h-34 w-34 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-0 text-lg font-extrabold text-slate-900">
                  Intervention often comes late
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Without continuous signals, support usually starts only after
                  distress has already affected daily life.
                </p>
              </div>
            </Card>

            <Card className="px-7 pt-5 pb-7 rounded-3xl bg-white/80 backdrop-blur">
              <div className="text-center">
                <div className="mx-auto h-34 w-34 grid place-items-center">
                  <img
                    src="/landing/icons/challenge-manual-tracking.png"
                    alt=""
                    className="h-34 w-34 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-0 text-lg font-extrabold text-slate-900">
                  Manual tracking doesn’t stick
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  People rarely maintain surveys or journals consistently, especially
                  during difficult periods.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-slate-900">
            <img
              src="/landing/icons/changes-sparkles-left.png"
              alt=""
              className="h-5 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <h3 className="text-base md:text-lg font-extrabold">
              What ScubaMind changes
            </h3>
            <img
              src="/landing/icons/changes-sparkles-right.png"
              alt=""
              className="h-5 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-6 grid lg:grid-cols-[1fr_1fr_1fr_auto] gap-4 items-center">
            <Card className="p-5 rounded-2xl bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src="/landing/icons/changes-passive-sensing.png"
                  alt=""
                  className="h-11 w-11 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-extrabold text-sm">Passive sensing</div>
                  <div className="text-xs text-slate-600">
                    Patterns are captured quietly from everyday device use.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src="/landing/icons/changes-private-by-design.png"
                  alt=""
                  className="h-11 w-11 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-extrabold text-sm">Private by design</div>
                  <div className="text-xs text-slate-600">
                    Signals are processed on-device to protect privacy.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5 rounded-2xl bg-white/80 backdrop-blur">
              <div className="flex items-center gap-3">
                <img
                  src="/landing/icons/changes-timely-support.png"
                  alt=""
                  className="h-11 w-11 object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="font-extrabold text-sm">Timely support</div>
                  <div className="text-xs text-slate-600">
                    Insights can trigger earlier, gentler interventions.
                  </div>
                </div>
              </div>
            </Card>

            <div className="hidden lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Solution (next section) */}
      <section id="solution" className="sm-solution-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16" />
      </section>

      {/* Science */}
      <section id="science" className="sm-science-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16" />
      </section>
    </div>
  );
}
