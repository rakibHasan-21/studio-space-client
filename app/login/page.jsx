
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

import {
  Aperture,
  Mail,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";

import { FaGoogle } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const userInfo = Object.fromEntries(formData.entries());

    if (!userInfo.email || !userInfo.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // Better Auth email login
      const { data, error } = await authClient.signIn.email({
        email: userInfo.email,
        password: userInfo.password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Invalid email or password!");
        toast.error(error.message || "Login failed!");
        return;
      }

      if (!data) {
        throw new Error("Login failed!");
      }

      // Get JWT from Better Auth JWT plugin
      const { data: tokenData, error: tokenError } =
        await authClient.token();

      if (tokenError || !tokenData?.token) {
        throw new Error(
          tokenError?.message || "JWT token generation failed!"
        );
      }

      // Send JWT to Express backend and create HTTPOnly cookie
      const tokenRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/set-token`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: tokenData.token,
          }),
        }
      );

      const tokenResult = await tokenRes.json();

      if (!tokenRes.ok) {
        throw new Error(
          tokenResult.message || "JWT authentication failed!"
        );
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login Error:", error);

      setError(error.message || "Something went wrong!");
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const GoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google Signup Error:", error);
      toast.error("Google signup failed!");
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-slate-50 px-4 py-12">
      <Card className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border-slate-200 p-0 shadow-xl shadow-slate-900/5 md:grid-cols-2">

        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-400/20 blur-2xl" />

          <Link href="/" className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Aperture size={26} />
            </div>

            <span className="text-2xl font-extrabold">StudioSpace</span>
          </Link>

          <div className="relative my-12">
            <p className="mb-4 text-sm font-bold uppercase tracking-[4px] text-indigo-200">
              Welcome Back
            </p>

            <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
              Your Creative Space Is Waiting.
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-indigo-100">
              Sign in to discover inspiring studios, manage your bookings, and
              continue creating something amazing.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Explore creative studio spaces",
                "Manage your reservations",
                "Connect with creative hosts",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={19} className="text-indigo-200" />
                  <span className="text-sm font-medium text-indigo-50">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-indigo-200">
            © {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <CardContent className="px-6 py-12 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 md:hidden">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Aperture size={23} />
                </div>

                <span className="text-xl font-extrabold text-slate-900">
                  Studio<span className="text-indigo-600">Space</span>
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-indigo-600">
                Welcome Back
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Login to Your Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your credentials to access your StudioSpace account.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 focus-visible:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-indigo-600 transition hover:text-violet-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 pr-12 focus-visible:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="group h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700"
              >
                {loading ? "Logging in..." : "Login"}

                {!loading && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <Separator className="flex-1" />

              <span className="shrink-0 text-xs font-medium text-slate-400">
                OR CONTINUE WITH
              </span>

              <Separator className="flex-1" />
            </div>

            {/* Google Login */}
            <Button
              onClick={GoogleSignUp}
              type="button"
              variant="outline"
              className="h-12 w-full rounded-xl border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <FaGoogle className="mr-2 h-4 w-4 text-red-500" />
              Continue with Google
            </Button>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-600 transition hover:text-violet-600"
              >
                Create Account
              </Link>
            </p>

          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
