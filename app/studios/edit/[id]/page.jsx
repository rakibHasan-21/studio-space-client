import { notFound } from "next/navigation";
import EditStudioForm from "@/components/EditStudioForm";


const page = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/studios/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const studio = await res.json();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold">Update Studio</h1>
      <EditStudioForm studio={studio} />
    </div>
  );
};

export default page;