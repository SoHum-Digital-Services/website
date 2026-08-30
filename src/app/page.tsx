import ContactForm from "@/components/ContactForm";

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
  },
  {
    name: "SPJRSD",
    desc: "The community website for Sri Peddajeeyarla Sri Ramachandra Swamy Devasthanam, Cheruvugattu.",
    href: "https://cheruvugattu.online",
    tag: "Web",
  },
];

export default function Home() {
  return (
    <div className="flex-1">
      <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between">
        <span className="font-display text-lg tracking-tight">SoHum</span>
        <nav className="hidden sm:flex gap-8 text-sm text-paper-dim">
          <a href="#services" className="hover:text-paper transition-colors">Services</a>
          <a href="#work" className="hover:text-paper transition-colors">Work</a>
          <a href="#about" className="hover:text-paper transition-colors">About</a>
          <a href="#contact" className="hover:text-paper transition-colors">Contact</a>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-32 sm:pt-36 sm:pb-44">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-copper mb-6">
            Sōham — सोऽहं — &ldquo;I am that&rdquo;
          </p>
          <h1 className="font-display text-[13vw] sm:text-7xl md:text-8xl leading-[0.95] tracking-tight max-w-4xl">
            We build the software
            <br />
            <span className="text-copper italic">behind the work.</span>
          </h1>
          <p className="mt-10 max-w-xl text-paper-dim text-lg leading-relaxed">
            SoHum Digital Services is a proprietary studio designing and
            developing websites and custom software — every product we ship
            carries the same hand.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 border border-copper text-copper px-6 py-3 hover:bg-copper hover:text-ink transition-colors"
          >
            Start a project
            <span aria-hidden>&rarr;</span>
          </a>
        </section>

        <section id="services" className="border-t border-line">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <h2 className="font-display text-3xl sm:text-4xl mb-16">What we do</h2>
            <div className="grid sm:grid-cols-3 gap-12">
              {services.map((s) => (
                <div key={s.n}>
                  <span className="font-mono text-copper text-sm">{s.n}</span>
                  <h3 className="font-display text-2xl mt-4 mb-3">{s.title}</h3>
                  <p className="text-paper-dim leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="border-t border-line">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <h2 className="font-display text-3xl sm:text-4xl mb-16">Selected work</h2>
            <div className="grid sm:grid-cols-2 gap-px bg-line">
              {work.map((w) => (
                <a
                  key={w.name}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group bg-ink p-8 sm:p-10 hover:bg-copper/10 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl sm:text-3xl">{w.name}</h3>
                    <span className="font-mono text-copper opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </div>
                  <p className="text-paper-dim mt-4 leading-relaxed">{w.desc}</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-paper-dim/60 mt-6">{w.tag}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-line">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32 grid sm:grid-cols-[1fr_2fr] gap-12">
            <h2 className="font-display text-3xl sm:text-4xl">About</h2>
            <div className="max-w-2xl space-y-5 text-paper-dim leading-relaxed">
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
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-line">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
            <h2 className="font-display text-3xl sm:text-4xl mb-4">Let&rsquo;s build something</h2>
            <p className="text-paper-dim mb-16 max-w-xl">
              Tell us what you&rsquo;re working on and we&rsquo;ll get back to you.
            </p>
            <div className="max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-paper-dim">
          <span>© {new Date().getFullYear()} SoHum Digital Services</span>
          <span className="font-mono text-xs">Udyam Registered · India</span>
        </div>
      </footer>
    </div>
  );
}
