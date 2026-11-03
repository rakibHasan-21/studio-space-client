
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const studioData = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is missing");
    }

    const backendResponse = await fetch(`${apiUrl}/studioForm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studioData),
      cache: "no-store",
    });

    const responseText = await backendResponse.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { message: "Backend returned an invalid response" },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      status: backendResponse.status,
    });

  } catch (error) {
    console.error("POST /api/add-studio ERROR:", error);

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
