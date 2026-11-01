
import {
  Search,
  CalendarDays,
  BadgeCheck,
  Clapperboard,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore a curated collection of creative studios and find the perfect space for your next project.",
    icon: Search,
  },
  {
    number: "02",
    title: "Select Shoot Hours",
    description:
      "Choose your preferred date, check studio availability, and select the hours that work for you.",
    icon: CalendarDays,
  },
  {
    number: "03",
    title: "Book Instantly",
    description:
      "Review your booking details and complete your reservation with a simple booking process.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Show up at your chosen studio, bring your ideas to life, and create something amazing.",
    icon: Clapperboard,
  },
];

const HowBookingWorks = () => {
  return (
    <section className="bg-slate-50 px-4 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
            Simple & Easy Process
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            How Booking{" "}
            <span className="text-violet-600">Works</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Finding and booking your perfect creative space has never
            been easier. Follow these four simple steps and start
            creating something amazing.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/50"
              >
                {/* Top Number & Icon */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-4xl font-black tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-violet-100">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-6">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="min-h-[84px] text-sm leading-7 text-slate-500">
                  {step.description}
                </p>

                {/* Bottom Indicator */}
                <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step {index + 1}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-600"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium text-slate-500">
            Your creative journey starts with{" "}
            <span className="font-bold text-violet-600">
              StudioSpace.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default HowBookingWorks;
