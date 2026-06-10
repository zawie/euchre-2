import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { computeStats, games, pairKey } from "./data";
import BestPair from "./sections/BestPair";
import BestPlayer from "./sections/BestPlayer";
import Euches from "./sections/Euches";
import Alones from "./sections/Alones";
import RawData from "./sections/RawData";
import Splash from "./sections/Splash";
import "./App.css";

const stats = computeStats();

const SECTIONS = [
  { id: "player", label: "Best Player" },
  { id: "pair", label: "Best Pair" },
  { id: "euches", label: "Euches" },
  { id: "alone", label: "Going Alone" },
  { id: "data", label: "All Games" },
];

export default function App() {
  const [active, setActive] = useState("player");
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="app">
      <AnimatePresence>
        {!revealed && <Splash key="splash" onReveal={() => setRevealed(true)} />}
      </AnimatePresence>

      <header className="app-header">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Euchre <span className="accent">Wrapped</span>
        </motion.h1>
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {games.length} games · Maya, Adam, Deanna &amp; Leah
        </motion.p>
        <nav className="app-nav">
          {SECTIONS.map((s, i) => (
            <motion.button
              key={s.id}
              className={`nav-btn ${active === s.id ? "active" : ""}`}
              onClick={() => setActive(s.id)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {s.label}
            </motion.button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {active === "pair" && <BestPair stats={stats} />}
            {active === "player" && <BestPlayer stats={stats} />}
            {active === "euches" && <Euches stats={stats} />}
            {active === "alone" && <Alones stats={stats} />}
            {active === "data" && <RawData games={games} pairKey={pairKey} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
