
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CalendarDays, Clock } from "lucide-react";

const MyListings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const email = session.user.email;

  const res = await fetch(
    `http://localhost:5000/bookings?email=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-16">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold text-slate-900">
          My Bookings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your workspace reservations.
        </p>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No Bookings Found
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't booked any workspace yet.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                    {booking.status}
                  </span>

                  <span className="text-xs text-gray-400">
                    Booking ID: {booking._id.slice(-6)}
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  {booking.studioName}
                </h2>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    {booking.bookingDate}
                  </p>

                  {booking.startTime && booking.endTime && (
                    <p className="flex items-center gap-2">
                      <Clock size={18} />
                      {booking.startTime} - {booking.endTime}
                    </p>
                  )}

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {booking.userEmail}
                  </p>
                </div>

                {booking.totalPrice !== undefined && (
                  <div className="mt-5 border-t pt-4">
                    <p className="text-lg font-bold text-green-600">
                      Total: ৳{booking.totalPrice}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default MyListings;
