import { useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const API = "https://trade-opportunities-api-3p5l.onrender.com";

const TOKEN = "mysecrettoken";

export default function Dashboard() {
  const [sector, setSector] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!sector) return alert("Enter sector");

    setLoading(true);

    try {
      const res = await axios.get(`${API}/analyze/${sector}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      setData(res.data.report);
    } catch (err) {
      console.log(err);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const chartData = data
    ? [
        { name: "Trends", value: data.trends.length },
        { name: "Opportunities", value: data.opportunities.length },
        { name: "Risks", value: data.risks.length },
      ]
    : [];

  return (
    <div className="relative">

      {/* 🔥 GLOW BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(34,197,94,0.1),transparent_40%)] blur-2xl" />

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          📊 Market Intelligence Dashboard
        </h1>

        {/* <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            🔔
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold">
            M
          </div>
        </div> */}
      </div>

      {/* 🔍 SEARCH */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex gap-4 mb-8 shadow-xl">
        <input
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          placeholder="Search sector (AI, Pharma, EV...)"
          className="flex-1 p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-500 outline-none"
        />

        <button
          onClick={analyze}
          className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition"></span>
          <span className="relative">
            {loading ? "Analyzing..." : "Analyze"}
          </span>
        </button>
      </div>

      {/* 🚀 EMPTY STATE */}
      {!data && !loading && (
        <div className="text-center text-gray-500 mt-10">
          🚀 Enter a sector to generate insights
        </div>
      )}

      {/* 🔢 METRICS */}
      {data && (
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Metric label="Trends" value={data.trends.length} color="text-blue-400" />
          <Metric label="Opportunities" value={data.opportunities.length} color="text-green-400" />
          <Metric label="Risks" value={data.risks.length} color="text-red-400" />
        </div>
      )}

      {/* 📊 CHART */}
      {data && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl mb-8 shadow-xl"
        >
          <h2 className="text-xl mb-4">📊 Insights Overview</h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: "#111827", border: "none" }} />

              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? "#3b82f6"
                        : index === 1
                        ? "#22c55e"
                        : "#ef4444"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* 📦 CARDS */}
      {data && (
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="📈 Trends" items={data.trends} color="text-blue-400" />
          <Card title="💰 Opportunities" items={data.opportunities} color="text-green-400" />
          <Card title="⚠ Risks" items={data.risks} color="text-red-400" />
        </div>
      )}
    </div>
  );
}

/* 🔢 METRIC */
function Metric({ label, value, color }) {
  return (
    <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20">
      <div className="bg-[#0f172a] rounded-xl p-5 backdrop-blur-xl border border-white/10">
        <p className="text-gray-400 text-sm">{label}</p>
        <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
      </div>
    </div>
  );
}

/* 📦 CARD */
function Card({ title, items, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition duration-300"
    >
      <h2 className={`text-lg font-bold mb-3 ${color}`}>{title}</h2>

      {items.map((item, i) => (
        <p key={i} className="text-gray-300 text-sm mb-1">
          • {item}
        </p>
      ))}
    </motion.div>
  );
}