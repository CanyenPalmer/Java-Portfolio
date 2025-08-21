import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Linkedin, FileText } from "lucide-react";

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
   BASE LAYOUT HELPERS
------------------------------------------------------- */
const Section = ({ id, label, className = "", children }) => (
  <section id={id} aria-label={label} className={`container mx-auto px-4 ${className}`}>
    {children}
  </section>
);

const Divider = () => <div className="h-px w-full bg-white/10 my-16" />;

/* -------------------------------------------------------
   ANIMATION HELPERS
------------------------------------------------------- */
const Reveal = ({
  children,
  delay = 0,
  y = 18,
  threshold = 0.2,
  once = true,
  duration = 0.5,
  as: Tag = motion.div,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div style={{ opacity: 1, transform: "none" }}>{children}</div>;
  }

  return (
    <Tag
      initial={{ y, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once, amount: threshold, margin: "-20% 0px -20% 0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </Tag>
  );
};

const RevealGroup = ({ children, delay = 0, stagger = 0.12 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
  >
    {React.Children.map(children, (child) => (
      <motion.div
        variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {child}
      </motion.div>
    ))}
  </motion.div>
);

/* -------------------------------------------------------
   HERO NAME & TITLES
------------------------------------------------------- */
const HeroName = ({ text }) => {
  const parts = text.trim().split(/\s+/);
  const first = parts[0] ?? "";
  const last = parts.slice(1).join(" ") ?? "";
  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-center">
      <motion.span
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.0, type: "spring", stiffness: 120 }}
        viewport={{ once: true }}
        className="block tracking-[.2em] md:tracking-[.28em] mb-2"
      >
        {first}
      </motion.span>
      <motion.span
        initial={{ y: 24, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 120 }}
        viewport={{ once: true }}
        className="block tracking-[.2em] md:tracking-[.28em]"
      >
        {last}
      </motion.span>
    </h1>
  );
};

const SectionTitle = ({ text }) => (
  <motion.h2
    initial={{ y: 18, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
    transition={{ duration: 0.5 }}
    className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-center"
  >
    {text}
  </motion.h2>
);

const Pill = ({ children }) => (
  <span className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-wider uppercase">
    {children}
  </span>
);

const CTAButton = ({ href, children }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 font-semibold shadow-sm hover:shadow-md transition-shadow"
  >
    {children} <ArrowRight className="size-4" />
  </motion.a>
);

/* -------------------------------------------------------
   UTILITIES — LIVE CLOCK
------------------------------------------------------- */
const Clock = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="font-mono text-xs md:text-sm opacity-80 tabular-nums">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
};

/* -------------------------------------------------------
   CARDS
------------------------------------------------------- */
const ServiceCard = ({ index, title, desc, bullets }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group rounded-3xl border border-white/10 bg-white/[.03] p-6 md:p-8 hover:bg-white/[.06] transition-colors"
  >
    <div className="flex items-start justify-between mb-6">
      <Pill>{String(index + 1).padStart(2, "0")}</Pill>
      <ArrowRight className="size-5 opacity-60 group-hover:opacity-90 transition-opacity" />
    </div>
    <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-white/80 mb-4">{desc}</p>
    <ul className="text-sm text-white/70 grid grid-cols-2 gap-1">
      {bullets.map((b, i) => (
        <li key={i} className="before:content-['•'] before:mr-1 before:opacity-60">{b}</li>
      ))}
    </ul>
  </motion.div>
);

const WorkCard = ({ tag, title, role, year, url, img, alt }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="block rounded-3xl overflow-hidden border border-white/10 bg-white/[.03] hover:bg-white/[.06]"
  >
    <div className="aspect-video overflow-hidden">
      <img src={img} alt={alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
    </div>
    <div className="p-5 flex items-center justify-between">
      <div>
        <Pill>{tag}</Pill>
        <h3 className="text-lg md:text-xl font-semibold mt-2">{title}</h3>
        <p className="text-sm text-white/70">{role}</p>
      </div>
      <span className="text-sm text-white/60">{year}</span>
    </div>
  </motion.a>
);

/* -------------------------------------------------------
   Testimonial Card (no avatar)
------------------------------------------------------- */
const TestimonialCard = ({ quote, name, role }) => (
  <motion.figure
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-3xl border border-white/10 bg-white/[.03] p-6 md:p-8"
  >
    <blockquote className="text-white/85 leading-relaxed">“{quote}”</blockquote>
    <figcaption className="mt-5">
      <div className="font-medium">{name}</div>
      {role && <div className="text-sm text-white/60">{role}</div>}
    </figcaption>
  </motion.figure>
);

/* -------------------------------------------------------
   APP
------------------------------------------------------- */
export default function App() {
  const prefersReduced = useReducedMotion();

  /* Data */
  const services = useMemo(
    () => [
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
    ],
    []
  );

  const works = useMemo(
    () => [
      { tag: "Golf Physics", title: "MyCaddy — Shot Calculator", role: "Rangefinder • Physics", year: "2024", url: "https://github.com/CanyenPalmer/CanyenPalmer.github.io", img: IMG.mycaddy, alt: "MyCaddy rangefinder logo" },
      { tag: "Machine Learning", title: "Salifort Motors — Attrition", role: "Classification • ML", year: "2024", url: "https://github.com/CanyenPalmer/Logistic-Regression-and-Tree-based-Machine-Learning", img: IMG.salifort, alt: "Salifort Attrition project" },
      { tag: "Healthcare Ops", title: "CGM Billing Analytics", role: "EDA • Forecasting", year: "2024", url: "https://github.com/CanyenPalmer/CGM-Patient-Analytics", img: IMG.cgm, alt: "CGM billing analytics" },
      { tag: "Real Estate (R)", title: "Ames Housing — Price Modeling", role: "Regression • R", year: "2024", url: "https://github.com/CanyenPalmer/ames-housing", img: IMG.realEstate, alt: "Ames housing real estate modeling" },
      { tag: "Portfolio", title: "Portfolio (This Site)", role: "UI • Vite • Tailwind", year: "2025", url: "https://github.com/CanyenPalmer/Java-Portfolio-main", img: IMG.portfolio, alt: "Portfolio preview" },
    ],
    []
  );

  // Exactly two testimonials, no avatars
  const testimonials = useMemo(
    () => [
      {
        quote: "The MyCaddy tool gave us more confidence on the course! Super impressive.",
        name: "C. Smith",
        role: "Amateur Golfer",
      },
      {
        quote: "Palmer Projects delivered exactly what we needed — fast, clean, and professional.",
        name: "G. Waterman",
        role: "Sports Enthusiast",
      },
    ],
    []
  );

  /* Header */
  return (
    <main className="text-white bg-[#0b0b0f] min-h-screen">
      <header className="container mx-auto px-4 py-5 flex items-center justify-between">
        <a href="#home" className="text-sm tracking-widest opacity-90 hover:opacity-100 transition">
          CANYEN PALMER
        </a>
        <div className="flex items-center gap-3">
          {/* Resume stays in header (no header clock) */}
          <motion.a
            href="https://github.com/CanyenPalmer"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
          >
            <Github className="size-4" /> GitHub
          </motion.a>
          <motion.a
            href="https://2d7974f8-5fa5-4136-aaa2-354b07c4877e.filesusr.com/ugd/a966b5_f4890026c5b444fa945767c74232e285.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
          >
            <FileText className="size-4" /> Resume
          </motion.a>
          <CTAButton href="#contact">Book a Call</CTAButton>
        </div>
      </header>

      {/* HERO */}
      <Section id="home" label="Hero" className="pt-16 md:pt-24">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <div className="md:col-span-7 space-y-6">
            <RevealGroup delay={0.1} stagger={0.14}>
              <Pill>Data Scientist</Pill>

              <HeroName text="CANYEN PALMER" />

              {/* Multi-line caption */}
              <div className="text-white/85 max-w-2xl space-y-3">
                <p className="text-lg md:text-xl">
                  Data Scientist & Google Certified Data Analyst Professional specializing in statistics,
                  machine learning, predictive modeling, and optimization.
                </p>

                <p className="text-sm md:text-base">
                  <span className="font-semibold">Proficiency:</span> Python, Excel, Tableau
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Familiarities:</span> R, Java, SQL, Jes, Power BI, AI
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Tech Stack:</span> Pandas/NumPy, Scipy, seaborn, Matplotlib,
                  statsmodels, Tidyverse, Git, Jupyter, CSV, Quarto(.qmd)
                </p>

                <p className="text-sm md:text-base text-white/80">
                  In my spare time, I use machine learning and predictive analysis to refine golf strategy
                  for family and friends. I also optimize data logs from simulator feedback to create yardage
                  books for various golf courses!
                </p>
              </div>

              <div className="flex items-center gap-4">
                <CTAButton href="#contact">Let's Connect</CTAButton>
                <motion.a whileHover={{ opacity: 0.85 }} href="#works" className="underline underline-offset-4">
                  See my work
                </motion.a>
              </div>

              <div className="flex items-center gap-3 pt-2 text-sm text-white/70">
                <span>Available for select collaborations</span>
                <span className="opacity-50">•</span>
                <span>Open to proposals</span>
              </div>
            </RevealGroup>
          </div>

          {/* Floating headshot card (better rendering) */}
          <div className="md:col-span-5">
            <Reveal y={12}>
              <motion.div
                initial={{ y: 0 }}
                animate={prefersReduced ? {} : { y: [0, -8, 0] }}
                transition={prefersReduced ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="aspect-[4/5] rounded-3xl border border-white/10 bg-white/5 overflow-hidden"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Use <picture> so the browser picks the sharpest format/size */}
                <picture>
                  {/* Best quality/size first */}
                  <source
                    srcSet="/images/headshot.avif"
                    type="image/avif"
                  />
                  <source
                    srcSet="/images/headshot@2x.webp 2x, /images/headshot.webp 1x"
                    type="image/webp"
                  />
                  {/* Fallback JPG with DPR variants if you have them; otherwise your existing JPG */}
                  <img
                    src={IMG.hero}                     // fallback jpg
                    srcSet="/images/headshot@2x.jpg 2x, /images/headshot.jpg 1x"
                    alt="Canyen Palmer headshot"
                    className="w-full h-full object-cover"
                    width={960}                        // match the rendered 1x size
                    height={1200}
                    loading="eager"                    // prioritize hero
                    fetchpriority="high"               // hint: load this ASAP
                    decoding="async"
                  />
                </picture>
              </motion.div>
            </Reveal>
          </div>


      {/* ABOUT */}
      <Divider />
      <Section id="about" label="About" className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <SectionTitle text="About" />
          </Reveal>
          <div className="mt-6 space-y-4 text-white/85 leading-relaxed">
            <Reveal>
              <p>
                I’m a data-driven problem solver who cares about clarity and outcomes. My toolkit spans
                statistics, machine learning, and automation — always focused on shipping tools people actually use.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Recently I’ve been building small web apps for operations teams, automating spreadsheet and PDF
                workflows, and prototyping models that demonstrate value quickly.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Outside of work, I apply analytics to golf strategy for my circle — turning simulator feedback into
                practical yardage books and course-management insights.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Divider />
      <Section id="services" label="Services" className="py-8 md:py-12">
        <Reveal>
          <SectionTitle text="Services" />
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} index={i} title={s.title} desc={s.desc} bullets={s.bullets} />
          ))}
        </div>
      </Section>

      {/* WORK / PROJECTS */}
      <Divider />
      <Section id="works" label="Selected Work" className="py-8 md:py-12">
        <Reveal>
          <SectionTitle text="Selected Work" />
        </Reveal>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {works.map((w, i) => (
            <WorkCard key={i} tag={w.tag} title={w.title} role={w.role} year={w.year} url={w.url} img={w.img} alt={w.alt} />
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Divider />
      <Section id="testimonials" label="Testimonials" className="py-8 md:py-12">
        <Reveal>
          <SectionTitle text="Testimonials" />
        </Reveal>
        <div className="mt-8 grid md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} />
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Divider />
      <Section id="contact" label="Contact" className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <SectionTitle text="Let’s Connect" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-white/80">
              Have a project or idea you’d like to explore? I’m open to select collaborations.
            </p>
          </Reveal>
          {/* BUTTON ROW — always visible (no Reveal wrapper) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href="mailto:canyen2019@gmil.com">Email Me</CTAButton>
            <motion.a
              href="https://www.linkedin.com/in/canyen-palmer-b0b6762a0/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2"
            >
              <Linkedin className="size-4" /> LinkedIn
            </motion.a>
            <motion.a
              href="https://github.com/CanyenPalmer"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2"
            >
              <Github className="size-4" /> GitHub
            </motion.a>
          </div>
        </div>
      </Section>

      {/* LINKS (Footer) — no divider above, tight spacing, location + clock */}
      <Section id="links" label="Links" className="py-6">
        <Reveal>
          <SectionTitle text="Links" />
        </Reveal>
        <div className="mt-4 flex flex-col items-center space-y-2 text-white/70">
          <span>Indiana, USA</span>
          <Clock />
        </div>
        <div className="mt-4 text-center text-white/60">
          © {new Date().getFullYear()} Canyen Palmer
        </div>
      </Section>
      </main>
      }

