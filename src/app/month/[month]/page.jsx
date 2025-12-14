// "use client";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import PromptCarousel from "../../components/PromptCarousel";

// export default function MonthPage() {
//   const { month } = useParams();
//   const router = useRouter();

//   const [goal, setGoal] = useState("");

//   useEffect(() => {
//     const stored = localStorage.getItem(`goal-${month}`);
//     if (stored) setGoal(stored);
//   }, [month]);

//   return (
//     <div className="p-6 min-h-screen">
//       <button onClick={() => router.back()} className="mb-4">
//         ← Back
//       </button>

//       <h1 className="text-2xl font-bold text-center">{month}</h1>

//       {/* ✅ No hydration mismatch */}
//       <p className="opacity-70 mb-6 text-center">{goal}</p>

//       <PromptCarousel month={month} />
//     </div>
//   );
// }


"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PromptCarousel from "@/app/components/PromptCarousel";

export default function MonthPage() {
  const { month } = useParams();
  const router = useRouter();
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`goal-${month}`);
    if (stored) setGoal(stored);
  }, [month]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 p-4">
      <button
        onClick={() => router.back()}
        className="text-sm text-slate-500 hover:underline"
      >
        <i className="fas fa-chevron-left mr-2"></i>
        Back
      </button>

      <PromptCarousel month={month} />
    </div>
  );
}
