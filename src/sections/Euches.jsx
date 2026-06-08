import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { PLAYERS } from "../data";

const PLAYER_COLORS = {
  Adam: "#fb923c",
  Maya: "#c084fc",
  Deanna: "#34d399",
  Leah: "#60a5fa",
};

export default function Euches({ stats }) {
  const { euchreCount } = stats;

  const sorted = [...PLAYERS].sort((a, b) => euchreCount[b] - euchreCount[a]);
  const worst = sorted[0];
  const maxE = euchreCount[worst] || 1;

  const barData = sorted.map((p) => ({ name: p, Euches: euchreCount[p] || 0 }));

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Euches</p>
        <p className="section-sub">Who got euched the most — the hall of shame</p>
      </motion.div>

      {/* Worst offender */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{ borderColor: "#ef4444", textAlign: "center" }}
      >
        <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: 8 }}>😬 Most times euched</div>
        <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f87171" }}>
          {worst}
        </div>
        <div style={{ color: "#9ca3af", marginTop: 4 }}>
          euched {euchreCount[worst]} times
        </div>
      </motion.div>

      {/* Bar chart */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="card-title">Times Euched</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2a45" />
            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 13 }} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#1e1b2e", border: "1px solid #3b3552", borderRadius: 8 }}
              labelStyle={{ color: "#c4b5fd" }}
              cursor={{ fill: "#ffffff10" }}
            />
            <Bar dataKey="Euches" radius={[6, 6, 0, 0]}>
              {barData.map((entry) => (
                <Cell key={entry.name} fill={PLAYER_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Horizontal bars */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-title">Breakdown</div>
        <div className="bar-chart">
          {sorted.map((p, i) => (
            <motion.div
              key={p}
              className="bar-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * i }}
            >
              <div className="bar-name">{p}</div>
              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  style={{ background: PLAYER_COLORS[p] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((euchreCount[p] || 0) / maxE) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {euchreCount[p] || 0}
                </motion.div>
              </div>
              <div className="bar-val" style={{ color: PLAYER_COLORS[p] }}>{euchreCount[p] || 0}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fun ratio */}
      <div className="stat-grid">
        {sorted.map((p, i) => {
          const { playerWins, playerLosses } = stats;
          const games = (playerWins[p] || 0) + (playerLosses[p] || 0);
          const ratio = games ? ((euchreCount[p] || 0) / games).toFixed(2) : "—";
          return (
            <motion.div
              key={p}
              className="stat-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              style={{ borderColor: PLAYER_COLORS[p] + "66" }}
            >
              <div style={{ color: PLAYER_COLORS[p], fontWeight: 700, marginBottom: 4 }}>{p}</div>
              <div className="big" style={{
                background: `linear-gradient(135deg, ${PLAYER_COLORS[p]}, #f87171)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {ratio}
              </div>
              <div className="label">euches / game</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
