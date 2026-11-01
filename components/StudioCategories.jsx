
import Link from "next/link";
import {
  Camera,
  Clapperboard,
  Mic2,
  Music,
  Palette,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    title: "Photo Studios",
    value: "photoStudio",
    description: "Professional spaces for photography and creative shoots.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=85",
    icon: Camera,
  },
  {
    title: "Sound Stages",
    value: "filmStage",
    description: "Discover professional film and video production spaces.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=85",
    icon: Clapperboard,
  },
  {
    title: "Podcast Rooms",
    value: "podcastLounge",
    description: "Record your next podcast in a professional environment.",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=85",
    icon: Mic2,
  },
  {
    title: "Music Suites",
    value: "musicSuite",
    description: "Create, record and produce your next hit.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=85",
    icon: Music,
  },
  {
    title: "Art Workshops",
    value: "workshop",
    description: "Inspiring spaces for artists and creative workshops.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=85",
    icon: Palette,
  },
];

const StudioCategories = () => {
  return (
    <section className="bg-[#f8faf9] px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-[3px] text-green-600">
            Explore Our Spaces
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 md:text-5xl">
            Browse by Studio Categories
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Find the perfect creative environment for your photography,
            filmmaking, podcasting, music and artistic projects.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.value}
                href={`/studios?category=${category.value}`}
                className="group relative h-[300px] overflow-hidden rounded-2xl bg-gray-900 shadow-md"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${category.image})`,
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition group-hover:from-green-950/90" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 shadow-lg">
                    <Icon size={25} />
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-bold">
                      {category.title}
                    </h3>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10 transition-all duration-300 group-hover:border-green-500 group-hover:bg-green-600">
                      <ArrowUpRight size={22} />
                    </span>
                  </div>

                  <p className="mt-3 max-w-sm text-sm leading-6 text-gray-200">
                    {category.description}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-green-300">
                    Explore Category →
                  </p>

                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default StudioCategories;
