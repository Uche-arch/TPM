// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function YearVoiceReflection({
//   storageKey = "year-voice-intention",
// }) {
//   const [recording, setRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   // 🔁 Load saved recording (locks UI)
//   useEffect(() => {
//     const saved = localStorage.getItem(storageKey);
//     if (saved) setAudioURL(saved);
//   }, [storageKey]);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const recorder = new MediaRecorder(stream);

//       mediaRecorderRef.current = recorder;
//       chunksRef.current = [];

//       recorder.ondataavailable = (e) => {
//         if (e.data.size > 0) chunksRef.current.push(e.data);
//       };

//       recorder.onstop = () => {
//         const blob = new Blob(chunksRef.current, { type: "audio/webm" });
//         const reader = new FileReader();

//         reader.onloadend = () => {
//           localStorage.setItem(storageKey, reader.result);
//           setAudioURL(reader.result); // 🔒 locks UI forever
//         };

//         reader.readAsDataURL(blob);
//       };

//       recorder.start();
//       setRecording(true);
//     } catch {
//       alert("Please allow microphone access to continue.");
//     }
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     setRecording(false);
//   };

//   return (
//     <div className="bg-slate-900 p-6 rounded-xl space-y-4">
//       {/* 🧠 Title always visible */}
//       <h2 className="text-lg font-bold text-center">
//         What do you want your year to be like?
//       </h2>

//       {/* 🎙️ BEFORE RECORDING */}
//       {!audioURL && (
//         <>
//           <div className="flex justify-center">
//             {!recording ? (
//               <button onClick={startRecording} className="px-6 py-2 rounded">
//                 <i className="fas fa-microphone-alt"></i>
//                 <br />
//                 Start Recording
//               </button>
//             ) : (
//               <button
//                 onClick={stopRecording}
//                 className="px-6 py-2 rounded"
//               >
//                 <i className="fas fa-square"></i><br />Stop Recording
//               </button>
//             )}
//           </div>

//           <p className="text-sm text-center opacity-60">
//             You can do this only once. Take your time and pour out everything
//             you have.
//           </p>
//         </>
//       )}

//       {/* 🔊 AFTER SAVED */}
//       {audioURL && (
//         <div className="pt-2">
//           <audio controls src={audioURL} className="w-full" />
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useEffect, useRef, useState } from "react";

export default function VoiceReflection({ storageKey }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setAudioURL(saved);
  }, [storageKey]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem(storageKey, reader.result);
          setAudioURL(reader.result);
        };
        reader.readAsDataURL(blob);
      };

      recorder.start();
      setRecording(true);
    } catch {
      alert("Please allow microphone access.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className=" rounded-3xl pt-5">
      <h2 className="text-lg font-semibold text-center text-slate-900">
        What do you want your year to be like?
      </h2>

      {!audioURL && (
        <>
          <div className="flex justify-center mt-4">
            {!recording ? (
              <button
                onClick={startRecording}
                className="text-black px-5 py-3 rounded-full shadow hover:bg-blue-500 transition"
              >
                <i className="fas fa-microphone"></i>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="text-black px-6 py-3 shadow-sm"
              >
                ⏹ Stop Recording
              </button>
            )}
          </div>

          <p className="mt-4 text-sm text-center text-slate-500">
            You can do this only once. Take your time and pour everything out.
          </p>
        </>
      )}

      {audioURL && (
        <div className="mt-6">
          <audio controls src={audioURL} className="w-full" />
        </div>
      )}
    </div>
  );
}
