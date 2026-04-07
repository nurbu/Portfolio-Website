"use client";

import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAME = "Nurbu Lama";
const TITLE = "Software Engineer & CS Student";
const TAGLINE = "I build AI-powered tools, teach others to code, and ship things that matter.";

const ABOUT = `I'm a CS student at Montclair State University (B.S. CS, Minor in Data Science, graduating 2027) focused on full-stack and AI-driven applications. I like projects with a real purpose — an academic planner that actually reads the course catalog, a safety app built on real crime data, not dummy data.

I've also spent time on the teaching side: I ran web development sessions for 100+ students at CodePath, which honestly made me a better engineer. Right now I'm a plugin developer at AstroMiner, a Minecraft server startup in active development, building and shipping Java plugins on a live codebase with a real team.

Breakthrough Tech fellow, Presidential Scholarship recipient, Dean's List six times at Montclair State. Actively looking to contribute to open source and work on things that matter.`;

const NAV_ITEMS = ["About", "Experience", "Projects"];

const SOCIAL = [
  { label: "GitHub", url: "https://github.com/nurbu5" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/nurbu-lama" },
  { label: "Email", url: "mailto:lamanurbu@gmail.com" },
];

const EXPERIENCE = [
  {
    period: "Feb 2026 — Present",
    title: "Plugin Developer",
    company: "AstroMiner",
    url: "#",
    desc: "Building a custom gravity mechanics plugin in Java for a startup Minecraft server ahead of public launch. Uses the Paper API with WorldEdit and WorldGuard for region-aware behavior. Working on a shared codebase with a small dev team — real Git workflow, real deadlines.",
    tags: ["Java 21", "Paper API", "WorldEdit", "WorldGuard", "Maven"],
  },
  {
    period: "Jan 2025 — May 2025",
    title: "Web Development Instructor",
    company: "CodePath",
    url: "https://codepath.org",
    desc: "Taught HTML, CSS, and JavaScript to 100+ students through project-based learning, pair programming, and code reviews. Ran 3+ collaborative projects in an Agile-style cycle. The class hit 99% completion, which I'm proud of — that number doesn't happen without real buy-in from students.",
    tags: ["HTML", "CSS", "JavaScript", "Agile", "Code Review"],
  },
];

const PROJECTS = [
  {
    title: "Course Compass",
    url: "https://github.com/nurbu5/CourseCompass",
    desc: "AI-powered academic planner with a full RAG pipeline. It ingests official course catalogs, generates personalized degree plans, and checks every recommendation against prerequisite graphs so it doesn't hallucinate requirements. Auth handled by Firebase JWT.",
    tags: ["C#", ".NET", "Firebase", "RAG", "Prisma DB", "LLM"],
    badge: "",
  },
  {
    title: "SafeCity",
    url: "https://github.com/nurbu5/safeCity",
    desc: "Built at a hackathon. Maps safe walking routes through Newark using real public crime data, Mapbox GL for visualization, and OpenAI to generate route recommendations based on actual crime density — not guesses.",
    tags: ["Next.js", "TypeScript", "Mapbox GL", "OpenAI", "GeoTIFF", "Tailwind"],
    badge: "",
  },
  {
    title: "Air Quality Detection",
    url: "https://github.com/nehajanar/Air-Quality-Detection",
    desc: "Air quality forecasting system using a hybrid LSTM + embedding neural network. Trained on 40,000+ real EPA data points to model pollutant and weather trends over time. Ended up at MAE: 8.17, which held up well across different regions.",
    tags: ["Python", "TensorFlow", "LSTM", "Keras", "Scikit-learn"],
    badge: "",
  },
  {
    title: "Web Auto-Gen",
    url: "#",
    desc: "Full-stack platform where LLMs generate HTML, CSS, and JS from structured user instructions through an NLP pipeline. Added backend validation and sanitization because unchecked LLM output is a mess — this keeps the generated code actually usable.",
    tags: ["React", "Python", "MongoDB", "LLM", "NLP"],
    badge: "",
  },
  {
    title: "Gravity Minecraft Plugin",
    url: "https://github.com/nurbu5/Beginging",
    desc: "The same gravity plugin I'm actively building at AstroMiner. Paper API (Java 21), region-aware behavior via WorldEdit and WorldGuard. Currently running on a live server.",
    tags: ["Java 21", "Paper API", "WorldEdit", "WorldGuard", "Maven"],
    badge: "In Development",
  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      style={{ display: "inline", marginLeft: "4px" }}
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

const socialIcons: Record<string, () => JSX.Element> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: EmailIcon,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tags({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
      {items.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: "12px",
            fontWeight: 500,
            background: "rgba(100,255,218,0.1)",
            color: "#64ffda",
            padding: "4px 12px",
            borderRadius: "20px",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ExpCard({ item }: { item: (typeof EXPERIENCE)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: "24px",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "4px",
        background: hovered ? "rgba(100,255,218,0.04)" : "transparent",
        border: hovered ? "1px solid rgba(100,255,218,0.1)" : "1px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: "110px",
          paddingTop: "4px",
          fontSize: "12px",
          color: "#475569",
          letterSpacing: "0.04em",
          lineHeight: 1.5,
        }}
      >
        {item.period}
      </div>
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            color: hovered ? "#64ffda" : "#e2e8f0",
            marginBottom: "6px",
            transition: "color 0.2s",
          }}
        >
          {item.title} ·{" "}
          <a href={item.url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            {item.company}
            <ArrowIcon />
          </a>
        </h3>
        <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#94a3b8" }}>{item.desc}</p>
        <Tags items={item.tags} />
      </div>
    </div>
  );
}

function ProjectCard({ item }: { item: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "4px",
        background: hovered ? "rgba(100,255,218,0.04)" : "transparent",
        border: hovered ? "1px solid rgba(100,255,218,0.1)" : "1px solid transparent",
        transition: "all 0.2s",
      }}
    >
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 600,
          color: hovered ? "#64ffda" : "#e2e8f0",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
          transition: "color 0.2s",
        }}
      >
        <a href={item.url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
          {item.title}
          <ArrowIcon />
        </a>
        {item.badge && (
          <span
            style={{
              fontSize: "11px",
              fontWeight: 500,
              background: "rgba(100,255,218,0.1)",
              color: "#64ffda",
              padding: "2px 8px",
              borderRadius: "20px",
            }}
          >
            {item.badge}
          </span>
        )}
      </h3>
      <p style={{ fontSize: "14px", lineHeight: "1.65", color: "#94a3b8" }}>{item.desc}</p>
      <Tags items={item.tags} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");

  const aboutRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const projRef = useRef<HTMLElement>(null);

  const sectionRefs: Record<string, React.RefObject<HTMLElement | null>> = {
    About: aboutRef,
    Experience: expRef,
    Projects: projRef,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).dataset.section ?? "");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.dataset.section = key;
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        background: "#0f172a",
        color: "#94a3b8",
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1100px", width: "100%", display: "flex", padding: "0 48px" }}>

        {/* ── Left panel ── */}
        <div
          style={{
            width: "340px",
            flexShrink: 0,
            padding: "80px 0",
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1 style={{ fontSize: "34px", fontWeight: 700, color: "#e2e8f0", marginBottom: "8px", lineHeight: 1.1 }}>
              {NAME}
            </h1>
            <h2 style={{ fontSize: "16px", fontWeight: 500, color: "#cbd5e1", marginBottom: "16px" }}>
              {TITLE}
            </h2>
            <p style={{ fontSize: "14px", lineHeight: "1.6", maxWidth: "260px", marginBottom: "48px", color: "#64748b" }}>
              {TAGLINE}
            </p>

            <nav style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "48px" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item;
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      padding: "4px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      color: isActive ? "#e2e8f0" : "#475569",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        height: "1px",
                        background: isActive ? "#64ffda" : "#1e293b",
                        width: isActive ? "48px" : "24px",
                        transition: "all 0.25s",
                        flexShrink: 0,
                      }}
                    />
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            {SOCIAL.map(({ label, url }) => {
              const Icon = socialIcons[label];
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{ color: "#475569", transition: "color 0.2s", display: "flex" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div style={{ flex: 1, padding: "80px 0 120px 80px" }}>

          <section ref={aboutRef} style={{ marginBottom: "96px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64ffda",
                marginBottom: "28px",
              }}
            >
              About
            </p>
            {ABOUT.split("\n\n").map((paragraph, i) => (
              <p key={i} style={{ fontSize: "15px", lineHeight: "1.75", marginBottom: "18px", color: "#94a3b8" }}>
                {paragraph}
              </p>
            ))}
          </section>

          <section ref={expRef} style={{ marginBottom: "96px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64ffda",
                marginBottom: "28px",
              }}
            >
              Experience
            </p>
            {EXPERIENCE.map((item, i) => (
              <ExpCard key={i} item={item} />
            ))}
          </section>

          <section ref={projRef} style={{ marginBottom: "96px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#64ffda",
                marginBottom: "28px",
              }}
            >
              Projects
            </p>
            {PROJECTS.map((item, i) => (
              <ProjectCard key={i} item={item} />
            ))}
          </section>

          <footer
            style={{
              fontSize: "13px",
              color: "#334155",
              lineHeight: "1.7",
              borderTop: "1px solid #1e293b",
              paddingTop: "32px",
            }}
          >
            Built with Next.js, deployed on Vercel. Inspired by{" "}
            <a href="https://brittanychiang.com" target="_blank" rel="noreferrer" style={{ color: "#64ffda", textDecoration: "none" }}>
              Brittany Chiang
            </a>
            .
          </footer>
        </div>
      </div>
    </div>
  );
}
