
import {
  ShieldCheck,
  BadgeCheck,
  Camera,
  Headset,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const guarantees = [
  {
    number: "01",
    title: "Liability Protection",
    description:
      "Clear booking policies and safety guidelines designed to support a more comfortable studio experience.",
    icon: ShieldCheck,
    features: ["Clear booking policies", "Safety guidelines"],
    color: "from-violet-500 to-indigo-500",
    bg: "bg-violet-50",
  },
  {
    number: "02",
    title: "Verified Profiles",
    description:
      "Transparent host and creator profiles help build trust and confidence throughout the booking journey.",
    icon: BadgeCheck,
    features: ["Host information", "Transparent profiles"],
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    number: "03",
    title: "Equipment Safety",
    description:
      "Access studio equipment details and usage guidelines for a smooth and responsible creative experience.",
    icon: Camera,
    features: ["Equipment details", "Usage guidelines"],
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
  },
  {
    number: "04",
    title: "Host Support",
    description:
      "Stay connected with your studio host for booking questions and assistance during your experience.",
    icon: Headset,
    features: ["Booking assistance", "Direct communication"],
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
];

const HostGuarantee = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fc] px-4 py-20 md:py-28">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-200/30 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-blue-200/30 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 shadow-sm">
            <Sparkles size={14} />
            Your Trust Matters
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Your Creativity Deserves
            <span className="mt-2 block bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              A Better Experience.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            From trusted connections to helpful host assistance,
            discover the information and guidelines that make
            your creative journey more comfortable.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {guarantees.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="group relative overflow-hidden rounded-3xl border border-white bg-white p-7 shadow-[0_8px_35px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-3 hover:border-violet-200 hover:shadow-[0_20px_50px_rgba(109,40,217,0.12)]"
              >

                {/* Top Gradient Line */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.color} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Number & Icon */}
                <div className="mb-8 flex items-center justify-between">

                  <span className="text-5xl font-black tracking-tighter text-slate-100 transition-colors duration-300 group-hover:text-violet-100">
                    {item.number}
                  </span>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bg} transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
                  >
                    <Icon
                      size={29}
                      strokeWidth={1.7}
                      className="text-slate-800 transition-colors duration-300 group-hover:text-violet-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-extrabold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="min-h-[112px] text-sm leading-7 text-slate-500">
                  {item.description}
                </p>

                {/* Features */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                  {item.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-violet-600"
                      />
                      <span className="text-xs font-semibold text-slate-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Hover Accent */}
                <div
                  className={`absolute -bottom-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br ${item.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15`}
                />

                <div className="absolute bottom-7 right-7 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-violet-50 text-violet-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={19} />
                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom CTA Banner */}
        <div className="relative mt-14 overflow-hidden rounded-[28px] bg-slate-950 px-7 py-10 sm:px-12 md:py-12">

          {/* Banner Decoration */}
          <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full border-[35px] border-violet-500/10" />
          <div className="absolute -bottom-28 right-40 h-60 w-60 rounded-full bg-violet-600/20 blur-[80px]" />

          <div className="relative flex flex-col items-center justify-between gap-7 text-center sm:flex-row sm:text-left">

            <div className="max-w-xl">
              <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400">
                <ShieldCheck size={15} />
                Built Around Creators
              </span>

              <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                Create with confidence.
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Find your space, connect with hosts, and turn
                your creative vision into reality.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-violet-300 shadow-lg shadow-violet-500/10 backdrop-blur-md">
              <ShieldCheck size={32} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HostGuarantee;
