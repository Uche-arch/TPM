    // "use client";
    // import { useState, useEffect } from "react";
    // import PromptCard from "./PromptCard";

    // const prompts = [
    //   { id: "why", title: "Why does your above goal matter to you?", type: "text" },
    //   { id: "moves", title: "Three moves that will make it happen", type: "list" },
    //   { id: "weekly", title: "Weekly Plan", type: "checklist" },
    //   { id: "result", title: "Did you achieve your goal?", type: "result" },
    // ];

    // export default function PromptCarousel({ month }) {
    //   const [index, setIndex] = useState(0);
    //   const [enableTransition, setEnableTransition] = useState(false);

    //   // Enable transition after initial render to avoid slide on load
    //   useEffect(() => {
    //     const timeout = setTimeout(() => setEnableTransition(true), 100);
    //     return () => clearTimeout(timeout);
    //   }, []);

    //   const prevDisabled = index === 0;
    //   const nextDisabled = index === prompts.length - 1;
    //   const slideWidthPercent = 100;

    //   return (
    //     <div className="w-full max-w-[700px] mx-auto flex flex-col items-center">
    //       <div className="w-full overflow-hidden rounded-xl shadow-2xl border border-slate-700 bg-slate-900">
    //         <div
    //           className={`flex ${
    //             enableTransition
    //               ? "transition-transform duration-500 ease-in-out"
    //               : ""
    //           }`}
    //           style={{ transform: `translateX(-${index * slideWidthPercent}%)` }}
    //         >
    //           {prompts.map((prompt) => (
    //             <div
    //               key={`${month}-${prompt.id}`}
    //               className="flex-shrink-0 w-full"
    //               style={{ minWidth: "100%" }}
    //             >
    //               <PromptCard prompt={prompt} month={month} />
    //             </div>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Carousel Buttons */}
    //       <div className="flex justify-between w-full max-w-md mt-6 px-6">
    //         <button
    //           onClick={() => setIndex((i) => Math.max(i - 1, 0))}
    //           disabled={prevDisabled}
    //           aria-label="Previous prompt"
    //           className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
    //         >
    //           <i className="fas fa-chevron-left text-white text-lg"></i>
    //         </button>

    //         <button
    //           onClick={() => setIndex((i) => Math.min(i + 1, prompts.length - 1))}
    //           disabled={nextDisabled}
    //           aria-label="Next prompt"
    //           className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
    //         >
    //           <i className="fas fa-chevron-right text-white text-lg"></i>
    //         </button>
    //       </div>
    //     </div>
    //   );
    // }
"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const prompts = [
  { id: "why", title: "Why does your above goal matter to you?", type: "text" },
  { id: "moves", title: "Three moves that will make it happen", type: "list" },
  { id: "weekly", title: "Weekly Plan", type: "checklist" },
  { id: "result", title: "Did you achieve your goal?", type: "result" },
];

export default function PromptCarousel({ month }) {
  const [index, setIndex] = useState(0);
  const [goal, setGoal] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`goal-${month}`);
    if (stored) setGoal(stored);

    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, [month]);

  const prevDisabled = index === 0;
  const nextDisabled = index === prompts.length - 1;

  return (
    <section className="flex items-center justify-center mt-[10vh]">
      {/* MAIN WRAPPER */}
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        {/* MONTH */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
          {month}
        </h1>

        {/* GOAL */}
        {goal && (
          <p className="mb-8 text-slate-600 max-w-lg leading-relaxed">
            Goal: {goal}
          </p>
        )}

        {/* CAROUSEL */}
        <div className="w-full overflow-hidden">
          <div
            className={`flex ${
              ready
                ? "transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
                : ""
            }`}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {prompts.map((prompt) => (
              <div
                key={`${month}-${prompt.id}`}
                className="w-full flex-shrink-0 px-1 sm:px-2"
              >
                <PromptCard prompt={prompt} month={month} />
              </div>
            ))}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="mt-6 flex items-center justify-between w-full max-w-sm">
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            disabled={prevDisabled}
            className="text-sm px-4 py-2 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <span className="text-xs text-slate-400">
            {index + 1} / {prompts.length}
          </span>

          <button
            onClick={() => setIndex((i) => Math.min(i + 1, prompts.length - 1))}
            disabled={nextDisabled}
            className="text-sm px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
