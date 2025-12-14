"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SUBLINES = [
  "Find calm in the noise",
  "Be present. On purpose.",
  "Design your year with intention",
  "Less chaos. More clarity.",
  "Where focus meets peace",
  "Your space to slow down",
  "Presence over productivity",
];

export default function Splash() {
  const router = useRouter();
  const [subline, setSubline] = useState("");

  useEffect(() => {
    const random = SUBLINES[Math.floor(Math.random() * SUBLINES.length)];
    setSubline(random);

    const t = setTimeout(() => router.push("/planner"), 5000);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="relative h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* 🌈 Soft background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-blue-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-green-300/20 rounded-full blur-3xl" />

      {/* 🌿 Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 splash">
          TPM
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-600 tracking-wide animate-fadeIn">
          {subline || "..."}
        </p>
      </div>
    </div>
  );
}
