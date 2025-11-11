"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Animated Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <div className="relative w-[500px] h-[500px]">
          <Image
            src="/logo-heroSection.png"
            alt="Invest In Human Academy"
            fill
            className="object-contain animate-pulse-slow drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* 404 Number */}
          <div className="relative">
            <h1 className="text-9xl md:text-[12rem] font-bold text-white/20 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                Page Not Found
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 max-w-md mx-auto drop-shadow-lg">
            Oops! The page you're looking for doesn't exist.
          </p>

          {/* Countdown */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl">
            <p className="text-white text-lg mb-2">
              Redirecting to home page in
            </p>
            <div className="text-6xl font-bold text-white drop-shadow-lg animate-pulse">
              {countdown}
            </div>
            <p className="text-white/80 text-sm mt-2">
              {countdown === 1 ? "second" : "seconds"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Home className="mr-2 h-5 w-5" />
                Go to Home
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.back()}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
