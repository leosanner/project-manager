import Link from "next/link";
import Script from "next/script";

const SPLINE_SCENE_URL = "/scene-clean.splinecode";

export default function Home() {
  return (
    <>
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.10.64/build/spline-viewer.js"
      />

      <main className="relative isolate min-h-screen overflow-hidden bg-black text-white">
        <div className="absolute inset-0 -z-10">
          <spline-viewer
            className="h-full w-full"
            loading-anim-type="spinner-small-dark"
            url={SPLINE_SCENE_URL}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.2)_35%,rgba(0,0,0,0.56)_100%)]" />

        <header className="pointer-events-none absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
            <nav className="pointer-events-auto flex items-center gap-8 text-[15px] text-white/85">
              <a className="transition hover:text-white" href="#">
                Home
              </a>
              <a className="transition hover:text-white" href="#">
                Cases
              </a>
              <a className="transition hover:text-white" href="#">
                Library
              </a>
              <a className="transition hover:text-white" href="#">
                Resources
              </a>
            </nav>
            <button className="pointer-events-auto rounded-full border border-[#ff7b57] bg-black/45 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10">
              <Link href={"/login"}>Let&apos;s Talk!</Link>
            </button>
          </div>
        </header>

        <section className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-16 pt-28 lg:px-10">
          <div className="pointer-events-auto space-y-7">
            <p className="inline-flex rounded-full border border-white/35 bg-black/35 px-3 py-1 text-xs tracking-[0.18em] text-white/90 uppercase">
              Project Manager SaaS
            </p>

            <h1 className="max-w-4xl font-serif text-5xl leading-[0.94] font-semibold tracking-tight sm:text-6xl lg:text-8xl">
              We&apos;re building
              <br />
              structured{" "}
              <span className="text-brand-gradient">experiences</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-100 sm:text-xl">
              Scope, budget and execution inside one workflow. Built to align
              commercial negotiation with delivery, with contextual AI where it
              matters.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="rounded-sm border border-[#6f74ff] bg-[linear-gradient(90deg,#8b5cf6_0%,#6f74ff_52%,#39d5ff_100%)] px-7 py-3 text-base font-semibold text-black transition hover:brightness-105">
                Get Started
              </button>
              <button className="rounded-full border border-white/50 bg-black/45 px-7 py-3 text-base font-medium text-white transition hover:bg-white/15">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
