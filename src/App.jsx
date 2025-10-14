import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import {
  SparklesIcon,
  LightBulbIcon,
  BeakerIcon,
  ShieldCheckIcon,
  UsersIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

/* ---------------------- Config ---------------------- */
const navItems = [
  { name: "Problem", href: "#problem", Icon: LightBulbIcon },
  { name: "Solution", href: "#solution", Icon: SparklesIcon },
  { name: "Science", href: "#methods", Icon: BeakerIcon },
  { name: "Sensors", href: "#sensors", Icon: ShieldCheckIcon },
  { name: "Team", href: "#team", Icon: UsersIcon },
  { name: "Contact", href: "#contact", Icon: EnvelopeIcon },
];

const team = [
  { n: "Merve Güleç", photo: "/team/merve.jpg" },
  { n: "Metin Çalışkan", photo: "/team/metin.jpg" },
  { n: "Muhammed Fatih Başal", photo: "/team/fatih.jpg" },
  { n: "Murathan Işık", photo: "/team/murathan.jpg" },
  { n: "Yiğit Koşum", photo: "/team/yigit.jpg" },
];

/* ---------------------- Logo ---------------------- */
function LogoMoodi({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mo_g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6E56CF" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#mo_g)" />
      <path
        d="M12 36h8l3-10 6 20 5-14h6l4-8h8"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="22" r="3" fill="#FFC857" />
    </svg>
  );
}

/* ---------------------- Motion helpers ---------------------- */
const appear = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, margin: "-80px" },
};

function Card({ children, className = "" }) {
  return (
    <motion.div
      {...appear}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ ...appear.transition, duration: 0.35 }}
      className={`rounded-2xl border bg-white/70 backdrop-blur shadow-sm hover:shadow-lg hover:border-[#8B5CF6]/40 transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------- Particle Trail ---------------------- */
function ParticleTrail() {
  const [trail, setTrail] = useState([]);
  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX, y = e.clientY;
      setTrail((t) => [...t.slice(-18), { x, y, id: crypto.randomUUID() }]); // son 18 nokta
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {trail.map((p, i) => (
        <motion.span
          key={p.id}
          className="absolute block rounded-full"
          style={{
            left: p.x - 8,
            top: p.y - 8,
            width: 16 + i * 0.6,
            height: 16 + i * 0.6,
            background:
              i % 2 === 0
                ? "radial-gradient(circle, #6E56CF66, transparent 60%)"
                : "radial-gradient(circle, #8B5CF666, transparent 60%)",
            filter: "blur(2px)",
          }}
          initial={{ opacity: 0.35, scale: 0.9 }}
          animate={{ opacity: 0, scale: 1.4, y: -6 }}
          transition={{ duration: 0.8 }}
        />
      ))}
    </div>
  );
}

/* ---------------------- Brand word animation ---------------------- */
function AnimatedBrand() {
  const letters = useMemo(() => "Moodi".split(""), []);
  return (
    <div className="flex items-center gap-2">
      <LogoMoodi className="h-7 w-7" />
      <div className="font-extrabold text-xl tracking-tight">
        {letters.map((ch, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.35 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------- App ---------------------- */
export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [0, -3]);

  // global scroll progress bar
  const { scrollYProgress: globalProgress } = useScroll();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6E56CF] to-[#8B5CF6] origin-left z-[60]"
        style={{ scaleX: globalProgress }}
      />

      {/* mouse particle trail */}
      <ParticleTrail />

      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <nav className="mx-auto max-w-[96rem] px-6 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2">
            <AnimatedBrand />
          </a>

          {/* animated nav with icons */}
          <div className="hidden md:flex gap-6 text-sm text-slate-700">
            {navItems.map(({ name, href, Icon }) => (
              <motion.a
                key={name}
                href={href}
                className="flex items-center gap-1.5 hover:text-[#6E56CF] relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                {name}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6E56CF] to-[#8B5CF6] origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
              </motion.a>
            ))}
          </div>

          {/* fixed readable CTA */}
          <a
            href="#contact"
            className="rounded-2xl px-4 py-2 text-white text-sm font-semibold shadow-md transition-all
                       bg-gradient-to-r from-[#6E56CF] to-[#8B5CF6]
                       hover:shadow-lg hover:scale-[1.03] active:scale-[0.99]"
            style={{ WebkitTextFillColor: "#fff" }} // bazı Mac temalarında okunurluk için
          >
            Request Demo
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" ref={heroRef} className="relative overflow-hidden">
        {/* animated blobs */}
        <motion.div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
              style={{
                background: i % 2 ? "#6E56CF" : "#8B5CF6",
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>

        {/* soft radial glows */}
        <motion.div
          className="pointer-events-none absolute -z-10 size-[900px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side,#6E56CF33,#6E56CF00)" }}
          animate={{ x: [200, 0, 200], y: [-80, 60, -80] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -z-10 size-[700px] rounded-full blur-3xl"
          style={{ right: -150, top: -120, background: "radial-gradient(closest-side,#FFC85733,#FFC85700)" }}
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />

        <div className="mx-auto max-w-[96rem] px-6 py-20 grid lg:grid-cols-2 gap-12 items-center min-h-[82vh]">
          {/* Left */}
          <motion.div {...appear}>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-slate-600 bg-white/70 backdrop-blur">
              <LogoMoodi className="h-4 w-4" />
              On-device & Privacy-first
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              On-device <span className="underline decoration-[#FFC857] underline-offset-4">Passive Sensing</span> for Mental Well-Being
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Moodi analyzes smartphone & wearable signals <strong>entirely on-device</strong> to estimate depression risk early, track
              progression, and deliver micro-interventions, reminders, and habit streaks—without sending raw data to servers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-2xl px-5 py-3 bg-[#0F172A] text-white font-semibold hover:opacity-90" href="#contact">
                Get Early Access
              </a>
              <a
                className="rounded-2xl px-5 py-3 border border-[#6E56CF]/30 text-[#6E56CF] font-semibold hover:bg-[#6E56CF]/5"
                href="#privacy"
              >
                Privacy Principles
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-600">
              {["On-device Analytics", "Clinician-ready Summaries", "Micro-interventions", "Habit Streaks"].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 hover:border-[#6E56CF]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right mockup (parallax) */}
          <motion.div
            className="relative flex justify-end lg:-translate-x-10 xl:-translate-x-16 2xl:-translate-x-24"
            style={{ y: phoneY, rotate: phoneRot }}
          >
            <div className="w-[440px] rounded-[2rem] border bg-white shadow-xl">
              <div className="h-8 rounded-t-[2rem] bg-slate-100 flex items-center justify-center text-[10px] text-slate-500">Moodi</div>
              <div className="p-4 space-y-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Daily Risk</h3>
                      <p className="text-xs text-slate-500">Passive signals</p>
                    </div>
                    <span className="text-xs rounded-full border px-2 py-0.5">7-day</span>
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-slate-100 flex items-end gap-1 p-2">
                    {[28, 58, 44, 76, 54, 64, 50].map((h, i) => (
                      <div key={i} className="w-8 rounded-t" style={{ background: "linear-gradient(180deg,#6E56CF,#8B5CF6)", height: `${h}%` }} />
                    ))}
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div {...appear} whileHover={{ scale: 1.02 }} className="rounded-2xl border bg-white/70 backdrop-blur shadow-sm p-4">
                    <h4 className="font-semibold">Micro-Intervention</h4>
                    <p className="text-xs text-slate-500">3-min breathing</p>
                    <motion.div
                      className="mt-3 rounded-lg border p-3"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-2xl font-extrabold">4–7–8</div>
                      <p className="text-[11px] text-slate-500">Inhale 4 • Hold 7 • Exhale 8</p>
                      <button className="mt-3 w-full rounded-lg bg-[#6E56CF] text-white py-2 text-xs font-semibold hover:opacity-90">Start</button>
                    </motion.div>
                  </motion.div>

                  <Card className="p-4">
                    <h4 className="font-semibold">Reminders</h4>
                    <p className="text-xs text-slate-500">Schedule & meds</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Medication", "Therapy", "Walk"].map((t, i) => (
                        <span key={i} className="text-[11px] rounded-full border px-3 py-1 hover:border-[#6E56CF]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-slate-50 p-3">
                      <p className="text-[11px] text-slate-600">Today • 18:00 — Evening walk</p>
                    </div>
                  </Card>
                </div>

                <Card className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Weekly trend</p>
                    <p className="font-semibold">Stable ↗︎</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-7 w-7 rounded-full bg-slate-200 border" />
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* floating stat cards */}
            <motion.div className="hidden xl:block absolute right-0 -translate-x-4 -top-6" {...appear} transition={{ ...appear.transition, delay: 0.15 }}>
              <div className="rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm w-64">
                <p className="text-xs text-slate-500">Mobility diversity</p>
                <p className="text-lg font-semibold">Moderate</p>
                <div className="mt-2 h-10 bg-slate-100 rounded" />
              </div>
            </motion.div>
            <motion.div className="hidden xl:block absolute right-0 translate-x-6 -bottom-8" {...appear} transition={{ ...appear.transition, delay: 0.25 }}>
              <div className="rounded-2xl border bg-white/90 backdrop-blur p-4 shadow-sm w-64">
                <p className="text-xs text-slate-500">Screen rhythm</p>
                <p className="text-lg font-semibold">Regular</p>
                <div className="mt-2 h-10 bg-slate-100 rounded" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="border-t">
        <div className="mx-auto max-w-[96rem] px-6 py-16 grid md:grid-cols-3 gap-8">
          <motion.div {...appear} className="md:col-span-1">
            <h2 className="text-2xl font-bold">Problem</h2>
            <p className="mt-3 text-slate-600">
              Early recognition of depressive symptoms is difficult; clinical assessments often occur late. Day-to-day self-monitoring is
              inconsistent and hard to sustain.
            </p>
          </motion.div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              { title: "Delayed intervention", desc: "Symptoms are detected late, delaying care." },
              { title: "Low adherence", desc: "Users struggle to self-track consistently." },
              { title: "Fragmented signals", desc: "Behavioral data is noisy and hard to interpret." },
              { title: "Privacy concerns", desc: "Sensitive data should not leave the phone." },
            ].map((c, i) => (
              <Card key={i} className="p-5">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="border-t bg-slate-50">
        <div className="mx-auto max-w-[96rem] px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...appear}>
            <h2 className="text-2xl font-bold">Solution</h2>
            <p className="mt-3 text-slate-700">
              We combine multi-sensor signals (screen rhythm, app usage, mobility regularity, sleep, heart rate, activity) with a compact
              on-device model to infer early risk, produce clinician-ready summaries, and deliver actionable micro-interventions.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>On-device analytics — raw data never leaves the phone</li>
              <li>Opt-in, privacy-preserving PDF summaries</li>
              <li>Trend tracking, goals, and streaks</li>
              <li>Low-power collectors & batching</li>
            </ul>
          </motion.div>
          <Card className="p-6">
            <h3 className="font-semibold">Architecture (Overview)</h3>
            <ol className="mt-3 text-sm text-slate-700 space-y-2 list-decimal pl-5">
              <li><strong>Collectors:</strong> UsageStats, Screen Events, Activity/HR, Location, Ambient</li>
              <li><strong>Feature Layer:</strong> rhythms, variance, circadian regularity, mobility diversity, entropy</li>
              <li><strong>On-device Model:</strong> compact classifier / risk score</li>
              <li><strong>Assistant:</strong> micro-interventions, reminders, habit tracker</li>
              <li><strong>Share:</strong> optional clinician PDF summary</li>
            </ol>
          </Card>
        </div>
      </section>

      {/* METHODS */}
      <section id="methods" className="border-t">
        <div className="mx-auto max-w-[96rem] px-6 py-16">
          <motion.h2 {...appear} className="text-2xl font-bold">Science & Methods</motion.h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { t: "Smartphone analytics", d: "Lock/unlock & screen status rhythms, app usage, notifications, mobility regularity, entropy." },
              { t: "Wearables", d: "Heart rate, sleep, step count, activity intensity; circadian & variability features." },
              { t: "Speech (acoustics only)", d: "Prosody, pitch, energy trends for mood correlates (no content stored)." },
            ].map((f, i) => (
              <Card key={i} className="p-5">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SENSORS */}
      <section id="sensors" className="border-t bg-slate-50">
        <div className="mx-auto max-w-[96rem] px-6 py-16">
          <motion.h2 {...appear} className="text-2xl font-bold">Sensors we leverage</motion.h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { t: "Mobility & Activity", items: ["GPS/Wi-Fi/Bluetooth scans", "Pedometer/steps", "Gyroscope & accelerometer", "Activity intensity"] },
              { t: "Phone Usage", items: ["Lock/unlock & screen time", "App usage & notifications", "Running apps", "Call/SMS/email/social"] },
              { t: "Ambient & Biometrics", items: ["Light/illuminance", "Microphone (level only)", "Battery & charging events", "Heart rate & sleep"] },
            ].map((card, i) => (
              <Card key={i} className="p-5">
                <h3 className="font-semibold">{card.t}</h3>
                <ul className="mt-2 text-sm text-slate-600 space-y-1 list-disc pl-5">
                  {card.items.map((it, idx) => (
                    <li key={idx}>{it}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="border-t">
        <div className="mx-auto max-w-[96rem] px-6 py-16">
          <motion.h2 {...appear} className="text-2xl font-bold">Privacy & Safety</motion.h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            <Card className="p-5">
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Raw data stays on the device.</li>
                <li>Sharing is opt-in and summarized.</li>
                <li>Encrypted local storage + biometric lock.</li>
                <li>Clear permissions and data-deletion controls.</li>
              </ul>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-slate-700">
                Moodi is <em>not</em> a diagnostic tool. It offers early warnings and self-monitoring support; clinical decisions belong to healthcare professionals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* TEAM with photos */}
      <section id="team" className="border-t bg-slate-50">
        <div className="mx-auto max-w-[96rem] px-6 py-16">
          <motion.h2 {...appear} className="text-2xl font-bold">Team</motion.h2>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((p, i) => (
              <motion.div
                key={i}
                {...appear}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 12px 30px rgba(110,86,207,0.15)" }}
                className="rounded-2xl border bg-white p-5 text-center"
              >
               <div className="mx-auto h-24 w-24 rounded-full overflow-hidden border border-[#e5e7eb] shadow-sm">
                <img
                  src={p.photo}
                  alt={p.n}
                  className="h-full w-full object-cover"
                />
              </div>
                <h3 className="mt-3 font-semibold">{p.n}</h3>
                <p className="text-xs text-slate-500">{p.id}</p>
                <p className="text-sm text-slate-600 mt-0.5">{p.r}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t">
        <div className="mx-auto max-w-[96rem] px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <motion.div {...appear}>
            <h2 className="text-2xl font-bold">Early Access & Demo</h2>
            <p className="mt-3 text-slate-700">
              For academic collaboration, mentorship, or pilot studies, leave a note below. We only ask for brief contact details—no raw data needed.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Sample clinician PDF summary</li>
              <li>Mockup screenshots</li>
              <li>Architecture notes</li>
            </ul>
          </motion.div>
          <Card className="p-6">
            <label className="block text-sm font-medium">Name</label>
            <input className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" placeholder="Your name" />
            <label className="block text-sm font-medium mt-4">Email</label>
            <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" placeholder="you@university.edu" />
            <label className="block text-sm font-medium mt-4">Message</label>
            <textarea rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2" placeholder="Short message" />
            <button type="button" className="mt-5 w-full rounded-2xl bg-[#6E56CF] text-white py-3 font-semibold hover:opacity-90">
              I’m interested
            </button>
            <p className="mt-2 text-xs text-slate-500">Button is a demo.</p>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-[96rem] px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <LogoMoodi className="h-5 w-5" />
            <span>© {new Date().getFullYear()} Moodi</span>
          </div>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-900">Privacy</a>
            <a href="#contact" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
