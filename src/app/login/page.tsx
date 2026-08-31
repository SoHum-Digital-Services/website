import { Suspense } from "react";
import LoginForm from "@/components/dashboard/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 w-full">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-copper mb-6">
          Ops Dashboard
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-10">
          Sign in
        </h1>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
