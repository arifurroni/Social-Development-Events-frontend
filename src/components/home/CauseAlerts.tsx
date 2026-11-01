"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, BellRing } from "lucide-react";

export function CauseAlerts() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Thanks for your interest! Email alerts are coming soon.");
  }

  return (
    <section
      aria-labelledby="cause-alerts-heading"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#DCECE1] bg-linear-to-br from-[#E5F6EC] via-white to-[#F0FDF4] px-6 py-12 shadow-[0_24px_70px_-45px_rgba(22,101,52,0.35)] sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-32 border-white/50"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#16835A] shadow-sm ring-1 ring-[#DCECE1]">
            <BellRing aria-hidden="true" className="h-5 w-5" />
          </span>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#16835A]">
            Stay in the loop
          </p>
          <h2
            id="cause-alerts-heading"
            className="text-3xl leading-tight font-extrabold tracking-tight text-[#172B24] sm:text-4xl"
          >
            Good things are happening close to home.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#64756B]">
            Get updates about neighborhood cleanups, community drives, and
            other ways to lend a hand.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="cause-alerts-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="min-w-0 flex-1 rounded-xl border border-[#DCE5DF] bg-white px-5 py-3.5 text-sm text-[#172B24] shadow-sm outline-none transition placeholder:text-[#94A39A] focus:border-[#16A36A] focus:ring-4 focus:ring-[#16A36A]/10"
              id="cause-alerts-email"
              name="email"
              placeholder="Your email address"
              required
              type="email"
            />
            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16835A] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#166534] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16835A]"
              type="submit"
            >
              Keep me posted
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>

          <p
            aria-live="polite"
            className="mt-4 min-h-5 text-sm text-[#64756B]"
            role="status"
          >
            {message || "No spam. Just local opportunities to make a difference."}
          </p>
        </div>
      </div>
    </section>
  );
}
