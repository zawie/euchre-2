import { useState } from "react";
import { motion } from "framer-motion";

const PLAYER_COLORS = {
  Adam: "#fb923c",
  Maya: "#c084fc",
  Deanna: "#34d399",
  Leah: "#60a5fa",
};

function colorName(name) {
  return <span style={{ color: PLAYER_COLORS[name] || "#e2e0ea", fontWeight: 600 }}>{name}</span>;
}

export default function RawData({ games, pairKey }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p className="section-title">All Games</p>
        <p className="section-sub">{games.length} games played · click a row for details</p>
      </motion.div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Matchup</th>
              <th>Score</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g, i) => {
              const loser = g.pair1.includes(g.winner[0]) ? g.pair2 : g.pair1;
              const isOpen = expanded === i;
              return (
                <>
                  <tr
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <td style={{ color: "#6b7280", fontSize: "0.8rem" }}>{i + 1}</td>
                    <td style={{ color: "#9ca3af", fontSize: "0.82rem" }}>{g.date}</td>
                    <td>
                      {colorName(g.pair1[0])} &amp; {colorName(g.pair1[1])}
                      <span style={{ color: "#6b7280", margin: "0 6px" }}>vs</span>
                      {colorName(g.pair2[0])} &amp; {colorName(g.pair2[1])}
                    </td>
                    <td style={{ fontVariantNumeric: "tabular-nums" }}>
                      {g.score.winner}–{g.score.loser}
                    </td>
                    <td>
                      <span className="winner-tag">
                        {g.winner[0]} &amp; {g.winner[1]}
                      </span>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr key={`detail-${i}`}>
                      <td colSpan={5} style={{ background: "#0f0d1e", padding: "12px 16px" }}>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: "0.82rem" }}
                        >
                          {Object.entries(g.euchres).filter(([p]) => p !== "unknown").length > 0 && (
                            <div>
                              <span style={{ color: "#9ca3af", marginRight: 6 }}>Euched:</span>
                              {Object.entries(g.euchres)
                                .filter(([p]) => p !== "unknown")
                                .map(([p, c]) => (
                                  <span key={p} className="euchre-pip">{p} ×{c}</span>
                                ))}
                            </div>
                          )}
                          {Object.entries(g.farmers).filter(([p]) => p !== "unknown").length > 0 && (
                            <div>
                              <span style={{ color: "#9ca3af", marginRight: 6 }}>Farmer hands:</span>
                              {Object.entries(g.farmers)
                                .filter(([p]) => p !== "unknown")
                                .map(([p, c]) => (
                                  <span key={p} style={{ color: "#fbbf24", marginRight: 6 }}>{p} ×{c}</span>
                                ))}
                            </div>
                          )}
                          {Object.entries(g.royals).length > 0 && (
                            <div>
                              <span style={{ color: "#9ca3af", marginRight: 6 }}>Royal hands:</span>
                              {Object.entries(g.royals).map(([p, c]) => (
                                <span key={p} style={{ color: "#c084fc", marginRight: 6 }}>{p} ×{c}</span>
                              ))}
                            </div>
                          )}
                          {(g.alones || []).length > 0 && (
                            <div>
                              <span style={{ color: "#9ca3af", marginRight: 6 }}>Went alone:</span>
                              {g.alones.map((a, ai) => (
                                <span key={ai} style={{ color: a.sweep === true ? "#fbbf24" : "#34d399", marginRight: 6 }}>
                                  {a.player} {a.sweep === true ? "🧹 swept" : "✓ won"}
                                </span>
                              ))}
                            </div>
                          )}
                          {g.notes && (
                            <div style={{ color: "#9ca3af", fontStyle: "italic" }}>"{g.notes}"</div>
                          )}
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
