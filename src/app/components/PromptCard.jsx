// "use client";
// import { useState, useEffect } from "react";

// export default function PromptCard({ prompt, month }) {
//   const key = `${month}-${prompt.id}`;

//   const isEmptyText = (val) => !val || !val.trim();

//   const getInitialData = () => {
//     if (prompt.type === "text") return "";
//     if (prompt.type === "result") return null;
//     return [];
//   };

//   const [data, setData] = useState(getInitialData);
//   const [editing, setEditing] = useState(true);

//   useEffect(() => {
//     const stored = localStorage.getItem(key);
//     if (!stored) return;

//     try {
//       const parsed = JSON.parse(stored);
//       setData(parsed);
//       setEditing(false);
//     } catch {
//       setData(getInitialData());
//     }
//   }, [key, prompt.type]);

//   const save = () => {
//     if (prompt.type === "text") {
//       if (isEmptyText(data)) return;
//       localStorage.setItem(key, JSON.stringify(data));
//       setEditing(false);
//       return;
//     }

//     if (prompt.type === "list" || prompt.type === "checklist") {
//       const cleaned = data.filter(
//         (item) => item.text && item.text.trim() !== ""
//       );
//       if (cleaned.length === 0) return;
//       localStorage.setItem(key, JSON.stringify(cleaned));
//       setData(cleaned);
//       setEditing(false);
//       return;
//     }

//     localStorage.setItem(key, JSON.stringify(data));
//     setEditing(false);
//   };

  // const celebrate = async () => {
  //   const confetti = (await import("canvas-confetti")).default;

  //   const audio = new Audio("/sounds/cheer.wav");
  //   audio.volume = 0.7;
  //   audio.play().catch(() => {});

  //   if (navigator.vibrate) {
  //     navigator.vibrate([100, 50, 100]);
  //   }

  //   const TOTAL_DURATION = 7000;
  //   const FADE_DURATION = 1500;
  //   const start = Date.now();

  //   const interval = setInterval(() => {
  //     const elapsed = Date.now() - start;
  //     const timeLeft = TOTAL_DURATION - elapsed;

  //     if (timeLeft > 800) {
  //       confetti({
  //         particleCount: 35,
  //         angle: 90,
  //         spread: 70,
  //         startVelocity: 22,
  //         gravity: 1.3,
  //         ticks: 220,
  //         origin: {
  //           x: Math.random(),
  //           y: -0.2,
  //         },
  //       });
  //     }

  //     if (timeLeft <= FADE_DURATION && audio.volume > 0) {
  //       audio.volume = Math.max(0, audio.volume - 0.7 / (FADE_DURATION / 100));
  //     }

  //     if (timeLeft <= 0) {
  //       clearInterval(interval);
  //       audio.pause();
  //       audio.currentTime = 0;
  //     }
  //   }, 100);
  // };

//   return (
//     <div className="bg-slate-800 text-white rounded-xl shadow-lg p-8 max-w-full max-h-full mx-auto min-h-[420px] flex flex-col">
//       <h3 className="font-extrabold text-2xl mb-6 text-center">
//         {prompt.title}
//       </h3>

//       {/* Text Prompt */}
//       {prompt.type === "text" && (
//         <textarea
//           disabled={!editing}
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//           className="flex-grow resize-none bg-slate-700 p-4 rounded-lg text-lg leading-relaxed outline-none focus:ring-4 focus:ring-green-500 transition"
//           placeholder="Write your answer here..."
//         />
//       )}

//       {/* List / Checklist */}
//       {(prompt.type === "list" || prompt.type === "checklist") && (
//         <div className="space-y-4 flex-grow overflow-y-auto max-h-[240px]">
//           {Array.isArray(data) &&
//             data.map((item, i) => (
//               <label
//                 key={i}
//                 className="flex items-center gap-4 cursor-pointer select-none"
//               >
//                 {prompt.type === "checklist" && (
//                   <input
//                     type="checkbox"
//                     checked={item.done}
//                     disabled={editing}
//                     onChange={() => {
//                       const copy = [...data];
//                       copy[i].done = !copy[i].done;
//                       setData(copy);
//                       localStorage.setItem(key, JSON.stringify(copy));
//                     }}
//                     className="w-6 h-6 rounded border-gray-500 text-green-600 focus:ring-green-500 disabled:opacity-50"
//                   />
//                 )}

//                 <input
//                   disabled={!editing}
//                   value={item.text}
//                   onChange={(e) => {
//                     const copy = [...data];
//                     copy[i].text = e.target.value;
//                     setData(copy);
//                   }}
//                   className="flex-1 bg-slate-700 p-3 rounded-lg text-lg outline-none focus:ring-4 focus:ring-green-500 transition"
//                   placeholder="Task"
//                 />
//               </label>
//             ))}

//           {editing && (
//             <button
//               onClick={() => setData([...data, { text: "", done: false }])}
//               className="mt-2 text-sm text-green-400 hover:text-green-300 transition"
//             >
//               + Add
//             </button>
//           )}
//         </div>
//       )}

//       {/* Result */}
//       {prompt.type === "result" && (
//         <div className="space-y-6 text-center mt-auto">
//           {data === null && (
//             <div className="flex justify-center gap-8">
//               <button
//                 onClick={() => {
//                   setData("yes");
//                   localStorage.setItem(key, JSON.stringify("yes"));
//                   celebrate();
//                 }}
//                 className="bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition"
//               >
//                 Yes 🎉
//               </button>
//               <button
//                 onClick={() => {
//                   setData("no");
//                   localStorage.setItem(key, JSON.stringify("no"));
//                 }}
//                 className="bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-500 transition"
//               >
//                 No
//               </button>
//             </div>
//           )}

//           {data === "yes" && (
//             <p className="text-green-400 text-lg font-semibold">
//               Amazing! You showed up for yourself 👏
//             </p>
//           )}

//           {data === "no" && (
//             <p className="text-yellow-400 text-lg font-semibold">
//               That’s okay. Reflection is progress too.
//             </p>
//           )}
//         </div>
//       )}

//       {/* Save / Edit Buttons */}
//       {prompt.type !== "result" && (
//         <div className="flex justify-center gap-4 mt-6">
//           {editing ? (
//             <button
//               onClick={save}
//               disabled={
//                 (prompt.type === "text" && isEmptyText(data)) ||
//                 ((prompt.type === "list" || prompt.type === "checklist") &&
//                   data.every((i) => isEmptyText(i.text)))
//               }
//               className="bg-green-600 px-8 py-3 rounded-lg font-semibold disabled:opacity-50 transition hover:bg-green-500"
//             >
//               Save
//             </button>
//           ) : (
//             <button
//               onClick={() => setEditing(true)}
//               className="border border-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//             >
//               ✏️ Edit
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";

export default function PromptCard({ prompt, month }) {
  const key = `${month}-${prompt.id}`;

  const isEmptyText = (val) => !val || !val.trim();

  const getInitialData = () => {
    if (prompt.type === "text") return "";
    if (prompt.type === "result") return null;
    return [];
  };

    // const celebrate = async () => {
    //   const confetti = (await import("canvas-confetti")).default;

    //   const audio = new Audio("/sounds/cheer.wav");
    //   audio.volume = 0.7;
    //   audio.play().catch(() => {});

    //   if (navigator.vibrate) {
    //     navigator.vibrate([100, 50, 100]);
    //   }

    //   const TOTAL_DURATION = 7000;
    //   const FADE_DURATION = 1500;
    //   const start = Date.now();

    //   const interval = setInterval(() => {
    //     const elapsed = Date.now() - start;
    //     const timeLeft = TOTAL_DURATION - elapsed;

    //     if (timeLeft > 800) {
    //       confetti({
    //         particleCount: 35,
    //         angle: 90,
    //         spread: 70,
    //         startVelocity: 22,
    //         gravity: 2,
    //         ticks: 220,
    //         origin: {
    //           x: Math.random(),
    //           y: -0.2,
    //         },
    //       });
          

    //     }

    //     if (timeLeft <= FADE_DURATION && audio.volume > 0) {
    //       audio.volume = Math.max(
    //         0,
    //         audio.volume - 0.7 / (FADE_DURATION / 100)
    //       );
    //     }

    //     if (timeLeft <= 0) {
    //       clearInterval(interval);
    //       audio.pause();
    //       audio.currentTime = 0;
    //     }
    //   }, 10);
    // };

const celebrate = async () => {
  const confetti = (await import("canvas-confetti")).default;

  const audio = new Audio("/sounds/cheer.wav");
  audio.volume = 0.7;
  audio.play().catch(() => {});

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }

  const TOTAL_DURATION = 7000;
  const SPAWN_DURATION = 5200; // stop spawning early
  const FADE_DURATION = 1500;
  const start = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - start;
    const timeLeft = TOTAL_DURATION - elapsed;

    // Spawn confetti (falls fast from top)
    if (elapsed < SPAWN_DURATION) {
      confetti({
        particleCount: 35,
        angle: 90,
        spread: 80,
        startVelocity: 30, // faster fall
        gravity: 2.6, // strong gravity
        ticks: 260, // long enough to reach bottom
        origin: {
          x: Math.random(),
          y: -0.15,
        },
      });
    }

    // Fade out sound smoothly
    if (timeLeft <= FADE_DURATION && audio.volume > 0) {
      audio.volume = Math.max(0, audio.volume - 0.7 / (FADE_DURATION / 100));
    }

    if (timeLeft <= 0) {
      clearInterval(interval);
      audio.pause();
      audio.currentTime = 0;
    }
  }, 120);
};


  const [data, setData] = useState(getInitialData);
  const [editing, setEditing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (!stored) return;

    try {
      setData(JSON.parse(stored));
      setEditing(false);
    } catch {
      setData(getInitialData());
    }
  }, [key, prompt.type]);

  const save = () => {
    if (prompt.type === "text" && isEmptyText(data)) return;

    if (prompt.type === "list" || prompt.type === "checklist") {
      const cleaned = data.filter((i) => i.text?.trim());
      if (!cleaned.length) return;
      localStorage.setItem(key, JSON.stringify(cleaned));
      setData(cleaned);
      setEditing(false);
      return;
    }

    localStorage.setItem(key, JSON.stringify(data));
    setEditing(false);
  };

  return (
    <div className=" min-h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold text-center text-slate-900 mb-6">
        {prompt.title}
      </h2>

      {/* TEXT */}
      {prompt.type === "text" && (
        <textarea
          disabled={!editing}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Write freely. This is your space."
          className="flex-grow resize-none bg-slate-100 p-4 rounded-sm text-black outline-none"
        />
      )}

      {/* LIST / CHECKLIST */}
      {(prompt.type === "list" || prompt.type === "checklist") && (
        <div className="space-y-4 flex-grow">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              {prompt.type === "checklist" && (
                <input
                  type="checkbox"
                  checked={item.done}
                  disabled={editing}
                  onChange={() => {
                    const copy = [...data];
                    copy[i].done = !copy[i].done;
                    setData(copy);
                    localStorage.setItem(key, JSON.stringify(copy));
                  }}
                  className="w-5 h-5 accent-blue-600"
                />
              )}

              <input
                disabled={!editing}
                value={item.text}
                onChange={(e) => {
                  const copy = [...data];
                  copy[i].text = e.target.value;
                  setData(copy);
                }}
                placeholder="Enter the action"
                className="flex-1 bg-slate-100 p-3 rounded-sm outline-none text-black"
              />
            </div>
          ))}

          {editing && (
            <button
              onClick={() => setData([...data, { text: "", done: false }])}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add
            </button>
          )}
        </div>
      )}

      {/* RESULT */}
      {prompt.type === "result" && (
        <div className="flex flex-col items-center justify-center flex-grow gap-4">
          {data === null ? (
            <div className="flex gap-6">
              <button
                onClick={() => {
                  setData("yes");
                  localStorage.setItem(key, JSON.stringify("yes"));
                  celebrate();
                }}
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                <i className="fas fa-check-circle"></i> Yes
              </button>
              <button
                onClick={() => {
                  setData("no");
                  localStorage.setItem(key, JSON.stringify("no"));
                }}
                className="text-black px-6 py-2 rounded bg-transparent"
              >
                <i className="fas fa-times-circle"></i> No
              </button>
            </div>
          ) : (
            <p className="text-slate-600 font-medium">
              {data === "yes"
                ? "Incredible! You've taken a big step, and we're cheering you on every step of the way! Keep going!"
                : "It’s okay to stumble sometimes. What matters is that you keep going. You’ve got this!"}
            </p>
          )}
        </div>
      )}

      {/* SAVE / EDIT */}
      {prompt.type !== "result" && (
        <div className="mt-8 flex justify-center">
          {editing ? (
            <button
              onClick={save}
              disabled={
                (prompt.type === "text" && isEmptyText(data)) ||
                ((prompt.type === "list" || prompt.type === "checklist") &&
                  data.every((i) => isEmptyText(i.text)))
              }
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-40"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-black hover:underline"
            >
              <i className="fas fa-edit"></i> Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
