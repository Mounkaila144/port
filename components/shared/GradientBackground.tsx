export function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-20 sm:-top-40 left-1/2 h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/30 via-fuchsia-500/20 to-emerald-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-cyan-400/20 via-teal-400/20 to-lime-300/20 blur-3xl" />
    </div>
  );
}
