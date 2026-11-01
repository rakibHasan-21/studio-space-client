const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-12">

      <div className="mb-8 space-y-3">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />

        <div className="h-4 w-80 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        {[1, 2, 3, 4, 5, 6].map((item) => (

          <div
            key={item}
            className="overflow-hidden rounded-xl border p-4"
          >

            <div className="h-48 w-full animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-4 space-y-3">

              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />

              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />

              <div className="flex gap-3">
                <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
                <div className="h-10 flex-1 animate-pulse rounded bg-gray-200" />
              </div>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
};

export default Loading;