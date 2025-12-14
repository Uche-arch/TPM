// "use client";
// import { useState } from "react";
// import GoalModal from "./GoalModal";

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// export default function MonthGrid() {
//   const [activeMonth, setActiveMonth] = useState(null);

//   return (
//     <>
//       <div className="mt-10 grid grid-cols-3 gap-4">
//         {months.map((m, i) => (
//           <button
//             key={i}
//             onClick={() => setActiveMonth(m)}
//             className="h-24 rounded-xl text-xl font-semibold"
//             style={{ background: `hsl(${i * 30},70%,50%)` }}
//           >
//             {m}
//           </button>
//         ))}

//         {activeMonth && (
//           <GoalModal month={activeMonth} onClose={() => setActiveMonth(null)} />
//         )}
//       </div>
      
//     </>
//   );
// }


"use client";
import { useState } from "react";
import GoalModal from "./GoalModal";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthGrid() {
  const [activeMonth, setActiveMonth] = useState(null);

  return (
    <>
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-6">
          Choose a month
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {months.map((m, i) => (
            <button
              key={m}
              onClick={() => setActiveMonth(m)}
              className="h-24 rounded text-lg font-semibold text-white shadow-sm
                         transition transform hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: `hsl(${i * 30}, 70%, 55%)`,
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {activeMonth && (
        <GoalModal month={activeMonth} onClose={() => setActiveMonth(null)} />
      )}
    </>
  );
}
