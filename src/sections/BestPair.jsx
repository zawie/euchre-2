import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { pairKey } from "../data";
import { palette, muted } from "../theme";

const PAIR_COLORS = {
  "Adam & Maya": "#E63946",
  "Adam & Deanna": "#9D4E5B",
  "Adam & Leah": "#E07A50",
  "Deanna & Maya": "#457B9D",
  "Deanna & Leah": "#1D3557",
  "Leah & Maya": "#7BB8BC",
};

function pairColor(key) {
  return PAIR_COLORS[key] || muted;
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

      {/* Hero */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-eyebrow">All-time best pair</div>
        <div className="hero-headline">{best}</div>
        <div className="hero-meta">
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
              itemStyle={{ color: "#1D3557" }}
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
