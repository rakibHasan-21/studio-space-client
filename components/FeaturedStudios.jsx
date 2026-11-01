
const FeaturedStudios = async () => {
  const res = await fetch("http://localhost:5000/featured-studios", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured studios");
  }

  const data = await res.json();

  return (
    <section className="bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-5xl">

        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-600">
            Explore Creative Spaces
          </p>

          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Featured Studios
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Discover inspiring creative spaces designed to bring
            your next big idea to life.
          </p>
        </div>

        {/* Studio Cards */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {data.map((studio) => (
            <div
              key={studio._id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={studio.image}
                  alt={studio.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold capitalize text-slate-800 shadow">
                  {studio.category}
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-slate-900 shadow">
                  ⭐ {studio.rating}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">

                <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
                  {studio.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  📍 {studio.location}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                  <div>
                    <span className="text-xl font-bold text-indigo-600">
                      ${studio.pricePerHour}
                    </span>
                    <span className="text-sm text-slate-500">
                      {" "}/ hr
                    </span>
                  </div>

                  <a
                    href={`/studios/${studio._id}`}
                    className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600"
                  >
                    View Details
                  </a>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedStudios;
