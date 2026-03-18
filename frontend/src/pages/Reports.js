import { useState } from "react";

export default function Reports() {
  const [sector, setSector] = useState("");

  const downloadReport = () => {
    if (!sector) return alert("Enter sector");

    const url = `http://127.0.0.1:8000/analyze/${sector}/download`;

    fetch(url, {
      headers: {
        Authorization: "Bearer mysecrettoken",
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${sector}_report.md`;
        link.click();
      })
      .catch(() => alert("Download failed"));
  };

  return (
    <div>

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        📄 Reports Center
      </h1>

      {/* INPUT BOX */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex gap-4 mb-8">

        <input
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          placeholder="Enter sector (technology, pharma...)"
          className="flex-1 p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-500 outline-none"
        />

        <button
          onClick={downloadReport}
          className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition"
        >
          Download
        </button>

      </div>

      {/* INFO CARD */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl mb-3">📌 How it works</h2>

        <ul className="text-gray-300 space-y-2 text-sm">
          <li>• Enter a sector name</li>
          <li>• Click download</li>
          <li>• AI generates market insights</li>
          <li>• Report downloads as markdown file</li>
        </ul>
      </div>

    </div>
  );
}