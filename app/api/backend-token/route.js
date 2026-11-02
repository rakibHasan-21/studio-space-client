import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { SignJWT } from "jose";
import { auth } from "@/lib/auth";

export async function POST() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET,
    );

    const token = await new SignJWT({
      email: session.user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("15m")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      message: "JWT created successfully",
    });

    response.cookies.set("studio_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    return response;
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to create JWT" },
      { status: 500 },
    );
  }
}