import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { PLAYERS } from "../data";

const PLAYER_COLORS = {
  Adam: "#fb923c",
  Maya: "#c084fc",
  Deanna: "#34d399",
  Leah: "#60a5fa",
};

export default function BestPlayer({ stats }) {
  const { playerWins, playerLosses, euchreCount, farmerCount, royalCount, playerTimeline } = stats;

  const sorted = [...PLAYERS].sort((a, b) => playerWins[b] - playerWins[a]);
  const best = sorted[0];
  const maxWins = playerWins[best];

  const winRate = (p) => {
    const w = playerWins[p];
    const l = playerLosses[p];
    return w + l === 0 ? 0 : Math.round((w / (w + l)) * 100);
  };

  const radarData = PLAYERS.map((p) => ({
    player: p,
    Wins: playerWins[p],
    "Win %": winRate(p),
    Farmers: farmerCount[p],
    Royals: royalCount[p],
  }));

  // per-player radar
  const playerRadar = PLAYERS.map((p) => ({
    stat: p,
    Adam: playerWins.Adam,
    Maya: playerWins.Maya,
    Deanna: playerWins.Deanna,
    Leah: playerWins.Leah,
  }));

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Best Player</p>
        <p className="section-sub">Individual win records across all game pairings</p>
      </motion.div>

      {/* Winner callout */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{ borderColor: PLAYER_COLORS[best], textAlign: "center" }}
      >
        <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: 8 }}>👑 Most wins</div>
        <div style={{
          fontSize: "2.5rem", fontWeight: 800,
          color: PLAYER_COLORS[best],
        }}>
          {best}
        </div>
        <div style={{ color: "#9ca3af", marginTop: 4 }}>
          {playerWins[best]}W – {playerLosses[best]}L · {winRate(best)}% win rate
        </div>
      </motion.div>

      {/* Stat grid */}
      <div className="stat-grid">
        {sorted.map((p, i) => (
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
              background: `linear-gradient(135deg, ${PLAYER_COLORS[p]}, #f472b6)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              {playerWins[p]}
            </div>
            <div className="label">wins · {winRate(p)}%</div>
            <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: 6 }}>
              {playerLosses[p]} losses
            </div>
          </motion.div>
        ))}
      </div>

      {/* Win bars */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-title">Wins</div>
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
                  animate={{ width: `${(playerWins[p] / maxWins) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {playerWins[p]}
                </motion.div>
              </div>
              <div className="bar-val">{winRate(p)}%</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Cumulative line chart */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="card-title">Cumulative Wins Over Time</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={playerTimeline} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
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

      {/* Fun stats */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="card-title">Farmer &amp; Royal Hands</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Farmer Hands</th>
              <th>Royal Hands</th>
            </tr>
          </thead>
          <tbody>
            {[...PLAYERS].sort((a, b) => (farmerCount[b] + royalCount[b]) - (farmerCount[a] + royalCount[a])).map((p) => (
              <tr key={p}>
                <td style={{ color: PLAYER_COLORS[p], fontWeight: 600 }}>{p}</td>
                <td>{farmerCount[p] || 0}</td>
                <td>{royalCount[p] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
