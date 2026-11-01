import { headers } from "next/headers";
import { redirect } from "next/navigation";

// import auth from "@/lib/auth";
import MyListings from "@/components/MyListings";
import { auth } from "@/lib/auth";

const MyListingsPage = async () => {
  // Get session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check login
  if (!session) {
    redirect("/login");
  }

  // Get user email
  const email = session.user.email;

  // Fetch user's studios
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await res.json();

  return (
    <div className="container mx-auto px-4 py-12">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          My Studio Listings
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your creative spaces.
        </p>
      </div>

      <MyListings studios={studios} />

    </div>
  );
};

export default MyListingsPage;