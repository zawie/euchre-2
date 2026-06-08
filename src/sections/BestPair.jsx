import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { pairKey } from "../data";

const PAIR_COLORS = {
  "Adam & Maya": "#c084fc",
  "Adam & Deanna": "#f472b6",
  "Adam & Leah": "#fb923c",
  "Deanna & Maya": "#34d399",
  "Deanna & Leah": "#60a5fa",
  "Leah & Maya": "#fbbf24",
};

const PAIRS = Object.keys(PAIR_COLORS);

function pairColor(key) {
  return PAIR_COLORS[key] || "#9ca3af";
}

export default function BestPair({ stats }) {
  const { pairWins, pairLosses, timeline, allPairKeys } = stats;

  const sorted = [...allPairKeys]
    .filter((k) => (pairWins[k] || 0) > 0 || (pairLosses[k] || 0) > 0)
    .sort((a, b) => (pairWins[b] || 0) - (pairWins[a] || 0));

  const maxWins = pairWins[sorted[0]] || 1;
  const best = sorted[0];

  const winRate = (k) => {
    const w = pairWins[k] || 0;
    const l = pairLosses[k] || 0;
    return w + l === 0 ? 0 : Math.round((w / (w + l)) * 100);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Best Pair</p>
        <p className="section-sub">All pair combinations ranked by wins</p>
      </motion.div>

      {/* Winner callout */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{ borderColor: "#7c3aed", textAlign: "center", marginBottom: 24 }}
      >
        <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: 8 }}>👑 All-time best pair</div>
        <div style={{
          fontSize: "2rem", fontWeight: 800,
          background: "linear-gradient(135deg, #c084fc, #f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {best}
        </div>
        <div style={{ color: "#9ca3af", marginTop: 4 }}>
          {pairWins[best]}W – {pairLosses[best] || 0}L · {winRate(best)}% win rate
        </div>
      </motion.div>

      {/* Bar chart */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="card-title">Total Wins</div>
        <div className="bar-chart">
          {sorted.map((k, i) => (
            <motion.div
              key={k}
              className="bar-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="bar-name">{k}</div>
              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  style={{ background: pairColor(k) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((pairWins[k] || 0) / maxWins) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {pairWins[k] || 0}W
                </motion.div>
              </div>
              <div className="bar-val">{winRate(k)}%</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cumulative line chart */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="card-title">Cumulative Wins Over Time</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timeline} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2e2a45" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickFormatter={(d) => d.slice(5)}
              interval={3}
            />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: "#1e1b2e", border: "1px solid #3b3552", borderRadius: 8 }}
              labelStyle={{ color: "#c4b5fd" }}
              itemStyle={{ color: "#e2e0ea" }}
            />
            <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            {allPairKeys.map((k) => (
              <Line
                key={k}
                type="monotone"
                dataKey={k}
                stroke={pairColor(k)}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
