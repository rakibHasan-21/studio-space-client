const StudiosPage = async ({ searchParams }) => {
  const { category } = await searchParams;

  const res = await fetch(
    `http://localhost:5000/studios${
      category ? `?category=${category}` : ""
    }`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await res.json();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        {category || "All"} Studios
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {studios.map((studio) => (
          <div key={studio._id} className="rounded-xl border p-4">
            <img
              src={studio.image}
              alt={studio.title}
              className="h-52 w-full rounded-lg object-cover"
            />

            <h2 className="mt-3 text-xl font-bold">
              {studio.title}
            </h2>

            <p>${studio.pricePerHour}/hr</p>
            <p>⭐ {studio.rating}</p>
            <p>{studio.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudiosPage;