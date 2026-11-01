import Link from "next/link";

const categories = [
  { name: "Photo Studios", slug: "photography" },
  { name: "Sound Stages", slug: "sound-stage" },
  { name: "Podcast Rooms", slug: "podcast" },
  { name: "Music Suites", slug: "music" },
  { name: "Art Workshops", slug: "art" },
];

const StudioCategories = () => {
  return (
    <section>
      <h2>Browse by Studio Categories</h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/studios?category=${category.slug}`}
            className="rounded-xl border p-6 hover:shadow-lg"
          >
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StudioCategories;