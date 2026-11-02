
import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MyListings from "@/components/MyListings";

const MyListingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const email = session.user.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/studios?ownerEmail=${encodeURIComponent(email)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch studios");
  }

  const studios = await res.json();

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-16">
      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold text-slate-900">
          My Studio Listings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your studio spaces, update details, or delete listings.
        </p>

        <MyListings studios={studios} />

      </div>
    </section>
  );
};

export default MyListingsPage;
