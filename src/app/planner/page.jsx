// "use client";
// import MonthGrid from "../components/MonthGrid";
// import VoiceReflection from "../components/VoiceReflection";


// export default function Planner() {
//   return (
//     <div className="min-h-screen p-6">
//       <div className="flex justify-start font-bold">TPM</div>
//       <MonthGrid />
//       <VoiceReflection storageKey="year-2026-vision" />
//     </div>
//   );
// }


"use client";
import MonthGrid from "../components/MonthGrid";
import VoiceReflection from "../components/VoiceReflection";

export default function Planner() {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-8">
      {/* Header */}
      <header className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 splash">
          TPM
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Your intentional planning space
        </p>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-14">
        <MonthGrid />
        <VoiceReflection storageKey="year-2026-vision" />
      </div>
    </div>
  );
}
