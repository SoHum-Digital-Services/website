import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — SoHum",
  description:
    "How SoHum handles your data across sohum.cc and the SoHum apps: what we collect, why, who processes it, and how to see or delete it.",
};

const UPDATED = "15 October 2026";

const processors = [
  ["Google", "Sign-in with your Google account, hosting (Google Cloud Run), and the AI model that answers questions in Vāni"],
  ["Supabase", "The SoHum Account sign-in service and the database where your app data is kept"],
  ["Cloudflare", "Delivers our sites securely and protects them from abuse"],
  ["Sarvam AI", "Turns speech into text and text into speech when you use voice in Vāni"],
  ["Resend", "Delivers messages sent through the contact form on sohum.cc to our inbox"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule pt-10">
      <h2 className="font-display text-3xl leading-tight">{title}</h2>
      <div className="mt-5 space-y-4 leading-relaxed text-fg-2">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="flex-1">
      <header className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sohum-mark.svg" alt="" width={32} height={32} unoptimized className="self-center" />
            <span className="font-display text-2xl leading-none tracking-tight">SoHum</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sindoor" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-fg-2">Last updated {UPDATED}</p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl leading-[0.95]">Privacy Policy</h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-2">
            This policy covers sohum.cc and the SoHum apps you sign in to with your SoHum Account, including
            ChantTracker, Darshan, Vāni, GatiVani and the SoHum Store. SoHum Digital Services, India
            (&ldquo;SoHum&rdquo;, &ldquo;we&rdquo;) runs them.
          </p>
        </div>

        <Section title="Our commitments">
          <ul className="list-disc pl-5 space-y-2">
            <li>We never sell or rent your data, and we never use it for advertising.</li>
            <li>We never use your religious or practice data to profile or rank you.</li>
            <li>Your data is private by default. We share it only to run the service you asked for, or with your consent.</li>
            <li>We never ask for Aadhaar, a passport or any other government identity number to create an account.</li>
          </ul>
        </Section>

        <Section title="What we collect">
          <p>
            <strong className="text-fg">Your SoHum Account.</strong> When you sign in with Google, we receive your email
            address and the name and profile picture on your Google account. We use them to sign you in and to show you
            who is signed in. We do not request access to any other data in your Google account, such as Gmail, Drive or
            contacts.
          </p>
          <p>
            <strong className="text-fg">What you put into an app.</strong> Each app keeps only what it needs to work: for
            example your chant counts in ChantTracker, your bookings in Darshan, your orders in the Store, and your
            questions and the answers in Vāni. Chanting, worship and other practice records are religious data; we treat
            them as sensitive and keep them private to you.
          </p>
          <p>
            <strong className="text-fg">Vāni conversations.</strong> Your conversation history is saved so you can come
            back to it. You can delete one conversation or all of them at any time from Vāni&rsquo;s History screen, and
            each conversation is deleted automatically 90 days after your last message in it. If you use voice, your
            recording is sent to be turned into text; we keep the text of your question, not the recording.
          </p>
          <p>
            <strong className="text-fg">The contact form.</strong> If you write to us through sohum.cc, we receive your
            name, email address and message by email so we can reply.
          </p>
          <p>
            <strong className="text-fg">Technical data.</strong> Like any website, our servers and our network provider
            see your IP address and basic request details. We use them to deliver the site, keep it secure and limit
            abuse.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We use only the cookies needed to keep you signed in across SoHum sites. We do not use advertising or
            tracking cookies.
          </p>
        </Section>

        <Section title="Who processes your data">
          <p>We use these providers to run SoHum. They handle your data only to provide their service to us.</p>
          <dl className="space-y-3">
            {processors.map(([name, role]) => (
              <div key={name}>
                <dt className="font-medium text-fg">{name}</dt>
                <dd>{role}</dd>
              </div>
            ))}
          </dl>
          <p>Some of these providers may process data outside India.</p>
        </Section>

        <Section title="How long we keep it">
          <p>
            We keep your account and app data while you use SoHum, and delete it when you ask us to. Vāni conversations
            are deleted automatically 90 days after your last message. Records we are legally required to keep, such as
            receipts for payments, are kept for as long as the law requires.
          </p>
        </Section>

        <Section title="Your choices and rights">
          <p>
            You can ask to see, correct, export or delete your data, or withdraw a consent you gave, at any time. Email{" "}
            <a href="mailto:info@sohum.cc" className="text-sindoor border-b border-sindoor/40">info@sohum.cc</a> from the
            address you sign in with, and we will reply within 30 days.
          </p>
        </Section>

        <Section title="Children">
          <p>SoHum is not meant for anyone under 18. We do not knowingly collect data from children.</p>
        </Section>

        <Section title="Security">
          <p>
            Your data is encrypted when it travels between your device and our services, and access to it is limited to
            the people and systems that need it to run SoHum.
          </p>
        </Section>

        <Section title="Changes and contact">
          <p>
            If we change this policy, we will update the date at the top of this page. For any question or complaint
            about your data, write to{" "}
            <a href="mailto:info@sohum.cc" className="text-sindoor border-b border-sindoor/40">info@sohum.cc</a>.
          </p>
        </Section>
      </main>
    </div>
  );
}
