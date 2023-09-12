"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./compoonents/hero-section";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/search");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeroSection />
    </>
  );
}
