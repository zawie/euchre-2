import { motion } from "framer-motion";
import {
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";
import { PLAYERS } from "../data";
import { PLAYER_COLORS, muted, palette } from "../theme";

export default function Euches({ stats }) {
  const { euchreCount, euchreTimeline } = stats;

  const sorted = [...PLAYERS].sort((a, b) => euchreCount[b] - euchreCount[a]);
  const worst = sorted[0];
  const maxE = euchreCount[worst] || 1;

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Euches</p>
        <p className="section-sub">Who got euched the most — the hall of shame</p>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-eyebrow">Most times euched</div>
        <div className="hero-headline" style={{ color: PLAYER_COLORS[worst] }}>{worst}</div>
        <div className="hero-meta">euched {euchreCount[worst]} times</div>
      </motion.div>

      {/* Cumulative line chart */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <div className="card-title">Cumulative Euches Over Time</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={euchreTimeline} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DCE7E2" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#5B7186", fontSize: 11 }}
              tickFormatter={(d) => d.slice(5)}
              interval={3}
            />
            <YAxis tick={{ fill: "#5B7186", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #DCE7E2", borderRadius: 8 }}
              labelStyle={{ color: "#1D3557", fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            {PLAYERS.map((p) => (
              <Line
                key={p}
                type="monotone"
                dataKey={p}
                stroke={PLAYER_COLORS[p]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
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
              style={{ borderTop: `3px solid ${PLAYER_COLORS[p]}` }}
            >
              <div className="eyebrow" style={{ color: PLAYER_COLORS[p] }}>{p}</div>
              <div className="big">{ratio}</div>
              <div className="label">euches / game</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
