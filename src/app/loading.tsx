import { HeartHandshake, Leaf, Sparkles } from "lucide-react";

const skeletonCards = [
  "h-32",
  "h-40",
  "h-32",
];

export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="relative flex min-h-[72svh] flex-1 items-center justify-center overflow-hidden bg-[#F4FAF6] px-5 py-16 sm:px-8"
      role="status"
    >
      <span className="sr-only">Loading TogetherWe. Please wait.</span>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-40 h-96 w-96 rounded-full bg-[#DDF3E5] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-112 w-md rounded-full bg-[#E4F2EB] blur-3xl"
      />

      <div className="relative w-full max-w-2xl">
        <div className="mb-9 text-center">
          <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[3px] border-[#D8EDE0]" />
            <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#16835A] motion-reduce:animate-none" />
            <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white text-[#16835A] shadow-[0_12px_30px_-14px_rgba(22,101,52,0.42)] ring-1 ring-[#E0EEE4]">
              <HeartHandshake aria-hidden="true" className="h-8 w-8" />
            </div>
            <Sparkles
              aria-hidden="true"
              className="absolute -right-1 top-2 h-5 w-5 animate-pulse text-[#71B98A] motion-reduce:animate-none"
            />
            <Leaf
              aria-hidden="true"
              className="absolute -bottom-1 -left-2 h-5 w-5 -rotate-45 text-[#71B98A]"
            />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#16835A]">
            TogetherWe
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#172B24] sm:text-3xl">
            Making room for good things
          </h1>
          <p className="mt-3 text-sm text-[#6C7D73] sm:text-base">
            Bringing your community experience together…
          </p>
        </div>

        <div
          aria-hidden="true"
          className="rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_24px_70px_-42px_rgba(23,43,36,0.3)] backdrop-blur sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-2xl bg-[#E5F2E9] motion-reduce:animate-none" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-2/5 animate-pulse rounded-full bg-[#E5F2E9] motion-reduce:animate-none" />
              <div className="h-2.5 w-3/5 animate-pulse rounded-full bg-[#EFF5F0] motion-reduce:animate-none" />
            </div>
            <div className="h-8 w-20 animate-pulse rounded-full bg-[#EAF5ED] motion-reduce:animate-none" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {skeletonCards.map((height, index) => (
              <div
                className={`${height} animate-pulse rounded-2xl bg-linear-to-br from-[#E8F4EB] to-[#F3F8F4] motion-reduce:animate-none`}
                key={index}
              />
            ))}
          </div>
          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#EAF2EC]">
            <div className="h-full w-2/5 animate-pulse rounded-full bg-[#16A36A] motion-reduce:animate-none" />
          </div>
        </div>

        <p className="mt-5 text-center text-xs font-medium text-[#87958C]">
          Good things grow when we do them together.
        </p>
      </div>
    </main>
  );
}
