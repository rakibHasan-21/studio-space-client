
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ArrowRight, Aperture } from "lucide-react";

const slides = [
  {
    id: 1,
    category: "PHOTOGRAPHY STUDIOS",
    title: "Bring Your Creative Vision to Life.",
    description:
      "Discover inspiring photography spaces equipped with everything you need to create extraordinary work.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=90",
  },
  {
    id: 2,
    category: "FILM & PRODUCTION",
    title: "Your Next Big Production Starts Here.",
    description:
      "Find professional production spaces and cinematic environments for your next creative project.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=90",
  },
  {
    id: 3,
    category: "PODCAST & MUSIC",
    title: "Create Something Worth Listening To.",
    description:
      "Explore premium podcast rooms and recording studios designed to bring your sound to life.",
    image:
      "https://images.unsplash.com/photo-1593078166034-9c6b7a1c7c4b?auto=format&fit=crop&w=2000&q=90",
  },
];

export default function HeroSlider() {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );

  useEffect(() => {
    if (!api) return;

    const updateIndex = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    updateIndex();
    api.on("select", updateIndex);

    return () => {
      api.off("select", updateIndex);
    };
  }, [api]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[1600px] px-3 pt-4 sm:px-5 lg:px-8 lg:pt-6">

        <Carousel
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[autoplay.current]}
          className="relative"
        >
          <CarouselContent className="-ml-0">

            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0">

                <div
                  className="relative flex min-h-[520px] items-center overflow-hidden rounded-2xl bg-gray-900 bg-cover bg-center sm:min-h-[580px] lg:min-h-[650px]"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />

                  {/* Content */}
                  <div className="relative z-10 w-full px-6 py-16 sm:px-12 lg:px-20 lg:py-24">

                    <div className="max-w-3xl">

                      {/* Category */}
                      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-md">
                        <Aperture className="h-4 w-4" />
                        {slide.category}
                      </div>

                      {/* Heading */}
                      <h1 className="max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-7xl">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                        <Link
                          href="/studios"
                          className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-600 px-7 text-base font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Explore Studios
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>

                        <Link
                          href="/register"
                          className="inline-flex h-12 items-center justify-center rounded-lg border border-white/70 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
                        >
                          Host Your Space
                        </Link>

                      </div>
                    </div>
                  </div>

                  {/* Slide Number */}
                  <div className="absolute bottom-7 right-7 z-10 hidden items-center gap-2 text-sm font-medium text-white sm:flex">
                    <span className="text-xl font-bold">
                      0{slide.id}
                    </span>
                    <span className="text-white/50">/ 03</span>
                  </div>

                </div>
              </CarouselItem>
            ))}

          </CarouselContent>

          {/* Previous / Next */}
          <CarouselPrevious className="left-4 top-1/2 z-20 h-11 w-11 border-white/40 bg-white/90 text-gray-900 hover:bg-white sm:left-6" />

          <CarouselNext className="right-4 top-1/2 z-20 h-11 w-11 border-white/40 bg-white/90 text-gray-900 hover:bg-white sm:right-6" />

          {/* Pagination Dots */}
          <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  activeIndex === index ? "true" : undefined
                }
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-9 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}

          </div>
        </Carousel>

      </div>
    </section>
  );
}
