import { motion } from "framer-motion";
import { games, PLAYERS } from "../data";
import { PLAYER_COLORS, muted, palette } from "../theme";

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
    if (sweep === true) return <span style={{ color: palette.strawberry, fontWeight: 700 }}>Swept all 5 · 4pts</span>;
    if (sweep === false) return <span style={{ color: palette.steel, fontWeight: 700 }}>Won · 1pt</span>;
    return <span style={{ color: muted }}>Won · pts unrecorded</span>;
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">Going Alone</p>
        <p className="section-sub">Every solo call has been won — but only some swept all 5</p>
      </motion.div>

      {/* Hero */}
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-eyebrow">Most loner calls</div>
        <div className="hero-headline" style={{ color: PLAYER_COLORS[king] }}>{king}</div>
        <div className="hero-meta">
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
        <div className="card-title">Solo Calls · sweeps / total at right</div>
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
                  animate={{ width: `${(aloneCount[p] / maxA) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                >
                  {aloneCount[p] > 0 && aloneCount[p]}
                </motion.div>
              </div>
              <div className="bar-val" style={{ color: PLAYER_COLORS[p] }}>
                {aloneSweep[p]}/{aloneCount[p]}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Log of every attempt */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="card-title">Every Solo Call</div>
        <div className="table-scroll">
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
                <td style={{ color: muted, fontSize: "0.85rem" }}>{a.date}</td>
                <td style={{ color: PLAYER_COLORS[a.player], fontWeight: 700 }}>{a.player}</td>
                <td>{resultLabel(a.sweep)}</td>
                <td style={{ color: muted, fontSize: "0.85rem" }}>{a.notes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </motion.div>
    </div>
  );
}
