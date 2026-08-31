import ContactForm from "@/components/ContactForm";
import Yantra from "@/components/Yantra";

const services = [
  {
    n: "01",
    title: "Web Development",
    body: "Marketing sites, dashboards, and full-stack web apps — designed, built, and shipped end to end.",
  },
  {
    n: "02",
    title: "Custom Software",
    body: "Purpose-built tools and platforms for teams whose workflows don't fit off-the-shelf products.",
  },
  {
    n: "03",
    title: "Ongoing Support",
    body: "Maintenance, iteration, and infrastructure for products already in the hands of real users.",
  },
];

const work = [
  {
    name: "ChantTracker",
    desc: "A japa and chant-tracking platform for daily spiritual practice, spanning web, iOS, and Android.",
    href: "https://chanttracker.sohum.cc",
    tag: "Web · iOS · Android",
    pigment: "var(--gulabi)",
  },
  {
    name: "SPJRSD",
    desc: "The community website for Sri Peddajeeyarla Sri Ramachandra Swamy Devasthanam, Cheruvugattu.",
    href: "https://cheruvugattu.online",
    tag: "Web",
    pigment: "var(--mor)",
  },
];

const navLinks = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export default function Home() {
  return (
    <div className="flex-1">
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-rule">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none tracking-tight">SoHum</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sindoor" />
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm">
            {navLinks.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-fg-2 hover:text-sindoor transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="grain relative overflow-hidden border-b border-rule">
          <Yantra className="spin-slow pointer-events-none absolute -right-28 -top-20 w-[34rem] text-sindoor/15 sm:-right-20 sm:w-[44rem]" />

          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-28 sm:pt-32 sm:pb-40">
            <p
              className="rise flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="hidden h-px w-10 bg-sindoor sm:block" />
              <span className="font-display text-3xl leading-none text-sindoor">
                सोऽहं
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.32em] text-fg-2">
                Sōham — &ldquo;I am that&rdquo;
              </span>
            </p>

            <h1
              className="rise font-display mt-8 max-w-4xl text-[15vw] leading-[0.88] tracking-tight sm:text-[6.5rem] md:text-[7.5rem]"
              style={{ animationDelay: "0.15s" }}
            >
              We build the software{" "}
              <span className="text-sindoor">behind the work.</span>
            </h1>

            <p
              className="rise mt-10 max-w-xl text-lg leading-relaxed text-fg-2"
              style={{ animationDelay: "0.28s" }}
            >
              SoHum Digital Services is a proprietary studio designing and
              developing websites and custom software — every product we ship
              carries the same hand.
            </p>

            <div
              className="rise mt-12 flex flex-wrap items-center gap-6"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="#contact"
                className="plate group inline-flex items-center gap-3 bg-sindoor px-7 py-4 font-medium text-bg transition-transform hover:-translate-y-0.5 hover:translate-x-0.5"
              >
                Start a project
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
              <a
                href="#work"
                className="border-b-2 border-fg/25 pb-1 text-fg-2 transition-colors hover:border-sindoor hover:text-fg"
              >
                See the work
              </a>
            </div>
          </div>

          {/* Pigment stripe — the palette, stated plainly */}
          <div className="flex h-2">
            <span className="flex-[3] bg-sindoor" />
            <span className="flex-[2] bg-haldi" />
            <span className="flex-[1] bg-mor" />
            <span className="flex-[2] bg-neel" />
            <span className="flex-[1] bg-gulabi" />
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section
          id="services"
          className="theme-dark grain relative overflow-hidden bg-neel-deep text-[#f7eeda]"
        >
          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <div className="flex items-end justify-between gap-8 mb-16">
              <h2 className="font-display text-4xl sm:text-6xl leading-none">
                What we do
              </h2>
              <span className="hidden font-mono text-xs uppercase tracking-[0.28em] text-[#f7eeda]/45 sm:block">
                Three ways in
              </span>
            </div>

            <div className="grid gap-x-10 gap-y-14 sm:grid-cols-3">
              {services.map((s) => (
                <div key={s.n} className="group">
                  <span className="font-display block text-6xl leading-none text-haldi transition-transform duration-300 group-hover:-translate-y-1">
                    {s.n}
                  </span>
                  <div className="mt-5 h-px w-full bg-[#f7eeda]/20 transition-colors duration-300 group-hover:bg-haldi" />
                  <h3 className="font-display mt-5 text-2xl">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-[#f7eeda]/65">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Work ─────────────────────────────────────────── */}
        <section id="work" className="grain relative bg-bg-2 border-b border-rule">
          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <h2 className="font-display text-4xl sm:text-6xl leading-none mb-4">
              Selected work
            </h2>
            <p className="text-fg-2 mb-16 max-w-md">
              Products designed, built, and still maintained in-house.
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              {work.map((w) => (
                <a
                  key={w.name}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="plate group relative flex flex-col border border-fg/15 bg-bg-3 transition-transform duration-300 hover:-translate-y-1.5 hover:translate-x-1"
                >
                  <span
                    className="h-2.5 w-full"
                    style={{ backgroundColor: w.pigment }}
                  />
                  <div className="flex flex-1 flex-col p-8 sm:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-3xl leading-none">{w.name}</h3>
                      <span
                        aria-hidden
                        className="font-mono text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        style={{ color: w.pigment }}
                      >
                        ↗
                      </span>
                    </div>
                    <p className="mt-5 flex-1 leading-relaxed text-fg-2">{w.desc}</p>
                    <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-fg-2/70">
                      {w.tag}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────── */}
        <section id="about" className="grain relative overflow-hidden border-b border-rule">
          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <div className="grid gap-12 sm:grid-cols-[1fr_1.6fr] sm:gap-16">
              <div>
                <h2 className="font-display text-4xl sm:text-6xl leading-none">About</h2>
                <div className="mt-8 inline-block bg-sindoor px-5 py-4 text-bg">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] opacity-80">
                    Registered
                  </span>
                  <span className="font-display mt-1 block text-2xl leading-none">
                    Udyam · India
                  </span>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-fg-2">
                <p>
                  SoHum Digital Services is a sole proprietorship registered
                  under the Udyam scheme, building websites and software
                  products end to end — from first design to production
                  infrastructure.
                </p>
                <p>
                  Every product listed under Work is developed and maintained
                  by SoHum, from spiritual-practice apps to community
                  platforms.
                </p>
                <p className="font-display text-2xl leading-snug text-fg">
                  One studio, one hand — design through deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────── */}
        <section
          id="contact"
          className="theme-dark grain relative overflow-hidden bg-[#1c1410] text-[#f7eeda]"
        >
          <Yantra className="pointer-events-none absolute -left-32 -bottom-40 w-[36rem] text-haldi/10" />

          <div className="relative max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <div className="grid gap-14 sm:grid-cols-[1fr_1.3fr] sm:gap-20">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-haldi flex items-center gap-4">
                  <span className="h-px w-10 bg-haldi" />
                  Contact
                </p>
                <h2 className="font-display mt-6 text-4xl sm:text-6xl leading-[0.95]">
                  Let&rsquo;s build something
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[#f7eeda]/60">
                  Tell us what you&rsquo;re working on and we&rsquo;ll get back
                  to you.
                </p>
                <a
                  href="mailto:info@sohum.cc"
                  className="mt-8 inline-block font-mono text-sm text-haldi border-b border-haldi/40 pb-1 transition-colors hover:border-haldi"
                >
                  info@sohum.cc
                </a>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="theme-dark bg-[#140f0c] text-[#f7eeda]">
        <div className="flex h-1.5">
          <span className="flex-[3] bg-sindoor" />
          <span className="flex-[2] bg-haldi" />
          <span className="flex-[1] bg-mor" />
          <span className="flex-[2] bg-neel" />
          <span className="flex-[1] bg-gulabi" />
        </div>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10 flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <span className="flex items-baseline gap-2">
            <span className="font-display text-xl">SoHum</span>
            <span className="text-[#f7eeda]/50">
              © {new Date().getFullYear()} Digital Services
            </span>
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#f7eeda]/45">
            Udyam Registered · India
          </span>
        </div>
      </footer>
    </div>
  );
}
