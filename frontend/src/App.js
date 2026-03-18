import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

function App() {
  return (
    <div className="flex min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#0f172a] to-black">

      {/* SIDEBAR */}
      <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🚀 Trade AI
          </h2>

          <nav className="space-y-3 text-gray-400">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              📊 Dashboard
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              📄 Reports
            </NavLink>

          </nav>
        </div>

        {/* FOOTER */}
        <div className="text-xs text-gray-500">
          v1.0 • AI Powered
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 relative overflow-auto">

        {/* 🔥 GLOW BACKGROUND */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.15),transparent_40%)] pointer-events-none" />

        <div className="relative z-10">

          {/* 🔥 TOP NAVBAR */}
          <div className="flex justify-between items-center mb-8">

            <h1 className="text-2xl font-semibold tracking-wide">
              Market Intelligence
            </h1>

            <div className="flex items-center gap-4">

              {/* Notification */}
              <div className="bg-white/10 p-2 rounded-lg hover:bg-white/20 cursor-pointer transition">
                🔔
              </div>

              {/* Profile */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-lg">
                M
              </div>

            </div>
          </div>

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;