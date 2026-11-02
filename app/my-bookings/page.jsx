import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MyBookingsList from "@/components/MyBookingsList";

const MyBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${encodeURIComponent(
      session.user.email
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-2 text-gray-500">
          Manage your studio reservations.
        </p>
      </div>

      <MyBookingsList
        bookings={bookings}
        userEmail={session.user.email}
      />
      
    </div>
  );
};

export default MyBookings;