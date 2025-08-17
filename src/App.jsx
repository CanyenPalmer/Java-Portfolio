import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle, Github, Linkedin, Mail, FileText } from "lucide-react";

/* -------------------------------------------------------
   ASSETS
------------------------------------------------------- */
const IMG = {
  hero: "/images/headshot.jpg",
  mycaddy: "/images/mycaddy.jpg",
  salifort: "/images/salifort.png",
  cgm: "/images/cgm.jpg",
  realEstate: "/images/ames.jpg",
  portfolio: "/images/portfolio.png",
};

/* -------------------------------------------------------
   LAYOUT HELPERS
------------------------------------------------------- */
const Section = ({ id, label, children, className = "" }) => (
  <section id={id} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="sr-only"><h2>{label}</h2></div>
    {children}
  </section>
);

/* Animated divider */
const Divider = () => (
  <div className="my-16">
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-px w-full origin-left bg-white/10"
    />
  </div>
);

/* -------------------------------------------------------
   TITLES
------------------------------------------------------- */
/* Stacked, staggered hero name */
const HeroName = ({ text }) => {
  const [first, last] = text.trim().split(/\s+/, 2);

  const word = {
    hidden: { y: 24, opacity: 0 },
    show: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.08, type: "spring", stiffness: 140 },
    }),
  };

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-center leading-tight">
      <motion.span
        custom={0}
        variants={word}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="block tracking-[.2em] md:tracking-[.28em]"
      >
        {first}
      </motion.span>
      <motion.span
        custom={1}
        variants={word}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="block tracking-[.2em] md:tracking-[.28em]"
      >
        {last}
      </motion.span>
    </h1>
  );
};

/* Section title reveal */
const SectionTitle = ({ text }) => (
  <motion.h2
    initial={{ y: 18, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-center tracking-wide"
  >
    {text}
  </motion.h2>
);

/* -------------------------------------------------------
   UI PRIMITIVES
------------------------------------------------------- */
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide uppercase">
    {children}
  </span>
);

/* Delightful CTA button */
const CTAButton = ({ href = "#contact", children }) => (
  <motion.a
    href={href}
    whileHover={{ y: -2, scale: 1.03, boxShadow: "0 12px 28px rgba(255,255,255,0.15)" }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white text-black px-5 py-3 font-semibold shadow-sm transition-shadow"
  >
    {children} <ArrowRight className="size-4" />
  </motion.a>
);

/* Navbar underline sweep */
const NavLink = ({ href, children }) => (
  <a href={href} className="relative group hover:opacity-90 transition-opacity">
    <span>{children}</span>
    <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-white/80 transition-all duration-300 group-hover:w-full" />
  </a>
);

/* -------------------------------------------------------
   CARDS
------------------------------------------------------- */
const ServiceCard = ({ index, title, desc, bullets }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group rounded-3xl border border-white/10 bg-white/[.03] p-6 md:p-8 hover:bg-white/[.06] transition-colors shadow-sm"
  >
    <div className="flex items-start justify-between mb-6">
      <Pill>{String(index + 1).padStart(2, "0")}</Pill>
      <Pill>Service</Pill>
    </div>
    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white/80 mb-6 leading-relaxed">{desc}</p>
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
      {bullets.map((b, i) => (
        <li key={i} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white/90">
          {b}
        </li>
      ))}
    </ul>
  </motion.div>
);

/* Project card lift + overlay on hover */
const WorkCard = ({ tag, title, role, year, url, img, alt }) => (
  <motion.a
    href={url || "#"}
    target={url ? "_blank" : undefined}
    rel={url ? "noopener noreferrer" : undefined}
    initial={{ y: 12, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -6 }}
    className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/[.03] hover:bg-white/[.06] transition-colors"
  >
    <div className="relative aspect-video overflow-hidden">
      {img ? (
        <img
          src={img}
          alt={alt || title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="w-full h-full grid place-items-center bg-black/30">
          <PlayCircle className="size-16 md:size-20 opacity-70" />
        </div>
      )}

      {/* Gradient overlay + badge on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute bottom-3 right-3 text-xs tracking-wide bg-white text-black px-2 py-1 rounded-full"
      >
        View
      </motion.div>
    </div>

    <div className="p-5 md:p-6 border-t border-white/10">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide mb-2 text-white/70">
        <Pill>{tag}</Pill>
        <Pill>{year}</Pill>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <h4 className="text-lg md:text-xl font-semibold">{title}</h4>
        <span className="text-white/60">•</span>
        <p className="text-white/80">{role}</p>
      </div>
    </div>
  </motion.a>
);

/* -------------------------------------------------------
   LOCAL TIME WIDGET
------------------------------------------------------- */
function LocalTime({ timeZone = "America/Indiana/Indianapolis", label = "Indianapolis" }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone, hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  }).format(now);

  const tzParts = new Intl.DateTimeFormat("en-US", {
    timeZone, timeZoneName: "short", hour: "numeric",
  }).formatToParts(now);
  const tzShort = tzParts.find((p) => p.type === "timeZoneName")?.value ?? "";

  return <span aria-label={`Local time in ${label}`}>{time} {tzShort}</span>;
}

/* -------------------------------------------------------
   PAGE
------------------------------------------------------- */
export default function App() {
  /* Data */
  const services = useMemo(() => [
    {
      title: "Data Apps & Automation",
      desc: "Operational tools that save hours and cut costs (Excel/PDF pipelines, web apps, and small APIs).",
      bullets: ["Python • Flask", "Excel / OpenPyXL", "ETL & Scheduling"],
    },
    {
      title: "Machine Learning & Analytics",
      desc: "From EDA to production-ready models with clear business metrics and handoff docs.",
      bullets: ["scikit-learn / XGBoost", "Feature Engineering", "Evaluation / Monitoring"],
    },
    {
      title: "Dashboards & Visualization",
      desc: "Insights that decision-makers actually use: clean, fast, and grounded in the data.",
      bullets: ["Tableau / Power BI", "Matplotlib / ggplot2", "Storytelling"],
    },
  ], []);

  const works = useMemo(() => [
    { tag: "Golf Physics", title: "MyCaddy — Shot Calculator", role: "Design • Dev", year: "2025", url: "https://mycaddy.onrender.com/", img: IMG.mycaddy, alt: "MyCaddy rangefinder logo" },
    { tag: "Machine Learning", title: "Salifort Motors — Attrition ML", role: "EDA • Modeling", year: "2024", url: "https://github.com/CanyenPalmer/Logistic-Regression-and-Tree-based-Machine-Learning", img: IMG.salifort, alt: "Salifort Attrition project" },
    { tag: "Healthcare Ops", title: "CGM Billing Analytics", role: "Automation • Python", year: "2025", url: "https://github.com/CanyenPalmer/CGM-Patient-Analytics", img: IMG.cgm, alt: "CGM billing analytics" },
    { tag: "Real Estate (R)", title: "Ames Housing — Price Modeling", role: "Modeling • Viz", year: "2023", url: "https://github.com/CanyenPalmer/R-Coding---Real-estate-Conditions-Comparrison", img: IMG.realEstate, alt: "Ames housing real estate modeling" },
    { tag: "Portfolio", title: "Portfolio (This Site)", role: "Design", year: "2025", url: "https://github.com/CanyenPalmer/Java-Portfolio", img: IMG.portfolio, alt: "Portfolio site" },
  ], []);

  const [tIndex, setTIndex] = useState(0);
  const testimonials = useMemo(() => [
    { quote: "The MyCaddy tool gave us more confidence on the course! Super impressive.", author: "C. Smith", title: "Amateur Golfer" },
    { quote: "Palmer Projects delivered exactly what we needed — fast, clean, and professional.", author: "G. Waterman", title: "Football Enthusiast" },
  ], []);

  /* Testimonial animation variants */
  const tVariants = {
    enter: { opacity: 0, y: 12 },
    center: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),rgba(0,0,0,0)_60%),linear-gradient(180deg,#0a0a0a,#050505)] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <a href="#home" className="font-semibold tracking-wide">Canyen Palmer</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#works">Works</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </nav>
          <div className="flex gap-3">
            <a
              href="https://2d7974f8-5fa5-4136-aaa2-354b07c4877e.filesusr.com/ugd/a966b5_adcc449c5de34caaa27646a5f237bc27.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-2xl border border-white/15 bg-white text-black px-4 py-2 font-semibold shadow-sm hover:shadow-lg transition-shadow"
            >
              <FileText className="size-4" /> Resume
            </a>
            <CTAButton href="#contact">Book a Call</CTAButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <Section id="home" label="Hero" className="pt-16 md:pt-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <Pill>Data Scientist</Pill>
            <HeroName text="CANYEN PALMER" />
            <p className="text-lg md:text-xl text-white/85 max-w-2xl">
              I build data products and decision tools that turn messy datasets into clear, measurable outcomes — from ML models to automated billing analytics to polished web apps.
            </p>
            <div className="flex items-center gap-4">
              <CTAButton href="#contact">Let's Connect</CTAButton>
              <a href="#works" className="underline underline-offset-4">See my work</a>
            </div>
            <div className="flex items-center gap-3 pt-2 text-sm text-white/70">
              <span>Available for select collaborations</span>
              <span className="opacity-50">•</span>
              <span>Open to proposals</span>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="aspect-[4/5] rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <img
                src={IMG.hero}
                alt="Canyen Palmer headshot"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* SERVICES */}
      <Section id="services" label="Services" className="py-6">
        <SectionTitle text="My Services" />
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {services.map((s, i) => (
            <ServiceCard key={i} index={i} {...s} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* WORKS */}
      <Section id="works" label="Selected Works" className="py-6">
        <SectionTitle text="Projects" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {works.map((w, i) => (
            <WorkCard key={i} {...w} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* ABOUT */}
      <Section id="about" label="About" className="py-6">
        <SectionTitle text="About Me" />
        <div className="grid md:grid-cols-12 gap-8 items-center mt-8">
          <div className="md:col-span-5">
            <div className="aspect-square rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <img
                src="/images/portrait.jpg"
                alt="Canyen Palmer portrait"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className="md:col-span-7 space-y-4">
            <Pill>Designer, Developer, Creator</Pill>
            <p className="text-white/85 leading-relaxed">
              I turn business questions into deployable models and tools. I’m the Lead Analyst at Iconic Care Inc. (June 2025–present) and a Data Science M.S. student at the University of Pittsburgh (Aug 2025–present). Previously B.G.S. in Mathematics and A.A. in Computer Science from Ball State University. Tools I like: Python/Flask, React, SQLite, pandas, scikit-learn, tidyverse, and clean spreadsheets.
            </p>
            <p className="text-white/80 leading-relaxed">
              Website tech stack: React, Tailwind CSS, Framer Motion, Lucide-react, JavaScript, HTML, CSS.
            </p>
          </div>
        </div>
      </Section>

      <Divider />

      {/* TESTIMONIALS */}
      <Section id="testimonials" label="Testimonials" className="py-6">
        <SectionTitle text="Testimonials" />
        {testimonials.length > 0 ? (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={tIndex}
                  variants={tVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-2xl md:text-3xl font-semibold max-w-3xl"
                >
                  “{testimonials[tIndex].quote}”
                </motion.h3>
              </AnimatePresence>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous testimonial"
                  onClick={() => setTIndex((tIndex - 1 + testimonials.length) % testimonials.length)}
                  className="rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
                >
                  Prev
                </button>
                <button
                  aria-label="Next testimonial"
                  onClick={() => setTIndex((tIndex + 1) % testimonials.length)}
                  className="rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${tIndex}`}
                variants={tVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-white/70 mb-2"
              >
                <strong>{testimonials[tIndex].author}</strong> — {testimonials[tIndex].title}
              </motion.div>
            </AnimatePresence>

            <div className="mt-2 text-center text-sm text-white/70">
              {tIndex + 1} / {testimonials.length}
            </div>
          </div>
        ) : (
          <p className="text-white/70 mt-6 text-center">Testimonials coming soon.</p>
        )}
      </Section>

      <Divider />

      {/* CONTACT */}
      <Section id="contact" label="Contact" className="py-12">
        <SectionTitle text="Connect With Me" />
        <div className="grid md:grid-cols-12 gap-6 items-center mt-8">
          <div className="md:col-span-8">
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CTAButton href="mailto:canyen2019@gmail.com">Get In Touch</CTAButton>
              <a href="mailto:canyen2019@gmail.com" className="underline underline-offset-4">
                canyen2019@gmail.com
              </a>
            </div>
            <p className="mt-4 text-white/70">Working globally • Based in Indiana</p>
          </div>
          <div className="md:col-span-4">
            <div className="rounded-3xl border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <a href="mailto:canyen2019@gmail.com" className="hover:underline">Email</a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="size-4" />
                <a
                  href="https://www.linkedin.com/in/canyen-palmer-b0b6762a0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="size-4" />
                <a
                  href="https://github.com/CanyenPalmer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="text-sm text-white/70">© {new Date().getFullYear()} Canyen Palmer. All rights reserved.</div>
          <div className="text-center text-sm text-white/60">
            Local time: <LocalTime timeZone="America/Indiana/Indianapolis" label="Indianapolis" />
          </div>
          <div className="flex justify-end gap-4 text-sm">
            <a className="hover:underline" href="#home">Home</a>
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#works">Works</a>
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#testimonials">Testimonials</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

