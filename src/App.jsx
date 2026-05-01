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
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Problem", href: "#problem", id: "problem" },
  { name: "Solution", href: "#solution", id: "solution" },
  { name: "Science", href: "#science", id: "science" },
  { name: "Team", href: "#team", id: "team" },
  { name: "Documents", href: "#reports", id: "reports" },
  { name: "Contact", href: "#contact", id: "contact" },
];

const GITHUB_URL = "https://github.com/yigitkosum/scubamind";

const REPORT_FILE_URLS = import.meta.glob("./assets/*.pdf", {
  eager: true,
  import: "default",
});

function titleFromAssetPath(assetPath) {
  const filename = assetPath.split("/").pop() ?? assetPath;
  const noExt = filename.replace(/\.pdf$/i, "");
  return noExt
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

const REPORTS = Object.entries(REPORT_FILE_URLS)
  .map(([path, href]) => ({
    title: titleFromAssetPath(path),
    href,
    meta: "PDF report",
    path,
  }))
  .filter((r) => !/project[_\s-]*information[_\s-]*form/i.test(r.path))
  .sort((a, b) => a.title.localeCompare(b.title));

const TEAM = [
  { name: "Metin Çalışkan", image: "/team/metin.jpg" },
  { name: "Merve Güleç", image: "/team/merve.jpg" },
  { name: "Murathan Işık", image: "/team/murathan.jpg" },
  { name: "Yiğit Koşum", image: "/team/yigit.jpg" },
  {
    name: "Muhammed Fatih Başal",
    image: "/team/fatih.jpg",
    email: "fatih.basal@ug.bilkent.edu.tr",
  },
];

function toAsciiLower(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("û", "u");
}

function emailForName(fullName) {
  const parts = toAsciiLower(fullName).split(/\s+/).filter(Boolean);
  const first = parts[0] ?? "first";
  const last = parts.length > 1 ? parts[parts.length - 1] : "last";
  return `${first}.${last}@ug.bilkent.edu.tr`;
}

function initialsForName(fullName) {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "?";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

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

function MotionBlock({
  children,
  className = "",
  delay = 0,
  y = 14,
  once = true,
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.35 }}
      transition={
        reduce
          ? undefined
          : { duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [contactStatus, setContactStatus] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
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

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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

            <div className="flex lg:hidden items-center gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-2 text-sm font-semibold text-slate-800 border border-black/10 hover:bg-white transition"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-full bg-slate-900/5 p-2.5 text-slate-900 hover:bg-slate-900/10 transition"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <nav className="flex items-center gap-1 rounded-full bg-slate-900/5 p-1">
                {navItems.map((i) => (
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
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 text-sm font-semibold text-slate-800 border border-black/10 hover:bg-white transition"
                aria-label="Open project on GitHub"
              >
                <span className="text-slate-900">GitHub</span>
                <span aria-hidden="true" className="text-slate-500">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 rounded-2xl bg-white/85 backdrop-blur border border-black/5 shadow-sm overflow-hidden">
              <div className="p-2 grid gap-1">
                {navItems.map((i) => (
                  <a
                    key={i.id}
                    href={i.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={[
                      "px-3 py-2 rounded-xl text-sm font-semibold transition",
                      activeSection === i.id
                        ? "bg-slate-900/5 text-slate-900"
                        : "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900",
                    ].join(" ")}
                  >
                    {i.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="sm-hero-bg sm-snap-section min-h-screen pt-16 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl w-full px-4 md:px-6 py-14 md:py-16">
          <div className="min-h-[calc(100vh-64px)] flex items-center">
            <div className="md:-translate-y-24 w-full">
              <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] gap-10 lg:gap-14 items-stretch">
                {/* Left column: top aligned to video top, bottom aligned to video bottom */}
                <div className="flex flex-col h-full">
                  <MotionBlock>
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
                  </MotionBlock>

                  <MotionBlock delay={0.08} className="mt-auto">
                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-[11px]">
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
                  </MotionBlock>
                </div>

                {/* Right column: 16:9 video */}
                <div id="watch" className="relative">
                  <MotionBlock delay={0.06} y={18}>
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
                  </MotionBlock>
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
          <MotionBlock className="text-center">
            <Pill className="mx-auto w-fit">
              <ExclamationTriangleIcon className="h-4 w-4" />
              Problem
            </Pill>
            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Why early support is so hard
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Depression risk often develops gradually, while traditional check-ins
              are infrequent and self-tracking is hard to sustain.
            </p>
          </MotionBlock>

          <motion.div
            className="mt-10 grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.05 },
              },
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>
          </motion.div>

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
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 sm:py-8 md:py-10">
          <div className="min-h-[calc(100vh-64px)] flex flex-col">
            <MotionBlock className="text-center">
            <Pill className="mx-auto w-fit">
              <ChartBarIcon className="h-4 w-4" />
              Solution
            </Pill>
            <h2 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              How ScubaMind works
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Three simple steps that turn passive signals into helpful, privacy-first
              support.
            </p>
            </MotionBlock>

            <motion.div
              className="mt-6 grid gap-4 sm:gap-5 lg:gap-6 items-start max-w-6xl mx-auto lg:grid-cols-[1fr_auto_1fr_auto_1fr]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
            <motion.div
              className="self-start"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-5 rounded-3xl bg-white/85 backdrop-blur text-left max-w-[390px] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-white border border-black/10 grid place-items-center font-extrabold text-slate-900 shadow-sm text-base">
                    1
                  </div>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
                  <img
                    src="/landing/solution/solution1.png"
                    alt=""
                    className="w-full h-[190px] object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900 leading-snug">
                  Passive sensing on your device
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  We analyze patterns from your phone and wearables—movement, screen
                  use, sleep, and more—entirely on-device.
                </p>
              </Card>
            </motion.div>

            <div
              className="hidden lg:flex items-center justify-center self-center"
              aria-hidden="true"
            >
              <div className="h-11 w-11 rounded-full bg-white/80 border border-black/10 backdrop-blur grid place-items-center text-slate-700 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path
                    d="M5 12h12m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <motion.div
              className="self-start"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-5 rounded-3xl bg-white/85 backdrop-blur text-left max-w-[390px] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-white border border-black/10 grid place-items-center font-extrabold text-slate-900 shadow-sm text-base">
                    2
                  </div>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
                  <img
                    src="/landing/solution/solution2.png"
                    alt=""
                    className="w-full h-[190px] object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900 leading-snug">
                  Smart insights, just for you
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Risk estimates, trends, and summaries help you understand your
                  well-being over time.
                </p>
              </Card>
            </motion.div>

            <div
              className="hidden lg:flex items-center justify-center self-center"
              aria-hidden="true"
            >
              <div className="h-11 w-11 rounded-full bg-white/80 border border-black/10 backdrop-blur grid place-items-center text-slate-700 shadow-sm">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                  <path
                    d="M5 12h12m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <motion.div
              className="self-start"
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="p-5 rounded-3xl bg-white/85 backdrop-blur text-left max-w-[390px] mx-auto">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-2xl bg-white border border-black/10 grid place-items-center font-extrabold text-slate-900 shadow-sm text-base">
                    3
                  </div>
                </div>
                <div className="mt-4 rounded-2xl overflow-hidden border border-black/10 bg-white">
                  <img
                    src="/landing/solution/solution3.png"
                    alt=""
                    className="w-full h-[190px] object-contain bg-white"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="mt-4 font-extrabold text-slate-900 leading-snug">
                  Timely support that fits your life
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Micro-interventions, reminders, and habit streaks help you take
                  small steps that add up.
                </p>
              </Card>
            </motion.div>
            </motion.div>

            <MotionBlock
              delay={0.05}
              className="mt-5 md:mt-4 lg:mt-4"
            >
              <Card className="rounded-3xl bg-white/75 backdrop-blur max-w-5xl mx-auto overflow-hidden">
                <div className="grid md:grid-cols-3 text-left divide-y md:divide-y-0 md:divide-x divide-black/10">
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <img
                        src="/landing/icons/icon1.png"
                        alt=""
                        className="h-7 w-7 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        On-device
                      </div>
                      <div className="text-xs text-slate-600">
                        No raw data leaves your device.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <img
                        src="/landing/icons/icon2.png"
                        alt=""
                        className="h-7 w-7 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        Private by design
                      </div>
                      <div className="text-xs text-slate-600">
                        Signals are processed entirely on-device.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <img
                        src="/landing/icons/icon3.png"
                        alt=""
                        className="h-7 w-7 object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        Gentle support
                      </div>
                      <div className="text-xs text-slate-600">
                        Insights and care arrive when they’re most helpful.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </MotionBlock>
          </div>
        </div>
      </section>

      {/* Science */}
      <section id="science" className="sm-science-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 sm:py-8 md:py-10">
          <div className="min-h-[calc(100vh-64px)] flex flex-col pt-2 sm:pt-4">
            <MotionBlock className="text-center">
              <Pill className="mx-auto w-fit">
                <ShieldCheckIcon className="h-4 w-4" />
                Science
              </Pill>
              <h2 className="mt-2 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Built on privacy. Backed by science.
              </h2>
              <p className="mt-3 text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
                ScubaMind combines local processing, passive sensing, and clinically
                grounded models to deliver mental well-being support that is private,
                practical, and evidence-based.
              </p>
            </MotionBlock>

            <motion.div
              className="mt-10 relative max-w-3xl mx-auto w-full"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {/* center badge */}
              <div
                className="hidden md:grid absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-2xl bg-white/80 border border-black/10 backdrop-blur place-items-center shadow-sm z-10"
                aria-hidden="true"
              >
                <ShieldCheckIcon className="h-6 w-6 text-slate-700" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                        <ShieldCheckIcon className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">
                          Privacy-first by design
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Raw data never leaves your device. You’re in control.
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                        <DevicePhoneMobileIcon className="h-6 w-6 text-indigo-700" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">
                          On-device processing
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Advanced models run locally for speed and privacy.
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                        <NoSymbolIcon className="h-6 w-6 text-sky-700" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">
                          Passive &amp; unobtrusive
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          No surveys. No manual input. Just life, as it happens.
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full">
                    <div className="flex items-start gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                        <BeakerIcon className="h-6 w-6 text-violet-700" />
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900">
                          Evidence-based insights
                        </div>
                        <div className="mt-1 text-sm text-slate-600">
                          Grounded in clinical research and validated signal science.
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>

            <MotionBlock delay={0.05} className="mt-10">
              <Card className="rounded-3xl bg-white/75 backdrop-blur max-w-5xl mx-auto overflow-hidden">
                <div className="grid md:grid-cols-4 text-left divide-y md:divide-y-0 md:divide-x divide-black/10">
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <ShieldCheckIcon className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        100% On-device
                      </div>
                      <div className="text-xs text-slate-600">
                        No raw data leaves your device.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <LockClosedIcon className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        Privacy by design
                      </div>
                      <div className="text-xs text-slate-600">
                        Signals are processed entirely on-device to protect privacy.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <HeartIcon className="h-6 w-6 text-emerald-700" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        You’re in control
                      </div>
                      <div className="text-xs text-slate-600">
                        Your data stays yours. Always.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 px-5 py-4">
                    <div className="h-11 w-11 rounded-2xl bg-white/80 border border-black/10 grid place-items-center shrink-0">
                      <BeakerIcon className="h-6 w-6 text-violet-700" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">
                        Grounded in science
                      </div>
                      <div className="text-xs text-slate-600">
                        Built on clinical research and validated models.
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </MotionBlock>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="sm-hero-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <MotionBlock className="text-center">
            <Pill className="mx-auto w-fit">
              <UserGroupIcon className="h-4 w-4" />
              Team
            </Pill>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Meet the ScubaMind team
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              The project is built by a small team focused on privacy-first, on-device
              mental wellbeing support.
            </p>
          </MotionBlock>

          <div className="mt-10 grid gap-6">
            <motion.div
              className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto auto-rows-fr justify-items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {TEAM.slice(0, 2).map((p) => {
                const email = p.email ?? emailForName(p.name);
                return (
                  <motion.div
                    key={p.name}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full w-full max-w-[460px] min-h-[112px]">
                      <div className="flex items-start gap-4 h-full">
                      <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const next = e.currentTarget.nextSibling;
                            if (next && next.style) next.style.display = "grid";
                          }}
                        />
                        <div
                          className="hidden absolute inset-0 rounded-2xl bg-slate-900/5 text-slate-900 font-extrabold place-items-center"
                          aria-hidden="true"
                        >
                          {initialsForName(p.name)}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-slate-900 truncate">
                          {p.name}
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className="mt-1 flex items-start gap-2 text-slate-600 hover:text-slate-900 min-w-0 w-full"
                        >
                          <EnvelopeIcon className="h-4 w-4 shrink-0 mt-0.5" />
                          <span className="min-w-0 text-xs leading-snug break-words whitespace-normal">
                            {email}
                          </span>
                        </a>
                      </div>
                    </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-fr justify-items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {TEAM.slice(2).map((p) => {
                const email = p.email ?? emailForName(p.name);
                return (
                  <motion.div
                    key={p.name}
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <Card className="p-6 rounded-3xl bg-white/85 backdrop-blur text-left h-full w-full max-w-[420px] min-h-[112px]">
                      <div className="flex items-start gap-4 h-full">
                      <div className="relative h-16 w-16 shrink-0 rounded-2xl overflow-hidden border border-black/10 bg-white shadow-sm">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover object-center"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const next = e.currentTarget.nextSibling;
                            if (next && next.style) next.style.display = "grid";
                          }}
                        />
                        <div
                          className="hidden absolute inset-0 rounded-2xl bg-slate-900/5 text-slate-900 font-extrabold place-items-center"
                          aria-hidden="true"
                        >
                          {initialsForName(p.name)}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-extrabold text-slate-900 truncate">
                          {p.name}
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className="mt-1 flex items-start gap-2 text-slate-600 hover:text-slate-900 min-w-0 w-full"
                        >
                          <EnvelopeIcon className="h-4 w-4 shrink-0 mt-0.5" />
                          <span className="min-w-0 text-xs leading-snug break-words whitespace-normal">
                            {email}
                          </span>
                        </a>
                      </div>
                    </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <MotionBlock delay={0.05} className="mt-8 flex items-center justify-center">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-extrabold text-slate-900 border border-black/10 hover:bg-white transition"
            >
              View the project on GitHub <span aria-hidden="true">↗</span>
            </a>
          </MotionBlock>
        </div>
      </section>

      {/* Reports */}
      <section id="reports" className="sm-docs-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <MotionBlock className="text-center">
            <Pill className="mx-auto w-fit">
              <DocumentTextIcon className="h-4 w-4" />
              Documents
            </Pill>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Project documents
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Download the PDFs below for detailed background, requirements, and
              design decisions.
            </p>
          </MotionBlock>

          <motion.div
            className="mt-10 grid md:grid-cols-2 gap-6 auto-rows-fr"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.07, delayChildren: 0.04 },
              },
            }}
          >
            {REPORTS.map((r) => (
              <motion.a
                key={r.title}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="group block h-full"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="p-6 rounded-3xl bg-white/80 backdrop-blur text-left transition h-full border border-black/10 hover:bg-white hover:-translate-y-0.5 hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/70 border border-black/10 grid place-items-center shrink-0">
                      <DocumentTextIcon className="h-6 w-6 text-slate-700" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-extrabold text-slate-900 leading-snug">
                          {r.title}
                        </div>
                        <span className="shrink-0 inline-flex items-center rounded-full bg-slate-900/5 px-2 py-1 text-[11px] font-extrabold text-slate-700">
                          PDF
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-600">{r.meta}</div>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                        Open document <span aria-hidden="true">↗</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="sm-hero-bg sm-snap-section min-h-screen pt-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16">
          <MotionBlock className="text-center">
            <Pill className="mx-auto w-fit">
              <EnvelopeIcon className="h-4 w-4" />
              Contact
            </Pill>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Get in touch
            </h2>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              Questions, feedback, or collaboration ideas? Send us a message and we’ll
              route it to the right person.
            </p>
          </MotionBlock>

          <motion.div
            className="mt-10 grid lg:grid-cols-2 gap-6 items-stretch"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Card className="p-6 rounded-3xl bg-white/80 backdrop-blur text-left h-full border border-black/10 hover:bg-white transition">
              <div className="font-extrabold text-slate-900 text-lg">
                Quick contacts
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Prefer email? You can reach any team member directly:
              </p>
              <div className="mt-5 grid gap-3">
                {TEAM.map((p) => {
                  const email = p.email ?? emailForName(p.name);
                  return (
                    <a
                      key={p.name}
                      href={`mailto:${email}`}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 hover:bg-white transition"
                    >
                      <span className="font-semibold text-slate-900 truncate min-w-0">
                        {p.name}
                      </span>
                      <span className="text-sm text-slate-600 break-all sm:truncate min-w-0 text-right max-w-[55%]">
                        {email}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-6">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-slate-900"
                >
                  Project repository on GitHub <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Card>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <Card className="p-6 rounded-3xl bg-white/80 backdrop-blur text-left h-full border border-black/10 hover:bg-white transition">
              <div className="font-extrabold text-slate-900 text-lg">
                Contact form
              </div>
              <p className="mt-2 text-sm text-slate-600">
                This form opens your email client with a pre-filled message.
              </p>

              <form
                className="mt-5 grid gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.currentTarget);
                  const name = String(form.get("name") ?? "").trim();
                  const email = String(form.get("email") ?? "").trim();
                  const message = String(form.get("message") ?? "").trim();

                  if (!name || !email || !message) {
                    setContactStatus("Please fill in all fields.");
                    return;
                  }

                  const subject = encodeURIComponent(`ScubaMind contact — ${name}`);
                  const body = encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
                  );
                  const to = encodeURIComponent("merve.gulec@ug.bilkent.edu.tr");
                  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
                  setContactStatus("Opening your email client…");
                  e.currentTarget.reset();
                }}
              >
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-700">
                    Your name
                  </span>
                  <input
                    name="name"
                    required
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-200/70 focus:border-sky-200"
                    placeholder="Jane Doe"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-700">
                    Your email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-200/70 focus:border-sky-200"
                    placeholder="jane.doe@example.com"
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-xs font-semibold text-slate-700">
                    Message
                  </span>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-200/70 focus:border-sky-200 resize-none"
                    placeholder="Write your message…"
                  />
                </label>

                <div className="flex items-center justify-between gap-3 mt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-sky-700 transition shadow-sm shadow-sky-600/20"
                  >
                    <EnvelopeIcon className="h-4 w-4" />
                    Send message
                  </button>
                  <div
                    className="text-xs text-slate-600"
                    role="status"
                    aria-live="polite"
                  >
                    {contactStatus}
                  </div>
                </div>
              </form>
            </Card>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <MotionBlock delay={0.04} className="mt-10">
            <div className="rounded-3xl border border-black/10 bg-white/80 backdrop-blur px-5 py-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/landing/brand-icon.png"
                    alt=""
                    className="h-9 w-9 rounded-2xl object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-900 leading-tight">
                      ScubaMind
                    </div>
                    <div className="text-xs text-slate-600">
                      Privacy-first, on-device mental wellbeing support.
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
                  <a href="#team" className="text-slate-700 hover:text-slate-900">
                    Team
                  </a>
                  <a
                    href="#reports"
                    className="text-slate-700 hover:text-slate-900"
                  >
                    Documents
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-700 hover:text-slate-900"
                  >
                    GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-600">
                <div>
                  © {new Date().getFullYear()} ScubaMind. All rights reserved.
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a
                    href="mailto:merve.gulec@ug.bilkent.edu.tr"
                    className="hover:text-slate-900"
                  >
                    Contact
                  </a>
                  <a href="#home" className="hover:text-slate-900">
                    Back to top
                  </a>
                </div>
              </div>
            </div>
          </MotionBlock>
        </div>
      </section>
    </div>
  );
}
