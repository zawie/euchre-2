// Parsed from raw-stats.txt
// Each game: { date, pair1: [p1, p2], pair2: [p3, p4], winner: [p1,p2] or [p3,p4], score: {winner, loser}, euchres: {player: count}, farmers: {player: count}, royals: {player: count} }

export const games = [
  {
    date: "2026-01-01",
    pair1: ["Maya", "Adam"],
    pair2: ["Deanna", "Leah"],
    winner: ["Maya", "Adam"],
    score: { winner: 10, loser: 9 },
    euchres: {}, // "each euched" = don't count
    farmers: {},
    royals: {},
    notes: "Sol cafe",
  },
  {
    date: "2026-01-08",
    pair1: ["Leah", "Adam"],
    pair2: ["Deanna", "Maya"],
    winner: ["Leah", "Adam"],
    score: { winner: 6, loser: 4 },
    euchres: { Deanna: 1, Maya: 1 },
    farmers: {},
    royals: {},
  },
  {
    date: "2026-01-13",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Deanna", "Leah"],
    score: { winner: 10, loser: 8 },
    euchres: { Maya: 1, Adam: 1, Deanna: 1, Leah: 1 }, // both pairs euched each other
    farmers: { Deanna: 2, Leah: 1 },
    royals: {},
    alones: [{ player: "Adam", sweep: false }],
    notes: "Adam went alone (won 4; 1pt); Deanna mc'd",
  },
  {
    date: "2026-01-13",
    pair1: ["Leah", "Adam"],
    pair2: ["Deanna", "Maya"],
    winner: ["Leah", "Adam"],
    score: { winner: 10, loser: 9 },
    euchres: { Deanna: 3, Adam: 2 },
    farmers: { unknown: 1 },
    royals: {},
  },
  {
    date: "2026-01-20",
    pair1: ["Deanna", "Adam"],
    pair2: ["Maya", "Leah"],
    winner: ["Deanna", "Adam"],
    score: { winner: 11, loser: 3 },
    euchres: { Adam: 1, Maya: 1 },
    farmers: {},
    royals: {},
    alones: [{ player: "Adam", sweep: true }],
    notes: "Adam went alone; Deanna ace no face",
  },
  {
    date: "2026-01-20",
    pair1: ["Deanna", "Adam"],
    pair2: ["Maya", "Leah"],
    winner: ["Deanna", "Adam"],
    score: { winner: 10, loser: 8 },
    euchres: { Maya: 1, Adam: 1 },
    farmers: { Leah: 1 },
    royals: {},
    notes: "Leah ace no face; Adam Macavillian",
  },
  {
    date: "2026-01-28",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 5 },
    euchres: { Adam: 1, Deanna: 1 },
    farmers: {},
    royals: { Deanna: 1, Adam: 1 }, // "Royal Deanna and Adam euched" = royal hand, they got euched
    notes: "Corvus",
  },
  {
    date: "2026-01-28",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 5 },
    euchres: {},
    farmers: { Deanna: 1 },
    royals: {},
    notes: "Corvus; Macavillian hand Leah (improper wrong deal)",
  },
  {
    date: "2026-02-03",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 9 },
    euchres: { Adam: 1, Deanna: 1 },
    farmers: {},
    royals: { Leah: 1 },
    alones: [{ player: "Adam", sweep: false }],
    notes: "Tiki Tuesday — Adam called alone not knowing trump, won 4",
  },
  {
    date: "2026-02-03",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 10, loser: 6 },
    euchres: {},
    farmers: {},
    royals: { Deanna: 1 },
    notes: "Leah perfectly predicted Queen of spades",
  },
  {
    date: "2026-02-11",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 10, loser: 4 },
    euchres: { Deanna: 1, Leah: 1 },
    farmers: { Leah: 2 },
    royals: {},
  },
  {
    date: "2026-02-11",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Deanna", "Leah"],
    score: { winner: 11, loser: 9 },
    euchres: { Adam: 2, Leah: 1 },
    farmers: { Deanna: 2, Leah: 1 },
    royals: {},
    notes: "Maya ace no face",
  },
  {
    date: "2026-02-18",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Adam", "Maya"],
    score: { winner: 10, loser: 9 },
    euchres: { Deanna: 1 },
    farmers: { Leah: 1 },
    royals: { Maya: 1 },
  },
  {
    date: "2026-03-04",
    pair1: ["Deanna", "Adam"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 7 },
    euchres: { Adam: 1 },
    farmers: { Leah: 1 },
    royals: {},
    alones: [{ player: "Adam", sweep: false }],
    notes: "Adam went alone and won 4 tricks",
  },
  {
    date: "2026-03-04",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 10, loser: 9 },
    euchres: { Deanna: 1 },
    farmers: { Adam: 1 },
    royals: {},
    alones: [{ player: "Maya", sweep: true }],
    notes: "Maya went alone; Leah ace no face",
  },
  {
    date: "2026-03-10",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 10, loser: 9 },
    euchres: { Adam: 1 },
    farmers: {},
    royals: {},
    alones: [{ player: "Adam", sweep: true }],
    notes: "Adam went alone and succeeded",
  },
  {
    date: "2026-03-10",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Deanna", "Leah"],
    score: { winner: 11, loser: 9 },
    euchres: { Adam: 1, Maya: 1 },
    farmers: { Deanna: 1 },
    royals: {},
    notes: "Deanna had a farmers hand and called and still won",
  },
  {
    date: "2026-04-01",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 5 },
    euchres: { Adam: 2 },
    farmers: { Maya: 1, Leah: 1 },
    royals: {},
    alones: [{ player: "Adam", sweep: true }],
    notes: "Adam went alone and won them all",
  },
  {
    date: "2026-04-01",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Adam", "Deanna"],
    score: { winner: 6, loser: 4 },
    euchres: { Maya: 1, Leah: 1 },
    farmers: {},
    royals: {},
  },
  {
    date: "2026-04-07",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Deanna", "Maya"],
    score: { winner: 10, loser: 8 },
    euchres: { Adam: 1 },
    farmers: { Leah: 2 },
    royals: { Leah: 1 },
  },
  {
    date: "2026-04-07",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Deanna", "Maya"],
    score: { winner: 10, loser: 7 },
    euchres: {},
    farmers: {},
    royals: {},
    alones: [{ player: "Leah", sweep: true }],
    notes: "Leah went alone and won",
  },
  {
    date: "2026-04-15",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Adam", "Deanna"],
    score: { winner: 10, loser: 7 },
    euchres: { Leah: 1 },
    farmers: { Maya: 1 },
    royals: { Adam: 1 },
  },
  {
    date: "2026-04-15",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Deanna", "Maya"],
    score: { winner: 10, loser: 6 },
    euchres: { Deanna: 1, Leah: 1 },
    farmers: {},
    royals: {},
    alones: [{ player: "Maya", sweep: false }],
    notes: "Maya went alone and won all but 1",
  },
  {
    date: "2026-04-22",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 10, loser: 3 },
    euchres: { Deanna: 1 },
    farmers: { Leah: 3 },
    royals: {},
  },
  {
    date: "2026-04-22",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 8 },
    euchres: { Leah: 1, Maya: 2 },
    farmers: { Leah: 1 },
    royals: {},
  },
  {
    date: "2026-04-22",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Deanna", "Leah"],
    score: { winner: 10, loser: 9 },
    euchres: { Leah: 1, Deanna: 1, Adam: 1, Maya: 1 },
    farmers: { Maya: 1 },
    royals: {},
    notes: "Leah got euched as hung dealer; Adam got euched hung",
  },
  {
    date: "2026-04-28",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 10, loser: 9 },
    euchres: { Maya: 2, Leah: 1, Adam: 1 },
    farmers: {},
    royals: {},
    notes: "Deanna got ace no face",
  },
  {
    date: "2026-04-28",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Deanna", "Maya"],
    score: { winner: 10, loser: 5 },
    euchres: { Leah: 1, Maya: 1 },
    farmers: { Maya: 1 },
    royals: {},
  },
  {
    date: "2026-05-05",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Deanna", "Maya"],
    score: { winner: 11, loser: 8 },
    euchres: { Leah: 1, Adam: 1 },
    farmers: { Leah: 1 },
    royals: {},
  },
  {
    date: "2026-05-14",
    pair1: ["Adam", "Leah"],
    pair2: ["Deanna", "Maya"],
    winner: ["Adam", "Leah"],
    score: { winner: 11, loser: 2 },
    euchres: { Maya: 1 },
    farmers: { Deanna: 2, Maya: 1 },
    royals: {},
  },
  {
    date: "2026-05-14",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Adam", "Maya"],
    score: { winner: 11, loser: 9 },
    euchres: { Deanna: 1 },
    farmers: { Leah: 1 },
    royals: {},
  },
  {
    date: "2026-05-14",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 11, loser: 7 },
    euchres: { Maya: 2, Deanna: 1 },
    farmers: { Deanna: 1 },
    royals: {},
    alones: [{ player: "Maya", sweep: true }],
    notes: "Maya went alone and won",
  },
  {
    date: "2026-05-14",
    pair1: ["Maya", "Adam"],
    pair2: ["Deanna", "Leah"],
    winner: ["Deanna", "Leah"],
    score: { winner: 10, loser: 6 },
    euchres: {},
    farmers: { Adam: 1, Maya: 1 },
    royals: {},
  },
  {
    date: "2026-06-02",
    pair1: ["Adam", "Maya"],
    pair2: ["Deanna", "Leah"],
    winner: ["Adam", "Maya"],
    score: { winner: 10, loser: 3 },
    euchres: { Leah: 1, Deanna: 1 },
    farmers: { Deanna: 2 },
    royals: {},
    notes: "Leah got euched hung dealer",
  },
  {
    date: "2026-06-02",
    pair1: ["Leah", "Adam"],
    pair2: ["Deanna", "Maya"],
    winner: ["Leah", "Adam"],
    score: { winner: 11, loser: 3 },
    euchres: { Deanna: 1, Leah: 1 },
    farmers: {},
    royals: { Leah: 1 },
    alones: [{ player: "Leah", sweep: true }],
    notes: "Leah went alone on first hand",
  },
  {
    date: "2026-06-02",
    pair1: ["Adam", "Deanna"],
    pair2: ["Maya", "Leah"],
    winner: ["Maya", "Leah"],
    score: { winner: 5, loser: 3 },
    euchres: { Adam: 1 },
    farmers: { Maya: 1 },
    royals: {},
  },
];

export const PLAYERS = ["Adam", "Maya", "Deanna", "Leah"];

// All unique sorted pair keys
export const pairKey = (p1, p2) => [p1, p2].sort().join(" & ");

export function computeStats() {
  const pairWins = {};
  const pairLosses = {};
  const playerWins = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const playerLosses = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const euchreCount = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const farmerCount = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const royalCount = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const aloneCount = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const aloneSweep = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };

  // Cumulative pair wins over time
  const pairCumulative = {}; // pairKey -> [{date, wins}]

  games.forEach((g) => {
    const wKey = pairKey(g.winner[0], g.winner[1]);
    const loser = g.pair1.includes(g.winner[0]) ? g.pair2 : g.pair1;
    const lKey = pairKey(loser[0], loser[1]);

    pairWins[wKey] = (pairWins[wKey] || 0) + 1;
    pairLosses[lKey] = (pairLosses[lKey] || 0) + 1;

    g.winner.forEach((p) => playerWins[p]++);
    loser.forEach((p) => playerLosses[p]++);

    Object.entries(g.euchres).forEach(([p, c]) => {
      if (PLAYERS.includes(p)) euchreCount[p] += c;
    });
    Object.entries(g.farmers).forEach(([p, c]) => {
      if (PLAYERS.includes(p)) farmerCount[p] += c;
    });
    Object.entries(g.royals).forEach(([p, c]) => {
      if (PLAYERS.includes(p)) royalCount[p] += c;
    });
    (g.alones || []).forEach(({ player, sweep }) => {
      if (PLAYERS.includes(player)) {
        aloneCount[player]++;
        if (sweep === true) aloneSweep[player]++;
      }
    });
  });

  // Build cumulative pair wins timeline
  const allPairKeys = [...new Set(games.flatMap((g) => {
    const wKey = pairKey(g.winner[0], g.winner[1]);
    const loser = g.pair1.includes(g.winner[0]) ? g.pair2 : g.pair1;
    const lKey = pairKey(loser[0], loser[1]);
    return [wKey, lKey];
  }))];

  const runningWins = {};
  allPairKeys.forEach((k) => (runningWins[k] = 0));

  const timeline = games.map((g) => {
    const wKey = pairKey(g.winner[0], g.winner[1]);
    runningWins[wKey]++;
    return { date: g.date, ...Object.fromEntries(Object.entries(runningWins).map(([k, v]) => [k, v])) };
  });

  // Player cumulative wins timeline
  const runningPlayerWins = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const playerTimeline = games.map((g) => {
    g.winner.forEach((p) => runningPlayerWins[p]++);
    return { date: g.date, ...runningPlayerWins };
  });

  // Cumulative euchres-against timeline
  const runningEuchres = { Adam: 0, Maya: 0, Deanna: 0, Leah: 0 };
  const euchreTimeline = games.map((g) => {
    Object.entries(g.euchres).forEach(([p, c]) => {
      if (PLAYERS.includes(p)) runningEuchres[p] += c;
    });
    return { date: g.date, ...runningEuchres };
  });

  return {
    pairWins,
    pairLosses,
    playerWins,
    playerLosses,
    euchreCount,
    farmerCount,
    royalCount,
    aloneCount,
    aloneSweep,
    timeline,
    euchreTimeline,
    playerTimeline,
    allPairKeys,
  };
}
