import { motion } from "framer-motion";
import { games } from "../data";

export default function Splash({ onReveal }) {
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="splash-inner">
        <motion.div
          className="splash-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          2026 EDITION
        </motion.div>

        <motion.h1
          className="splash-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Euchre<br />Wrapped
        </motion.h1>

        <motion.p
          className="splash-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {games.length} games · 4 friends · 1 winner
        </motion.p>

        <motion.button
          className="splash-btn"
          onClick={onReveal}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Reveal →
        </motion.button>
      </div>
    </motion.div>
  );
}
