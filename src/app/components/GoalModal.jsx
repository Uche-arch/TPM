// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function GoalModal({ month, onClose }) {
//   const router = useRouter();
//   const key = `goal-${month}`;

//   const isEmptyText = (val) => !val || !val.trim();

//   const [goal, setGoal] = useState("");
//   const [saved, setSaved] = useState(false);

//   /* ===========================
//      LOAD SAVED GOAL
//   ============================ */
//   useEffect(() => {
//     const stored = localStorage.getItem(key);
//     if (!stored) return;

//     setGoal(stored);
//     setSaved(true);
//   }, [key]);

//   /* ===========================
//      SAVE (VALIDATED)
//   ============================ */
//   const saveGoal = () => {
//     if (isEmptyText(goal)) return;

//     localStorage.setItem(key, goal.trim());
//     setSaved(true);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
//       <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">{month} Main Goal</h2>

//         <textarea
//           value={goal}
//           onChange={(e) => setGoal(e.target.value)}
//           disabled={saved}
//           placeholder="What is your main focus for this month?"
//           className="w-full p-3 rounded bg-slate-800"
//         />

//         {/* 🔥 SAVE + NEXT ROW */}
//         <div className="flex justify-between items-center mt-4">
//           {saved ? (
//             <button onClick={() => setSaved(false)} className="px-4">
//               <i className="fas fa-edit"></i>
//             </button>
//           ) : (
//             <button
//               onClick={saveGoal}
//               disabled={isEmptyText(goal)}
//               className="bg-green-600 px-4 py-2 rounded disabled:opacity-40"
//             >
//               Save
//             </button>
//           )}

//           {saved && (
//             <button
//               onClick={() => router.push(`/month/${month}`)}
//               className="bg-blue-600 px-4 py-2 rounded"
//             >
//               Next
//             </button>
//           )}
//         </div>

//         <button onClick={onClose} className="mt-4 w-full text-sm opacity-60">
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { createPortal } from "react-dom";

// export default function GoalModal({ month, onClose }) {
//   const router = useRouter();
//   const key = `goal-${month}`;

//   const [goal, setGoal] = useState("");
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     const stored = localStorage.getItem(key);
//     if (stored) {
//       setGoal(stored);
//       setSaved(true);
//     }
//   }, [key]);

//   const saveGoal = () => {
//     if (!goal.trim()) return;
//     localStorage.setItem(key, goal.trim());
//     setSaved(true);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
//       <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-xl">
//         <h2 className="text-xl font-bold text-slate-900 mb-4">
//           {month} Main Goal
//         </h2>

//         <textarea
//           value={goal}
//           onChange={(e) => setGoal(e.target.value)}
//           disabled={saved}
//           placeholder="What is your main focus for this month?"
//           className="w-full p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <div className="flex justify-between items-center mt-6">
//           {!saved ? (
//             <button
//               onClick={saveGoal}
//               disabled={!goal.trim()}
//               className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-40"
//             >
//               Save
//             </button>
//           ) : (
//             <button onClick={() => setSaved(false)}>✏️</button>
//           )}

//           {saved && (
//             <button
//               onClick={() => router.push(`/month/${month}`)}
//               className="bg-blue-600 text-white px-5 py-2 rounded-lg"
//             >
//               Next
//             </button>
//           )}
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-6 w-full text-sm text-slate-500"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function GoalModal({ month, onClose }) {
  const router = useRouter();
  const key = `goal-${month}`;

  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 🔒 ensure client-side only (portal safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      setGoal(stored);
      setSaved(true);
    }
  }, [key]);

  const saveGoal = () => {
    if (!goal.trim()) return;
    localStorage.setItem(key, goal.trim());
    setSaved(true);
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {month} Main Goal
        </h2>

        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          disabled={saved}
          placeholder="What is your main focus for this month?"
          className="w-full min-h-[120px] p-4 rounded-xl bg-slate-100 text-slate-900 outline-none disabled:opacity-70"
        />

        <div className="flex justify-between items-center mt-6">
          {!saved ? (
            <button
              onClick={saveGoal}
              disabled={!goal.trim()}
              className="bg-green-600 text-white px-4 py-1.5 rounded disabled:opacity-40 transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setSaved(false)}
              className="text-slate-600 hover:text-slate-900 transition"
              aria-label="Edit goal"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}

          {saved && (
            <button
              onClick={() => router.push(`/month/${month}`)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded transition hover:bg-blue-500"
            >
              Next
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-sm text-slate-500 hover:text-slate-700 transition"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

