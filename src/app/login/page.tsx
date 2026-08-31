import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/dashboard/LoginForm";
import Yantra from "@/components/Yantra";

export default function LoginPage() {
  return (
    <div className="theme-dark grain relative flex flex-1 items-center overflow-hidden bg-bg text-fg">
      <Yantra className="spin-slow pointer-events-none absolute -right-32 top-1/2 w-[40rem] -translate-y-1/2 text-sindoor/10" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
        <div className="max-w-sm">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none">SoHum</span>
            <span className="h-1.5 w-1.5 rounded-full bg-sindoor" />
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-fg-2">
              Ops
            </span>
          </Link>

          <h1 className="font-display mt-10 text-5xl leading-none sm:text-6xl">
            Sign in
          </h1>
          <p className="mt-4 text-fg-2">This dashboard is private.</p>

          <div className="mt-10">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
