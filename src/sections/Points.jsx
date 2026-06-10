import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts";
import { PLAYERS } from "../data";
import { PLAYER_COLORS, muted } from "../theme";

const PAIR_COLORS = {
  "Adam & Maya": "#E63946",
  "Adam & Deanna": "#9D4E5B",
  "Adam & Leah": "#E07A50",
  "Deanna & Maya": "#457B9D",
  "Deanna & Leah": "#1D3557",
  "Leah & Maya": "#7BB8BC",
};
const pairColor = (k) => PAIR_COLORS[k] || muted;

export default function Points({ stats }) {
  const {
    playerPoints, pairPoints, playerPointsTimeline, pairPointsTimeline,
    playerWins, playerLosses, allPairKeys,
  } = stats;

  const playersByPts = [...PLAYERS].sort((a, b) => playerPoints[b] - playerPoints[a]);
  const best = playersByPts[0];
  const maxPlayerPts = playerPoints[best] || 1;

  const pairsByPts = [...allPairKeys]
    .filter((k) => (pairPoints[k] || 0) > 0)
    .sort((a, b) => (pairPoints[b] || 0) - (pairPoints[a] || 0));
  const maxPairPts = pairPoints[pairsByPts[0]] || 1;

  const ppg = (p) => {
    const g = (playerWins[p] || 0) + (playerLosses[p] || 0);
    return g ? (playerPoints[p] / g).toFixed(1) : "—";
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Points</p>
        <p className="section-sub">Ranked by total points scored, not games won</p>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-eyebrow">Most points scored</div>
        <div className="hero-headline" style={{ color: PLAYER_COLORS[best] }}>{best}</div>
        <div className="hero-meta">{playerPoints[best]} points · {ppg(best)} per game</div>
      </motion.div>

      {/* Per-player point totals */}
      <div className="stat-grid">
        {playersByPts.map((p, i) => (
          <motion.div
            key={p}
            className="stat-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            style={{ borderTop: `3px solid ${PLAYER_COLORS[p]}` }}
          >
            <div className="eyebrow" style={{ color: PLAYER_COLORS[p] }}>{p}</div>
            <div className="big">{playerPoints[p]}</div>
            <div className="label">points · {ppg(p)}/game</div>
          </motion.div>
        ))}
      </div>

      {/* Player points bars */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="card-title">Total Points · Players</div>
        <div className="bar-chart">
          {playersByPts.map((p, i) => (
            <motion.div key={p} className="bar-row" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i }}>
              <div className="bar-name">{p}</div>
              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  style={{ background: PLAYER_COLORS[p] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(playerPoints[p] / maxPlayerPts) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {playerPoints[p]}
                </motion.div>
              </div>
              <div className="bar-val" style={{ color: PLAYER_COLORS[p] }}>{ppg(p)}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pair points bars */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-title">Total Points · Pairs</div>
        <div className="bar-chart">
          {pairsByPts.map((k, i) => (
            <motion.div key={k} className="bar-row" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i }}>
              <div className="bar-name">{k}</div>
              <div className="bar-track">
                <motion.div
                  className="bar-fill"
                  style={{ background: pairColor(k) }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(pairPoints[k] / maxPairPts) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.08 * i, ease: "easeOut" }}
                >
                  {pairPoints[k]}
                </motion.div>
              </div>
              <div className="bar-val" style={{ color: pairColor(k) }}>{pairPoints[k]}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cumulative player points */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="card-title">Cumulative Points Over Time · Players</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={playerPointsTimeline} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#DCE7E2" />
            <XAxis dataKey="date" tick={{ fill: "#5B7186", fontSize: 11 }} tickFormatter={(d) => d.slice(5)} interval={3} />
            <YAxis tick={{ fill: "#5B7186", fontSize: 11 }} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid #DCE7E2", borderRadius: 8 }} labelStyle={{ color: "#1D3557", fontWeight: 600 }} />
            <Legend wrapperStyle={{ paddingTop: 16, fontSize: 12 }} />
            {PLAYERS.map((p) => (
              <Line key={p} type="monotone" dataKey={p} stroke={PLAYER_COLORS[p]} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
