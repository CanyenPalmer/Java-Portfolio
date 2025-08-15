import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Quote, Github, Linkedin, Mail, Youtube, Instagram, FileText } from "lucide-react";

const IMG = {
  hero: "/images/headshot.jpg",
  mycaddy: "/images/mycaddy.jpg",
  salifort: "/images/salifort.png",
  cgm: "/images/cgm.jpg",
  realEstate: "/images/ames.jpg",
  portfolio: "/images/portfolio.png",
};

const Section = ({ id, label, children, className = "" }) => (
  <section id={id} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="sr-only"><h2>{label}</h2></div>
    {children}
  </section>
);

const Divider = () => <div className="h-px w-full bg-white/10 my-16"/>;

const BigSpacedWord = ({ text }) => {
  const words = text.trim().split(/\s+/); // split by spaces, keep words intact
  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
          className="inline-block tracking-[.2em] md:tracking-[.28em] mr-4 last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
};

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wide uppercase">
    {children}
  </span>
);

const CTAButton = ({ href = "#contact", children }) => (
  <a href={href} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white text-black px-5 py-3 font-semibold shadow-sm hover:shadow-lg transition-shadow">
    {children} <ArrowRight className="size-4"/>
  </a>
);

const ServiceCard = ({ index, title, desc, bullets }) => (
  <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group rounded-3xl border border-white/10 bg-white/[.03] p-6 md:p-8 hover:bg-white/[.06] transition-colors shadow-sm">
    <div className="flex items-start justify-between mb-6">
      <Pill>{String(index + 1).padStart(2, "0")}</Pill>
      <Pill>Service</Pill>
    </div>
    <h3 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h3>
    <p className="text-white/80 mb-6 leading-relaxed">{desc}</p>
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
      {bullets.map((b, i) => (
        <li key={i} className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white/90">{b}</li>
      ))}
    </ul>
  </motion.div>
);

const WorkCard = ({ tag, title, role, year, url, img, alt }) => (
  <motion.a href={url || "#"} target={url ? "_blank" : undefined} rel={url ? "noreferrer" : undefined}
    initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
    className="block rounded-3xl overflow-hidden border border-white/10 bg-white/[.03] hover:bg-white/[.06] transition-colors">
    <div className="aspect-video overflow-hidden">
      {img ? (
        <img src={img} alt={alt || title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full grid place-items-center bg-black/30">
          <PlayCircle className="size-16 md:size-20 opacity-70" />
        </div>
      )}
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

const Testimonial = ({ quote, author, title, avatar }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 md:p-8">
    <Quote className="size-8 mb-4 opacity-70"/>
    <p className="text-xl leading-relaxed mb-6">{quote}</p>
    <div className="flex items-center gap-4">
      <div className="size-12 rounded-full bg-white/10 overflow-hidden grid place-items-center">
        <span className="text-sm">{avatar ?? "👤"}</span>
      </div>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-white/70 text-sm">{title}</div>
      </div>
    </div>
  </div>
);

export default function App() {
  const services = useMemo(() => ([
    {
      title: "Data Apps & Automation",
      desc: "Operational tools that save hours and cut costs (Excel/PDF pipelines, web apps, and small APIs).",
      bullets: ["Python • Flask", "Excel / OpenPyXL", "ETL & Scheduling"],
    },
    {
      title: "Machine Learning & Analytics",
      desc: "From EDA to production‑ready models with clear business metrics and handoff docs.",
      bullets: ["scikit‑learn / XGBoost", "Feature Engineering", "Evaluation / Monitoring"],
    },
    {
      title: "Dashboards & Visualization",
      desc: "Insights that decision‑makers actually use: clean, fast, and grounded in the data.",
      bullets: ["Tableau / Power BI", "Matplotlib / ggplot2", "Storytelling"],
    },
  ]), []);

  const works = useMemo(() => ([
    { tag: "Golf Physics", title: "MyCaddy — Shot Calculator", role: "Design • Dev", year: "2024", url: "https://mycaddy.onrender.com/", img: IMG.mycaddy, alt: "MyCaddy rangefinder logo" },
    { tag: "Machine Learning", title: "Salifort Motors — Attrition ML", role: "EDA • Modeling", year: "2024", url: "https://github.com/CanyenPalmer/Logistic-Regression-and-Tree-based-Machine-Learning", img: IMG.salifort, alt: "Salifort Attrition project" },
    { tag: "Healthcare Ops", title: "CGM Billing Analytics", role: "Automation • Python", year: "2025", url: "https://github.com/CanyenPalmer/CGM-Patient-Analytics", img: IMG.cgm, alt: "CGM billing analytics" },
    { tag: "Real Estate (R)", title: "Ames Housing — Price Modeling", role: "Modeling • Viz", year: "2023", url: "https://github.com/CanyenPalmer/R-Coding---Real-estate-Conditions-Comparrison", img: IMG.realEstate, alt: "Ames housing real estate modeling" },
    { tag: "Portfolio", title: "Palmer Projects Blog", role: "Design", year: "2025", url: "https://github.com/CanyenPalmer/Java-Portfolio", img: IMG.portfolio, alt: "Palmer Projects blog thumbnail" },
  ]), []);

  const [tIndex, setTIndex] = useState(0);
  const testimonials = useMemo(() => ([
  {
    quote: "The MyCaddy tool gave us more confidence on the course! Super impressive.",
    author: "C. Smith",
    title: "Amateur Golfer",
  },
  {
    quote: "Palmer Projects delivered exactly what we needed — fast, clean, and professional.",
    author: "G. Waterman",
    title: "Football Enthusiast",
  },
]), []);

  return (
    <main className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),rgba(0,0,0,0)_60%),linear-gradient(180deg,#0a0a0a, #050505)] text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <a href="#home" className="font-semibold tracking-wide">Canyen Palmer</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:opacity-80">Services</a>
            <a href="#works" className="hover:opacity-80">Works</a>
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#testimonials" className="hover:opacity-80">Testimonials</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex gap-3">
            <a
              href="https://2d7974f8-5fa5-4136-aaa2-354b07c4877e.filesusr.com/ugd/a966b5_61a5d2301b5d4ab38f4bc989159e7c54.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-2xl border border-white/15 bg-white text-black px-4 py-2 font-semibold shadow-sm hover:shadow-lg transition-shadow"
            >
              <FileText className="size-4" /> Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white text-black px-4 py-2 font-semibold shadow-sm hover:shadow-lg transition-shadow">
              Book a Call <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <Section id="home" label="Hero" className="pt-16 md:pt-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <Pill>Data Scientist</Pill>
            <BigSpacedWord text="CANYEN PALMER" />
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
            <div className="aspect-[4/5] rounded-3xl border border-white/10 bg-white/5 overflow-hidden grid place-items-center">
              <img src={IMG.hero} alt="Canyen Palmer headshot" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      <Divider/>

      {/* SERVICES */}
      <Section id="services" label="Services" className="py-6">
        <div className="mb-8">
          <BigSpacedWord text="My Services" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} index={i} {...s} />
          ))}
        </div>
      </Section>

      <Divider/>

      {/* WORKS */}
      <Section id="works" label="Selected Works" className="py-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">Selected Works</h2>
          <div className="text-white/70">({works.length})</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((w, i) => (
            <WorkCard key={i} {...w} />
          ))}
        </div>
      </Section>

      <Divider/>

      {/* ABOUT */}
<Section id="about" label="About" className="py-6">
  <div className="grid md:grid-cols-12 gap-8 items-center">
    {/* Left: portrait */}
    <div className="md:col-span-5">
      <div className="aspect-square rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        <img
          src="/images/portrait.jpg"
          alt="Canyen Palmer"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Right: copy */}
    <div className="md:col-span-7 space-y-4">
      <Pill>Designer, Developer, Creator</Pill>
      <h3 className="text-3xl md:text-4xl font-semibold">About me</h3>
      <p className="text-white/85 leading-relaxed">
        I turn business questions into deployable models and tools. I’m the Lead Analyst at Iconic Care Inc. (June 2025–present) and a Data Science M.S. student at the University of Pittsburgh (Aug 2025–present). Previously B.G.S. in Mathematics and A.A. in Computer Science from Ball State University. Tools I like: Python/Flask, React, SQLite, pandas, scikit-learn, tidyverse, and clean spreadsheets.
      </p>
    </div>
  </div>
</Section>

     {/* TESTIMONIALS */}
<Section id="testimonials" label="Testimonials" className="py-6">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-3xl md:text-4xl font-semibold">
      “{testimonials[tIndex].quote}”
    </h3>
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTIndex((tIndex - 1 + testimonials.length) % testimonials.length)}
        className="rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
      >
        Prev
      </button>
      <button
        onClick={() => setTIndex((tIndex + 1) % testimonials.length)}
        className="rounded-xl border border-white/15 px-3 py-2 hover:bg-white/10"
      >
        Next
      </button>
    </div>
  </div>

  <div className="text-white/70 mb-4">
    <strong>{testimonials[tIndex].author}</strong> — {testimonials[tIndex].title}
  </div>

  <div className="mt-4 text-center text-sm text-white/70">
    {tIndex + 1} / {testimonials.length}
  </div>
</Section>

      {/* CONTACT */}
      <Section id="contact" label="Contact" className="py-12">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <BigSpacedWord text={"Connect With Me"} />
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CTAButton href="mailto:canyen2019@gmail.com">Get In Touch</CTAButton>
              <a href="mailto:canyen2019@gmail.com" className="underline underline-offset-4">canyen2019@gmail.com</a>
            </div>
            <p className="mt-4 text-white/70">Working globally • Based in Indiana</p>
          </div>
          <div className="md:col-span-4">
            <div className="rounded-3xl border border-white/10 p-6 space-y-3">
              <div className="flex items-center gap-3"><Mail className="size-4"/> <a href="mailto:canyen2019@gmail.com" className="hover:underline">Email</a></div>
              <div className="flex items-center gap-3"><Linkedin className="size-4"/> <a href="https://www.linkedin.com/in/canyen-palmer-b0b6762a0/" className="hover:underline">LinkedIn</a></div>
              <div className="flex items-center gap-3"><Github className="size-4"/> <a href="https://github.com/CanyenPalmer" className="hover:underline" target="_blank" rel="noreferrer">GitHub</a></div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-3 gap-6 items-center">
          <div className="text-sm text-white/70">© {new Date().getFullYear()} Canyen Palmer. All rights reserved.</div>
          <div className="text-center text-sm text-white/60">Local time: America/Indiana/Indianapolis</div>
          <div className="flex justify-end gap-4 text-sm">
            <a className="hover:underline" href="#home">Home</a>
            <a className="hover:underline" href="#services">Services</a>
            <a className="hover:underline" href="#works">Works</a>
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
