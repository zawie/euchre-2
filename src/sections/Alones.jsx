import { motion } from "framer-motion";
import { games, PLAYERS } from "../data";

const PLAYER_COLORS = {
  Adam: "#fb923c",
  Maya: "#c084fc",
  Deanna: "#34d399",
  Leah: "#60a5fa",
};

export default function Alones({ stats }) {
  const { aloneCount, aloneSweep } = stats;

  const sorted = [...PLAYERS].sort((a, b) => aloneCount[b] - aloneCount[a]);
  const maxA = Math.max(1, ...PLAYERS.map((p) => aloneCount[p]));
  const totalAttempts = PLAYERS.reduce((s, p) => s + aloneCount[p], 0);
  const totalSweeps = PLAYERS.reduce((s, p) => s + aloneSweep[p], 0);

  const king = sorted[0];

  // flat list of every alone attempt with its game
  const attempts = [];
  games.forEach((g) => {
    (g.alones || []).forEach((a) => attempts.push({ ...a, date: g.date, notes: g.notes }));
  });

  const resultLabel = (sweep) => {
    if (sweep === true) return <span style={{ color: "#fbbf24", fontWeight: 600 }}>🧹 Swept all 5 (4pts)</span>;
    if (sweep === false) return <span style={{ color: "#34d399", fontWeight: 600 }}>✓ Won (1pt)</span>;
    return <span style={{ color: "#9ca3af" }}>✓ Won (pts unrecorded)</span>;
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Going Alone</p>
        <p className="section-sub">Every solo call has been won — but only some swept all 5</p>
      </motion.div>

      {/* Callout */}
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        style={{ borderColor: PLAYER_COLORS[king], textAlign: "center" }}
      >
        <div style={{ fontSize: "0.8rem", color: "#9ca3af", marginBottom: 8 }}>🦅 Most loner calls</div>
        <div style={{ fontSize: "2.5rem", fontWeight: 800, color: PLAYER_COLORS[king] }}>
          {king}
        </div>
        <div style={{ color: "#9ca3af", marginTop: 4 }}>
          {aloneCount[king]} solo calls · {aloneSweep[king]} full sweeps
        </div>
      </motion.div>

      {/* Summary stats */}
      <div className="stat-grid">
        <motion.div className="stat-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="big">{totalAttempts}</div>
          <div className="label">total solo calls</div>
        </motion.div>
        <motion.div className="stat-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="big">{totalSweeps}</div>
          <div className="label">full sweeps (4pts)</div>
        </motion.div>
        <motion.div className="stat-box" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="big">0</div>
          <div className="label">ever euched alone</div>
        </motion.div>
      </div>

      {/* Per-player breakdown */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="card-title">Solo Calls (🧹 = swept all 5)</div>
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
                  style={{ background: PLAYER_COLORS[p], gap: 2 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(aloneCount[p] / maxA) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {aloneCount[p] > 0 && (
                    <>
                      {"🧹".repeat(aloneSweep[p])}
                      <span style={{ marginLeft: 4 }}>{aloneCount[p]}</span>
                    </>
                  )}
                </motion.div>
              </div>
              <div className="bar-val" style={{ color: PLAYER_COLORS[p] }}>
                {aloneSweep[p]}🧹
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Log of every attempt */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-title">Every Solo Call</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Player</th>
              <th>Result</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, i) => (
              <tr key={i}>
                <td style={{ color: "#9ca3af", fontSize: "0.82rem" }}>{a.date}</td>
                <td style={{ color: PLAYER_COLORS[a.player], fontWeight: 600 }}>{a.player}</td>
                <td>{resultLabel(a.sweep)}</td>
                <td style={{ color: "#9ca3af", fontSize: "0.8rem", fontStyle: "italic" }}>{a.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
