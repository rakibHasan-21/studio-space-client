"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Aperture,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";

const Register = () => {
  const router = useRouter();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      toast.error("Please accept Terms & Conditions!");
      return;
    }

    const formData = new FormData(e.target);
    const userInfo = Object.fromEntries(formData.entries());

    if (userInfo.password !== userInfo.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (userInfo.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        callbackURL: "/",
        image: userInfo.image,
      });

      if (error) {
        toast.error(error.message || "Registration failed!");
        return;
      }

      if (data) {
        toast.success("Registration successful!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Google Signup
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
              Create Without Limits
            </p>

            <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
              Your Creative Journey Starts Here.
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-indigo-100">
              Discover inspiring studios, connect with creative people, and
              bring your next big idea to life.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Discover amazing creative spaces",
                "Book studios with ease",
                "Manage all your reservations",
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
        <CardContent className="px-6 py-10 sm:px-10 lg:px-12">
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
                Get Started
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Create Account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Join StudioSpace and start exploring creative spaces.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 focus-visible:bg-white"
                  />
                </div>
              </div>

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

              {/* images */}

              {/* Photo URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Photo URL</Label>

                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="Enter your photo URL"
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 focus-visible:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    minLength={8}
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>

                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    minLength={8}
                    required
                    className="h-12 rounded-xl bg-slate-50 pl-10 pr-12 focus-visible:bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked === true)
                  }
                  className="mt-0.5"
                />

                <Label
                  htmlFor="terms"
                  className="text-xs font-normal leading-5 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading || googleLoading}
                className="group h-12 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </form>

            {/* Google Signup */}
            <div className="my-6">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={GoogleSignUp}
                disabled={googleLoading || loading}
                className="h-12 w-full rounded-xl border-slate-200 font-semibold text-slate-700 hover:bg-slate-50"
              >
                <FaGoogle className="mr-2 h-4 w-4 text-red-500" />

                {googleLoading
                  ? "Connecting to Google..."
                  : "Continue with Google"}
              </Button>
            </div>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 transition hover:text-violet-600"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Register;
