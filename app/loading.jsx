import { Aperture } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">

      <Aperture
        size={45}
        className="animate-spin text-green-600"
      />

      <h2 className="text-xl font-bold">
        StudioSpace
      </h2>

      <p className="animate-pulse text-gray-500">
        Loading your creative space...
      </p>

    </div>
  );
};

export default Loading;