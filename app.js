(function () {
  const DEFAULT_TEAMS = [
    "COBS",
    "Old Boys",
    "Universidad Católica",
    "Stade Francais (Chile)",
    "PWCC",
    "Old Reds"
  ];

  const DEFAULT_CATEGORY = "Adulto XV";

  const CATEGORIES = [
    "Adulto XV",
    "Adulto Desarrollo",
    "Juvenil M18",
    "Femenino",
    "Seven"
  ];

  const DEFAULT_LEAGUE = {
    name: "Liga Metropolitana",
    category: DEFAULT_CATEGORY,
    createdAt: null
  };

  const DEFAULT_LOGO = "assets/logos/default.svg";

  const POSITION_LABELS = {
    "PR-LH": "Pilar izquierdo",
    HK: "Hooker",
    "PR-TH": "Pilar derecho",
    LK: "Segunda línea",
    FL: "Tercera línea",
    N8: "Número 8",
    SH: "Medio scrum",
    FH: "Apertura (Fly-half)",
    CE: "Centro",
    WG: "Wing",
    FB: "Fullback"
  };

  const POSITION_ORDER = [
    "PR-LH",
    "HK",
    "PR-TH",
    "LK",
    "FL",
    "N8",
    "SH",
    "FH",
    "CE",
    "WG",
    "FB"
  ];

  const CLUB_LIBRARY = {
    "COBS": {
      short: "COBS",
      city: "Santiago",
      colors: ["#f97316", "#0f172a"],
      logo: "assets/logos/cobs.svg",
      roster: [
        { name: "Matías Valenzuela", position: "PR-LH", starter: true },
        { name: "Diego Rivas", position: "HK", starter: true },
        { name: "Ignacio Herrera", position: "PR-TH", starter: true },
        { name: "Benjamín Torres", position: "LK", starter: true },
        { name: "Felipe Fuenzalida", position: "LK", starter: true },
        { name: "Cristóbal Núñez", position: "FL", starter: true },
        { name: "Esteban Mena", position: "FL", starter: true },
        { name: "Nicolás Gutiérrez", position: "N8", starter: true },
        { name: "Sebastián Cornejo", position: "SH", starter: true },
        { name: "Tomás Silva", position: "FH", starter: true },
        { name: "Álvaro Larraín", position: "CE", starter: true },
        { name: "Martín O'Ryan", position: "CE", starter: true },
        { name: "Patrick O'Brien", position: "WG", starter: true },
        { name: "Rafael Díaz", position: "WG", starter: true },
        { name: "Javier Rozas", position: "FB", starter: true },
        { name: "Franco Morales", position: "PR-LH", starter: false },
        { name: "Rodrigo Pérez", position: "PR-TH", starter: false, dual: true },
        { name: "Andrés Vidal", position: "HK", starter: false },
        { name: "José Cáceres", position: "LK", starter: false },
        { name: "Álvaro Jara", position: "FL", starter: false },
        { name: "Sergio Molina", position: "SH", starter: false },
        { name: "Matías Sáenz", position: "CE", starter: false },
        { name: "Gabriel Contreras", position: "WG", starter: false }
      ]
    },
    "Old Boys": {
      short: "Old Boys",
      city: "Santiago",
      colors: ["#60a5fa", "#0b1120"],
      logo: "assets/logos/oldboys.svg",
      roster: [
        { name: "Hernán Fuenzalida", position: "PR-LH", starter: true },
        { name: "Rodrigo Silva", position: "HK", starter: true },
        { name: "Pablo Cisternas", position: "PR-TH", starter: true },
        { name: "Francisco Brown", position: "LK", starter: true },
        { name: "Gonzalo Mackay", position: "LK", starter: true },
        { name: "Matías Aylwin", position: "FL", starter: true },
        { name: "Bruno Lagos", position: "FL", starter: true },
        { name: "Vicente Phillips", position: "N8", starter: true },
        { name: "Nicolás Rizzo", position: "SH", starter: true },
        { name: "Felipe Donoso", position: "FH", starter: true },
        { name: "Joaquín Walker", position: "CE", starter: true },
        { name: "Santiago Errázuriz", position: "CE", starter: true },
        { name: "Thomas Parsons", position: "WG", starter: true },
        { name: "Luciano Leigh", position: "WG", starter: true },
        { name: "Alfredo Lyon", position: "FB", starter: true },
        { name: "Maximiliano Booth", position: "PR-LH", starter: false },
        { name: "Benjamín Boetsch", position: "PR-TH", starter: false, dual: true },
        { name: "Iván Sutherland", position: "HK", starter: false },
        { name: "Luis Zamorano", position: "LK", starter: false },
        { name: "César Balmaceda", position: "FL", starter: false },
        { name: "Ignacio Vial", position: "SH", starter: false },
        { name: "Cristián Prieto", position: "CE", starter: false },
        { name: "Felipe Prado", position: "FB", starter: false }
      ]
    },
    "Universidad Católica": {
      short: "UC",
      city: "Santiago",
      colors: ["#60a5fa", "#f1f5f9"],
      logo: "assets/logos/uc.svg",
      roster: [
        { name: "Cristián Becerra", position: "PR-LH", starter: true },
        { name: "Felipe Ramírez", position: "HK", starter: true },
        { name: "Jorge Aguilera", position: "PR-TH", starter: true },
        { name: "Miguel Vera", position: "LK", starter: true },
        { name: "Andrés Donoso", position: "LK", starter: true },
        { name: "Pedro Marín", position: "FL", starter: true },
        { name: "Vicente Soto", position: "FL", starter: true },
        { name: "Ignacio Bustos", position: "N8", starter: true },
        { name: "Rodrigo Lazo", position: "SH", starter: true },
        { name: "Tomás Alarcón", position: "FH", starter: true },
        { name: "Álvaro Campos", position: "CE", starter: true },
        { name: "Sergio Sáenz", position: "CE", starter: true },
        { name: "Matías Loyola", position: "WG", starter: true },
        { name: "Diego Alegría", position: "WG", starter: true },
        { name: "Cristóbal Figueroa", position: "FB", starter: true },
        { name: "Julio Yáñez", position: "PR-LH", starter: false },
        { name: "Patricio Barrios", position: "PR-TH", starter: false, dual: true },
        { name: "Matías Oliva", position: "HK", starter: false },
        { name: "Germán Fuentes", position: "LK", starter: false },
        { name: "Mauricio Peña", position: "FL", starter: false },
        { name: "Federico Llanos", position: "SH", starter: false },
        { name: "Hugo Pizarro", position: "CE", starter: false },
        { name: "Gabriel Torres", position: "WG", starter: false }
      ]
    },
    "Stade Francais (Chile)": {
      short: "Stade",
      city: "Santiago",
      colors: ["#f472b6", "#1e3a8a"],
      logo: "assets/logos/stade.svg",
      roster: [
        { name: "Adrien Marchant", position: "PR-LH", starter: true },
        { name: "Louis Garnier", position: "HK", starter: true },
        { name: "Pierre Duhamel", position: "PR-TH", starter: true },
        { name: "Bastien Lefèvre", position: "LK", starter: true },
        { name: "Guillaume Roussel", position: "LK", starter: true },
        { name: "Etienne Dubois", position: "FL", starter: true },
        { name: "Matthieu Roche", position: "FL", starter: true },
        { name: "Cédric Lambert", position: "N8", starter: true },
        { name: "Julien Morel", position: "SH", starter: true },
        { name: "Théo Laurent", position: "FH", starter: true },
        { name: "Hugo Pruvost", position: "CE", starter: true },
        { name: "Maxime Jourdan", position: "CE", starter: true },
        { name: "Lucas Allende", position: "WG", starter: true },
        { name: "Tomás Marchant", position: "WG", starter: true },
        { name: "Nicolas Vidal", position: "FB", starter: true },
        { name: "Santiago Doussot", position: "PR-LH", starter: false },
        { name: "Jean Paul Riera", position: "PR-TH", starter: false, dual: true },
        { name: "Felipe Allard", position: "HK", starter: false },
        { name: "Maurice Labbé", position: "LK", starter: false },
        { name: "Clément Reyes", position: "FL", starter: false },
        { name: "Gaston Gauthier", position: "SH", starter: false },
        { name: "Antoine Méry", position: "CE", starter: false },
        { name: "Romain Cazenave", position: "WG", starter: false }
      ]
    },
    "PWCC": {
      short: "PWCC",
      city: "Santiago",
      colors: ["#9d174d", "#1f2937"],
      logo: "assets/logos/pwcc.svg",
      roster: [
        { name: "Hugo Fernández", position: "PR-LH", starter: true },
        { name: "Manuel Pérez", position: "HK", starter: true },
        { name: "Julio Contreras", position: "PR-TH", starter: true },
        { name: "Renato Salas", position: "LK", starter: true },
        { name: "Claudio Varela", position: "LK", starter: true },
        { name: "Simón Donatti", position: "FL", starter: true },
        { name: "Pablo Rey", position: "FL", starter: true },
        { name: "Enzo Marchant", position: "N8", starter: true },
        { name: "Franco Vegas", position: "SH", starter: true },
        { name: "Cristóbal Tapia", position: "FH", starter: true },
        { name: "Agustín Molina", position: "CE", starter: true },
        { name: "Lautaro Díaz", position: "CE", starter: true },
        { name: "Martín Cáceres", position: "WG", starter: true },
        { name: "Esteban Montt", position: "WG", starter: true },
        { name: "Bastián Riquelme", position: "FB", starter: true },
        { name: "Lucas Gaete", position: "PR-LH", starter: false },
        { name: "Matías Barrenechea", position: "PR-TH", starter: false, dual: true },
        { name: "Sebastián Fontaine", position: "HK", starter: false },
        { name: "Pablo Hidalgo", position: "LK", starter: false },
        { name: "Gabriel Santibáñez", position: "FL", starter: false },
        { name: "Ignacio Latorre", position: "SH", starter: false },
        { name: "Felipe Toro", position: "CE", starter: false },
        { name: "Diego Arancibia", position: "FB", starter: false }
      ]
    },
    "Old Reds": {
      short: "Old Reds",
      city: "Santiago",
      colors: ["#f87171", "#1f2937"],
      logo: "assets/logos/oldreds.svg",
      roster: [
        { name: "Camilo Leiva", position: "PR-LH", starter: true },
        { name: "Hernán Sepúlveda", position: "HK", starter: true },
        { name: "Álvaro Quiroz", position: "PR-TH", starter: true },
        { name: "Nicolás Cáceres", position: "LK", starter: true },
        { name: "Cristian Larraín", position: "LK", starter: true },
        { name: "Julián Sáez", position: "FL", starter: true },
        { name: "Rodrigo Montiel", position: "FL", starter: true },
        { name: "Matías Recabarren", position: "N8", starter: true },
        { name: "Felipe Urrutia", position: "SH", starter: true },
        { name: "Cristóbal Becker", position: "FH", starter: true },
        { name: "Tomás Águila", position: "CE", starter: true },
        { name: "Felipe Serrano", position: "CE", starter: true },
        { name: "Manuel Aravena", position: "WG", starter: true },
        { name: "Jorge Venegas", position: "WG", starter: true },
        { name: "Ignacio Palma", position: "FB", starter: true },
        { name: "Benjamín Carvallo", position: "PR-LH", starter: false },
        { name: "Ricardo Iturra", position: "PR-TH", starter: false, dual: true },
        { name: "Sebastián Baeza", position: "HK", starter: false },
        { name: "Pablo Cortés", position: "LK", starter: false },
        { name: "Leandro Silva", position: "FL", starter: false },
        { name: "Vicente Saavedra", position: "SH", starter: false },
        { name: "Esteban Prado", position: "CE", starter: false },
        { name: "Carlos Beltrán", position: "WG", starter: false }
      ]
    },
    "Viña Rugby": {
      short: "Viña",
      city: "Viña del Mar",
      colors: ["#34d399", "#0f172a"],
      logo: "assets/logos/vina.svg",
      roster: [
        { name: "Javier Mardones", position: "PR-LH", starter: true },
        { name: "Marco Carevic", position: "HK", starter: true },
        { name: "Bruno Olate", position: "PR-TH", starter: true },
        { name: "Cristián Gajardo", position: "LK", starter: true },
        { name: "Diego Larenas", position: "LK", starter: true },
        { name: "Axel Contreras", position: "FL", starter: true },
        { name: "Franco Olguín", position: "FL", starter: true },
        { name: "Vicente Moreira", position: "N8", starter: true },
        { name: "Tomás Labarca", position: "SH", starter: true },
        { name: "Sebastián Olivares", position: "FH", starter: true },
        { name: "Gaspar Iglesias", position: "CE", starter: true },
        { name: "Leonardo Román", position: "CE", starter: true },
        { name: "Samuel Ríos", position: "WG", starter: true },
        { name: "Matías Sepúlveda", position: "WG", starter: true },
        { name: "Gonzalo Arancibia", position: "FB", starter: true },
        { name: "Ignacio Cea", position: "PR-LH", starter: false },
        { name: "Pablo Rojas", position: "PR-TH", starter: false, dual: true },
        { name: "Cristóbal Herrera", position: "HK", starter: false },
        { name: "Felipe Escobar", position: "LK", starter: false },
        { name: "Santiago Molina", position: "FL", starter: false },
        { name: "Diego Riveros", position: "SH", starter: false },
        { name: "Mauricio Cancino", position: "CE", starter: false },
        { name: "Julio Zamora", position: "FB", starter: false }
      ]
    },
    "Los Troncos": {
      short: "Troncos",
      city: "Concepción",
      colors: ["#22c55e", "#14532d"],
      logo: "assets/logos/troncos.svg",
      roster: [
        { name: "Sebastián Troncoso", position: "PR-LH", starter: true },
        { name: "Rodrigo Mella", position: "HK", starter: true },
        { name: "Claudio Iturra", position: "PR-TH", starter: true },
        { name: "Víctor Salgado", position: "LK", starter: true },
        { name: "Germán Ortega", position: "LK", starter: true },
        { name: "Alexis Parra", position: "FL", starter: true },
        { name: "Matías Landeros", position: "FL", starter: true },
        { name: "César Contreras", position: "N8", starter: true },
        { name: "Héctor Ulloa", position: "SH", starter: true },
        { name: "Mauricio Pino", position: "FH", starter: true },
        { name: "Álvaro Prado", position: "CE", starter: true },
        { name: "Jonás Muñoz", position: "CE", starter: true },
        { name: "Cristóbal Orellana", position: "WG", starter: true },
        { name: "Felipe Cifuentes", position: "WG", starter: true },
        { name: "Gabriel Mena", position: "FB", starter: true },
        { name: "Jorge Alveal", position: "PR-LH", starter: false },
        { name: "Paulo Godoy", position: "PR-TH", starter: false, dual: true },
        { name: "Daniel Bravo", position: "HK", starter: false },
        { name: "Raúl Villalobos", position: "LK", starter: false },
        { name: "Ricardo Henríquez", position: "FL", starter: false },
        { name: "Leonardo Díaz", position: "SH", starter: false },
        { name: "Esteban Godoy", position: "CE", starter: false },
        { name: "Luis Sandoval", position: "WG", starter: false }
      ]
    }
  };

  const STORAGE_KEY = "RLM_STATE_V1";

  const Store = {
    league: null,
    teams: [],
    clubMeta: {},
    rosters: {},
    matches: [],
    standings: [],
    schedule: []
  };

  const Util = {
    uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    seedRandom(seed) {
      let h = 1779033703 ^ seed.length;
      for (let i = 0; i < seed.length; i++) {
        h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
      }
      return function () {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        h ^= h >>> 16;
        return (h >>> 0) / 4294967296;
      };
    },
    save() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            league: Store.league,
            teams: Store.teams,
            clubMeta: Store.clubMeta,
            rosters: Store.rosters,
            matches: Store.matches,
            standings: Store.standings,
            schedule: Store.schedule
          })
        );
      } catch (err) {
        console.error("No se pudo guardar el estado", err);
      }
    },
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return false;
        }
        const data = JSON.parse(raw);
        Object.assign(Store, data);
        Store.clubMeta = data.clubMeta || {};
        return true;
      } catch (err) {
        console.warn("Estado corrupto, se reinicia", err);
        return false;
      }
    },
    fmt(n) {
      return new Intl.NumberFormat("es-CL").format(n);
    },
    teamMeta(name) {
      return ensureClubMeta(name);
    },
    availableLibraryTeams() {
      return Object.keys(CLUB_LIBRARY).filter((name) => !Store.teams.includes(name));
    }
  };

  function ensureClubMeta(team) {
    if (!team) return { short: "", colors: ["#3b82f6", "#1d4ed8"], logo: DEFAULT_LOGO, city: "" };
    if (!Store.clubMeta[team]) {
      if (CLUB_LIBRARY[team]) {
        const { short, colors, logo, city } = CLUB_LIBRARY[team];
        Store.clubMeta[team] = {
          short: short || team,
          colors: Array.isArray(colors) ? colors.slice(0, 2) : ["#3b82f6", "#1d4ed8"],
          logo: logo || DEFAULT_LOGO,
          city: city || ""
        };
      } else {
        Store.clubMeta[team] = {
          short: team,
          colors: ["#3b82f6", "#1d4ed8"],
          logo: DEFAULT_LOGO,
          city: ""
        };
      }
    }
    return Store.clubMeta[team];
  }

  function ensureRoster(team) {
    if (!team) return Roster.buildSkeleton();
    if (!Store.rosters[team]) {
      const seed = CLUB_LIBRARY[team]?.roster;
      Store.rosters[team] = seed ? Roster.fromSeed(seed) : Roster.buildSkeleton();
    }
    return Store.rosters[team];
  }

  function addTeamToStore(teamName, { notify = true } = {}) {
    const clean = (teamName || "").trim();
    if (!clean || Store.teams.includes(clean)) {
      return false;
    }
    Store.teams.push(clean);
    ensureClubMeta(clean);
    ensureRoster(clean);
    resetCompetitionData(notify);
    Util.save();
    return true;
  }

  function buildMatchesFromSchedule(schedule) {
    const matches = [];
    schedule.forEach((round) => {
      round.forEach((pair) => {
        if (pair.bye) return;
        matches.push({
          id: Util.uuid(),
          round: pair.round,
          home: pair.home,
          away: pair.away,
          homeScore: pair.homeScore ?? "",
          awayScore: pair.awayScore ?? "",
          homeTries: pair.homeTries ?? "",
          awayTries: pair.awayTries ?? "",
          status: pair.status || "Pendiente"
        });
      });
    });
    return matches.sort((a, b) => a.round - b.round);
  }

  function resetCompetitionData(notify = false) {
    const hadData = Store.schedule.length || Store.matches.length;
    Store.schedule = [];
    Store.matches = [];
    Store.standings = [];
    if (notify && hadData) {
      UI.toast("Equipos actualizados. Genera nuevamente el fixture.", "info");
    }
  }

  function seedDemoState() {
    Store.league = {
      ...DEFAULT_LEAGUE,
      createdAt: Date.now()
    };
    Store.teams = [...DEFAULT_TEAMS];
    Store.clubMeta = {};
    Store.rosters = {};
    Store.teams.forEach((team) => {
      ensureClubMeta(team);
      ensureRoster(team);
    });
    Store.schedule = Scheduler.generateRoundRobin(Store.teams);
    Store.matches = buildMatchesFromSchedule(Store.schedule);
    preloadDemoResults();
    Store.standings = Scoring.calcStandings(Store.matches);
    Util.save();
  }

  function preloadDemoResults() {
    const samples = [
      { round: 1, home: "COBS", away: "Old Boys", homeScore: 28, awayScore: 18, homeTries: 4, awayTries: 2 },
      { round: 1, home: "Universidad Católica", away: "Stade Francais (Chile)", homeScore: 19, awayScore: 22, homeTries: 3, awayTries: 3 },
      { round: 1, home: "PWCC", away: "Old Reds", homeScore: 16, awayScore: 16, homeTries: 2, awayTries: 2 },
      { round: 2, home: "Old Boys", away: "Universidad Católica", homeScore: 24, awayScore: 20, homeTries: 3, awayTries: 2 }
    ];
    samples.forEach((sample) => {
      const match = Store.matches.find(
        (m) =>
          m.round === sample.round &&
          ((m.home === sample.home && m.away === sample.away) || (m.home === sample.away && m.away === sample.home))
      );
      if (!match) return;
      const isReversed = !(match.home === sample.home && match.away === sample.away);
      if (isReversed) {
        match.homeScore = sample.awayScore;
        match.awayScore = sample.homeScore;
        match.homeTries = sample.awayTries;
        match.awayTries = sample.homeTries;
      } else {
        match.homeScore = sample.homeScore;
        match.awayScore = sample.awayScore;
        match.homeTries = sample.homeTries;
        match.awayTries = sample.awayTries;
      }
      match.status = "Final";
    });
  }

  function teamChipHTML(team, extraClass = "") {
    if (!team) return "";
    const meta = ensureClubMeta(team);
    const logo = meta.logo || DEFAULT_LOGO;
    return `
      <span class="team-chip ${extraClass}">
        <span class="team-chip-logo" style="--team-primary:${meta.colors?.[0] || "#38bdf8"}; --team-secondary:${meta.colors?.[1] || "#1d4ed8"};">
          <img src="${logo}" alt="${team}">
        </span>
        <span class="team-chip-name">${team}</span>
      </span>
    `.trim();
  }

  const Roster = {
    positions: POSITION_ORDER,
    positionLabel(position) {
      if (!position) return "";
      return POSITION_LABELS[position] || position;
    },
    buildSkeleton() {
      const skeleton = [];
      const starters = [
        "PR-LH",
        "HK",
        "PR-TH",
        "LK",
        "LK",
        "FL",
        "FL",
        "N8",
        "SH",
        "FH",
        "CE",
        "CE",
        "WG",
        "WG",
        "FB"
      ];
      starters.forEach((pos, idx) => {
        skeleton.push({
          id: Util.uuid(),
          name: "",
          position: pos,
          starter: true,
          dual: false,
          slot: idx + 1
        });
      });
      for (let i = 16; i <= 23; i++) {
        skeleton.push({
          id: Util.uuid(),
          name: "",
          position: "",
          starter: false,
          dual: false,
          slot: i
        });
      }
      return skeleton;
    },
    fromSeed(seed) {
      if (!Array.isArray(seed) || !seed.length) {
        return Roster.buildSkeleton();
      }
      return seed.map((player, idx) => ({
        id: Util.uuid(),
        name: player.name || "",
        position: player.position || (player.starter ? Roster.positions[idx] || "" : ""),
        starter: typeof player.starter === "boolean" ? player.starter : idx < 15,
        dual: !!player.dual,
        slot: idx + 1
      }));
    },
    validate(roster) {
      const errors = [];
      if (!Array.isArray(roster) || roster.length !== 23) {
        errors.push("C3: la planilla debe tener exactamente 23 jugadores.");
      }
      const starters = roster.filter((p) => p.starter);
      const bench = roster.filter((p) => !p.starter);
      const starterPositions = starters.map((p) => p.position);
      const hasLH = starterPositions.includes("PR-LH");
      const hasHK = starterPositions.includes("HK");
      const hasTH = starterPositions.includes("PR-TH");
      if (!hasLH || !hasHK || !hasTH) {
        errors.push("C1: la primera línea titular (pilares y hooker) debe estar completa.");
      }
      const benchProps = bench.filter((p) => p.position === "PR-LH" || p.position === "PR-TH");
      const benchHK = bench.filter((p) => p.position === "HK");
      const coversLH = benchProps.some((p) => p.position === "PR-LH" || p.dual);
      const coversTH = benchProps.some((p) => p.position === "PR-TH" || p.dual);
      if (benchProps.length < 2 || benchHK.length < 1 || !coversLH || !coversTH) {
        errors.push("C2: la banca debe incluir al menos 2 pilares (LH y TH) y 1 hooker.");
      }
      return { valido: errors.length === 0, errores: errors };
    }
  };

  const Scheduler = {
    generateRoundRobin(teams) {
      const list = teams.slice();
      const n = list.length;
      if (n < 2) {
        return [];
      }
      const odd = n % 2 !== 0;
      if (odd) {
        list.push("BYE");
      }
      const rounds = [];
      const totalRounds = list.length - 1;
      const half = list.length / 2;
      const fixed = list[0];
      let rotating = list.slice(1);
      for (let r = 0; r < totalRounds; r++) {
        const round = [];
        const pairs = [fixed].concat(rotating);
        for (let i = 0; i < half; i++) {
          const home = pairs[i];
          const away = pairs[pairs.length - 1 - i];
          if (home === "BYE" || away === "BYE") {
            round.push({ round: r + 1, home, away, bye: true });
          } else {
            round.push({ round: r + 1, home, away, bye: false });
          }
        }
        rounds.push(round);
        rotating = rotate(rotating);
      }
      return rounds;

      function rotate(arr) {
        return [arr[arr.length - 1]].concat(arr.slice(0, arr.length - 1));
      }
    }
  };

  const Scoring = {
    scoreMatch(match) {
      if (!match || match.status !== "Final") {
        return null;
      }
      const homeScore = Number(match.homeScore) || 0;
      const awayScore = Number(match.awayScore) || 0;
      const homeTries = Number(match.homeTries) || 0;
      const awayTries = Number(match.awayTries) || 0;
      const diff = homeScore - awayScore;
      const homeWin = diff > 0;
      const awayWin = diff < 0;
      const draw = diff === 0;

      let homeBase = 0;
      let awayBase = 0;
      if (homeWin) {
        homeBase = 4;
      } else if (awayWin) {
        awayBase = 4;
      } else {
        homeBase = 2;
        awayBase = 2;
      }
      let homeBonus = homeTries >= 4 ? 1 : 0;
      let awayBonus = awayTries >= 4 ? 1 : 0;
      const margin = Math.abs(diff);
      if (!draw) {
        if (awayWin && margin <= 7) {
          homeBonus += 1;
        }
        if (homeWin && margin <= 7) {
          awayBonus += 1;
        }
      }
      return {
        home: {
          points: homeBase + homeBonus,
          base: homeBase,
          bonus: homeBonus,
          tries: homeTries,
          gf: homeScore,
          ga: awayScore,
          win: homeWin,
          draw,
          loss: awayWin
        },
        away: {
          points: awayBase + awayBonus,
          base: awayBase,
          bonus: awayBonus,
          tries: awayTries,
          gf: awayScore,
          ga: homeScore,
          win: awayWin,
          draw,
          loss: homeWin
        }
      };
    },
    calcStandings(matches) {
      const teams = Store.teams;
      const table = new Map();
      teams.forEach((team) => {
        table.set(team, {
          name: team,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          gf: 0,
          gc: 0,
          diff: 0,
          tries: 0,
          bonus: 0,
          points: 0,
          fairPlay: 0
        });
      });
      matches.forEach((match) => {
        if (match.bye || match.status !== "Final") {
          return;
        }
        const score = Scoring.scoreMatch(match);
        if (!score) return;
        const homeRow = table.get(match.home);
        const awayRow = table.get(match.away);
        if (!homeRow || !awayRow) return;
        updateRow(homeRow, score.home);
        updateRow(awayRow, score.away);
      });
      const standings = Array.from(table.values());
      standings.forEach((row) => {
        row.diff = row.gf - row.gc;
      });
      const rng = Util.seedRandom("rlm");
      const lots = {};
      standings.sort((a, b) => Scoring.tieBreak(a, b, { matches, rng, lots }));
      return standings;

      function updateRow(row, side) {
        row.played += 1;
        row.wins += side.win ? 1 : 0;
        row.draws += side.draw ? 1 : 0;
        row.losses += side.loss ? 1 : 0;
        row.gf += side.gf;
        row.gc += side.ga;
        row.tries += side.tries;
        row.bonus += side.bonus;
        row.points += side.points;
      }
    },
    tieBreak(a, b, ctx) {
      if (b.points !== a.points) return b.points - a.points;
      if (b.wins !== a.wins) return b.wins - a.wins;
      if (b.diff !== a.diff) return b.diff - a.diff;
      if (b.tries !== a.tries) return b.tries - a.tries;
      const h2h = Scoring.headToHead([a.name, b.name], ctx.matches);
      if (h2h) {
        const ha = h2h[a.name];
        const hb = h2h[b.name];
        if (hb.points !== ha.points) return hb.points - ha.points;
        if (hb.diff !== ha.diff) return hb.diff - ha.diff;
        if (hb.tries !== ha.tries) return hb.tries - ha.tries;
      }
      if ((a.fairPlay || 0) !== (b.fairPlay || 0)) {
        return (a.fairPlay || 0) - (b.fairPlay || 0);
      }
      ctx.lots[a.name] = ctx.lots[a.name] ?? ctx.rng();
      ctx.lots[b.name] = ctx.lots[b.name] ?? ctx.rng();
      return ctx.lots[b.name] - ctx.lots[a.name];
    },
    headToHead(subset, matches) {
      if (!Array.isArray(subset) || subset.length < 2) return null;
      const set = new Set(subset);
      const table = {};
      subset.forEach((team) => {
        table[team] = { points: 0, diff: 0, tries: 0 };
      });
      matches.forEach((match) => {
        if (match.status !== "Final") return;
        if (!set.has(match.home) || !set.has(match.away)) return;
        const score = Scoring.scoreMatch(match);
        if (!score) return;
        table[match.home].points += score.home.points;
        table[match.home].diff += score.home.gf - score.home.ga;
        table[match.home].tries += score.home.tries;
        table[match.away].points += score.away.points;
        table[match.away].diff += score.away.gf - score.away.ga;
        table[match.away].tries += score.away.tries;
      });
      return table;
    }
  };

  const UI = {
    cache: new Map(),
    toastTimer: null,
    toast(msg, type = "info") {
      const toast = document.getElementById("toast");
      if (!toast) return;
      toast.textContent = msg;
      toast.className = `toast show ${type}`;
      clearTimeout(UI.toastTimer);
      UI.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 3200);
    },
    async mount(viewId) {
      const root = document.getElementById("view-root");
      if (!root) return;
      let html = UI.cache.get(viewId);
      if (!html) {
        const res = await fetch(`views/${viewId}.html`);
        html = await res.text();
        UI.cache.set(viewId, html);
      }
      root.innerHTML = html;
      const view = Views[viewId];
      if (view && typeof view.init === "function") {
        view.init(root);
      }
      root.focus();
    }
  };

  const Views = {
    home: {
      init(root) {
        const leagueNameEl = root.querySelector("#homeLeagueName");
        const leagueMetaEl = root.querySelector("#homeLeagueMeta");
        const metricsEl = root.querySelector("#homeMetrics");
        const upcomingEl = root.querySelector("#homeUpcoming");
        const standingsBody = root.querySelector("#homeStandingsBody");
        const teamsGrid = root.querySelector("#homeTeamsGrid");

        const league = Store.league || DEFAULT_LEAGUE;
        if (leagueNameEl) {
          leagueNameEl.textContent = league.name || "Liga sin nombre";
        }
        if (leagueMetaEl) {
          const createdAt = league.createdAt ? new Date(league.createdAt).toLocaleString("es-CL") : null;
          const meta = [league.category || DEFAULT_CATEGORY, `${Store.teams.length} equipos`];
          if (createdAt) {
            meta.push(`Actualizado ${createdAt}`);
          }
          leagueMetaEl.textContent = meta.join(" · ");
        }

        if (metricsEl) {
          const totalMatches = Store.matches.length;
          const finals = Store.matches.filter((m) => m.status === "Final").length;
          const pending = totalMatches - finals;
          const totalTries = Store.matches.reduce(
            (sum, match) => sum + (Number(match.homeTries) || 0) + (Number(match.awayTries) || 0),
            0
          );
          const metrics = [
            {
              label: "Equipos",
              value: Store.teams.length,
              detail: Store.teams.length ? Store.teams.join(", ") : "Agrega clubes desde Liga"
            },
            {
              label: "Fixture",
              value: Store.schedule.length ? `${Store.schedule.length} jornadas` : "Sin generar",
              detail: pending > 0
                ? `${pending} partidos por disputar`
                : totalMatches
                ? "Fixture completado"
                : "Genera el calendario"
            },
            {
              label: "Resultados finalizados",
              value: finals,
              detail: finals
                ? `${Math.round((finals / (totalMatches || 1)) * 100)}% del fixture`
                : "Carga resultados en la pestaña Resultados"
            },
            {
              label: "Tries totales",
              value: totalTries,
              detail: totalTries ? `${totalTries} tries registrados` : "Se actualizará con los resultados"
            }
          ];
          metricsEl.innerHTML = "";
          metrics.forEach((metric) => {
            const div = document.createElement("div");
            div.className = "home-metric";
            div.innerHTML = `
              <p class="metric-label">${metric.label}</p>
              <p class="metric-value">${metric.value}</p>
              <p class="muted">${metric.detail}</p>
            `;
            metricsEl.appendChild(div);
          });
        }

        if (upcomingEl) {
          upcomingEl.innerHTML = "";
          if (!Store.matches.length) {
            upcomingEl.innerHTML = `<li class="muted">Genera el fixture para ver partidos programados.</li>`;
          } else {
            const upcoming = Store.matches
              .filter((m) => m.status !== "Final")
              .sort((a, b) => a.round - b.round)
              .slice(0, 4);
            if (!upcoming.length) {
              upcomingEl.innerHTML = `<li class="muted">Todos los partidos tienen resultado registrado.</li>`;
            } else {
              upcoming.forEach((match) => {
                const li = document.createElement("li");
                li.className = "match-list-item";
                li.innerHTML = `
                  <span class="match-round">J${match.round}</span>
                  ${teamChipHTML(match.home, "compact")}
                  <span class="muted">vs</span>
                  ${teamChipHTML(match.away, "compact")}
                `;
                upcomingEl.appendChild(li);
              });
            }
          }
        }

        if (standingsBody) {
          standingsBody.innerHTML = "";
          if (!Store.standings.length) {
            standingsBody.innerHTML = `<tr><td colspan="6" class="empty">Genera resultados para ver la tabla.</td></tr>`;
          } else {
            Store.standings.slice(0, 4).forEach((row, idx) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${teamChipHTML(row.name, "compact")}</td>
                <td>${row.played}</td>
                <td>${row.wins}</td>
                <td>${row.points}</td>
                <td>${row.diff}</td>
              `;
              standingsBody.appendChild(tr);
            });
          }
        }

        if (teamsGrid) {
          teamsGrid.innerHTML = "";
          if (!Store.teams.length) {
            teamsGrid.innerHTML = `<p class="muted">No hay equipos cargados aún.</p>`;
          } else {
            Store.teams.forEach((team) => {
              const meta = ensureClubMeta(team);
              const roster = ensureRoster(team);
              const filled = roster.filter((p) => p.name).length;
              const card = document.createElement("div");
              card.className = "team-card";
              card.innerHTML = `
                ${teamChipHTML(team, "large")}
                <p class="muted">${meta.city ? `${meta.city} · ` : ""}${filled}/23 jugadores</p>
              `;
              teamsGrid.appendChild(card);
            });
          }
        }
      }
    },
    liga: {
      init(root) {
        const form = root.querySelector("#leagueForm");
        if (!form) return;
        const nameInput = form.querySelector("[name=leagueName]");
        const categorySelect = form.querySelector("[name=leagueCategory]");
        const librarySelect = root.querySelector("#teamLibrarySelect");
        const addLibraryBtn = root.querySelector("#addTeamFromLibrary");
        const addManualBtn = root.querySelector("#addTeamBtn");
        const manualInput = root.querySelector("#newTeamInput");
        const teamList = root.querySelector("#teamsUl");
        const teamCount = root.querySelector("#teamCount");

        if (nameInput) {
          nameInput.value = Store.league?.name || DEFAULT_LEAGUE.name;
        }
        if (categorySelect) {
          categorySelect.innerHTML = CATEGORIES.map((cat) => `<option value="${cat}">${cat}</option>`).join("");
          categorySelect.value = Store.league?.category || DEFAULT_CATEGORY;
        }

        renderTeams();
        renderTeamCount();
        renderLibraryOptions();

        addLibraryBtn?.addEventListener("click", () => {
          const value = librarySelect?.value;
          if (!value) return;
          addTeam(value);
        });

        addManualBtn?.addEventListener("click", () => {
          const value = manualInput?.value.trim();
          if (!value) return;
          addTeam(value);
          if (manualInput) manualInput.value = "";
        });

        form.addEventListener("submit", (event) => event.preventDefault());

        root.querySelector("#saveLeague")?.addEventListener("click", () => {
          const name = nameInput?.value.trim();
          const category = categorySelect?.value || DEFAULT_CATEGORY;
          if (!name) {
            UI.toast("La liga necesita un nombre", "error");
            return;
          }
          if (Store.teams.length < 2) {
            UI.toast("Debes contar con al menos 2 equipos", "warn");
            return;
          }
          Store.league = {
            ...(Store.league || DEFAULT_LEAGUE),
            name,
            category,
            createdAt: Date.now()
          };
          Util.save();
          UI.toast("Liga actualizada", "success");
        });

        function addTeam(teamName) {
          const clean = teamName.trim();
          if (!clean) return;
          if (Store.teams.includes(clean)) {
            UI.toast("El equipo ya existe en la liga", "warn");
            return;
          }
          addTeamToStore(clean);
          UI.toast(`Equipo ${clean} añadido a la liga`, "success");
          renderTeams();
          renderTeamCount();
          renderLibraryOptions();
        }

        function renderLibraryOptions() {
          if (!librarySelect) return;
          const options = Util.availableLibraryTeams();
          if (options.length) {
            librarySelect.innerHTML =
              `<option value="">Selecciona un club...</option>` +
              options.map((team) => `<option value="${team}">${team}</option>`).join("");
            librarySelect.disabled = false;
            if (addLibraryBtn) addLibraryBtn.disabled = false;
          } else {
            librarySelect.innerHTML = `<option value="">Sin clubes disponibles</option>`;
            librarySelect.disabled = true;
            if (addLibraryBtn) addLibraryBtn.disabled = true;
          }
        }

        function renderTeams() {
          if (!teamList) return;
          teamList.innerHTML = "";
          if (!Store.teams.length) {
            teamList.innerHTML = `<li class="muted">Agrega equipos para comenzar.</li>`;
            return;
          }
          Store.teams.forEach((team) => {
            const li = document.createElement("li");
            const roster = ensureRoster(team);
            const filled = roster.filter((p) => p.name).length;
            li.innerHTML = `
              <div class="team-row">
                ${teamChipHTML(team, "compact")}
                <span class="muted small">${filled}/23 jugadores</span>
              </div>
              <button type="button" class="btn outline small" data-remove="${team}">Quitar</button>
            `;
            teamList.appendChild(li);
            li.querySelector("[data-remove]")?.addEventListener("click", () => {
              Store.teams = Store.teams.filter((t) => t !== team);
              delete Store.rosters[team];
              delete Store.clubMeta[team];
              resetCompetitionData(true);
              renderTeams();
              renderTeamCount();
              renderLibraryOptions();
              Util.save();
            });
          });
        }

        function renderTeamCount() {
          if (teamCount) {
            teamCount.textContent = `${Store.teams.length} equipos`;
          }
        }
      }
    },
    rosters: {
      init(root) {
        const select = root.querySelector("#rosterTeamSelect");
        const profile = root.querySelector("#rosterTeamProfile");
        const librarySelect = root.querySelector("#rosterLibrarySelect");
        const addLibraryBtn = root.querySelector("#rosterAddFromLibrary");
        const newTeamInput = root.querySelector("#rosterNewTeam");
        const createTeamBtn = root.querySelector("#rosterCreateTeam");
        const tbody = root.querySelector("#rosterTable tbody");
        const checklist = root.querySelector("#rosterChecklist");
        const saveBtn = root.querySelector("#saveRoster");
        let activeTeam = "";

        refreshTeamOptions();
        renderLibraryOptions();

        select?.addEventListener("change", () => {
          renderRoster(select.value);
        });

        addLibraryBtn?.addEventListener("click", () => {
          const value = librarySelect?.value;
          if (!value) return;
          if (Store.teams.includes(value)) {
            UI.toast("El club ya está en la liga", "warn");
            return;
          }
          addTeamToStore(value);
          UI.toast(`Equipo ${value} añadido con roster demo`, "success");
          refreshTeamOptions(value);
          renderLibraryOptions();
        });

        createTeamBtn?.addEventListener("click", () => {
          const value = newTeamInput?.value.trim();
          if (!value) return;
          if (Store.teams.includes(value)) {
            UI.toast("El equipo ya existe", "warn");
            return;
          }
          addTeamToStore(value);
          UI.toast(`Equipo ${value} creado`, "success");
          if (newTeamInput) newTeamInput.value = "";
          refreshTeamOptions(value);
          renderLibraryOptions();
        });

        tbody?.addEventListener("input", handleLiveValidation);
        tbody?.addEventListener("change", handleLiveValidation);

        saveBtn?.addEventListener("click", () => {
          if (!activeTeam) {
            UI.toast("Crea o selecciona un equipo primero", "warn");
            return;
          }
          const roster = collectRoster();
          const validation = Roster.validate(roster);
          renderChecklist(validation);
          if (!validation.valido) {
            UI.toast(validation.errores.join(" "), "error");
            return;
          }
          Store.rosters[activeTeam] = roster;
          Util.save();
          UI.toast("Roster guardado", "success");
        });

        function refreshTeamOptions(selectedTeam) {
          if (!select) return;
          select.innerHTML = Store.teams
            .map((team) => `<option value="${team}">${team}</option>`)
            .join("");
          if (!Store.teams.length) {
            select.disabled = true;
            renderRoster(null);
          } else {
            select.disabled = false;
            const team = selectedTeam && Store.teams.includes(selectedTeam)
              ? selectedTeam
              : select.value && Store.teams.includes(select.value)
              ? select.value
              : Store.teams[0];
            select.value = team;
            renderRoster(team);
          }
        }

        function renderRoster(team) {
          activeTeam = team || "";
          if (!team) {
            if (tbody) {
              tbody.innerHTML = `<tr><td colspan="5" class="empty">Configura equipos en la pestaña Liga.</td></tr>`;
            }
            renderChecklist({ valido: false, errores: ["C1", "C2", "C3"] });
            updateTeamProfile(null);
            return;
          }
          const roster = ensureRoster(team).map((player) => ({ ...player }));
          if (tbody) {
            tbody.innerHTML = "";
            roster.forEach((player, idx) => {
              const tr = document.createElement("tr");
              tr.dataset.playerId = player.id || Util.uuid();
              tr.innerHTML = `
                <td>${idx + 1}</td>
                <td><input type="text" value="${player.name || ""}" data-field="name" placeholder="Nombre del jugador"></td>
                <td>${positionSelect(player.position)}</td>
                <td class="center"><input type="checkbox" data-field="dual" ${player.dual ? "checked" : ""}></td>
                <td><span class="tag">${idx < 15 ? "Titular" : "Banca"}</span></td>
              `;
              tbody.appendChild(tr);
            });
          }
          renderChecklist(Roster.validate(roster));
          updateTeamProfile(team);
        }

        function collectRoster() {
          if (!tbody) return [];
          const rows = Array.from(tbody.querySelectorAll("tr"));
          return rows.map((tr, index) => {
            const starter = index < 15;
            const name = tr.querySelector('[data-field="name"]').value.trim();
            const position = tr.querySelector('[data-field="position"]').value;
            const dual = tr.querySelector('[data-field="dual"]').checked;
            const id = tr.dataset.playerId || Util.uuid();
            return { id, name, position, dual, starter, slot: index + 1 };
          });
        }

        function handleLiveValidation() {
          if (!activeTeam) return;
          const roster = collectRoster();
          renderChecklist(Roster.validate(roster));
        }

        function renderChecklist(validation) {
          if (!checklist) return;
          checklist.innerHTML = "";
          const list = document.createElement("ul");
          list.className = "checklist";
          const items = [
            { key: "C1", text: "C1 Primera línea titular completa" },
            { key: "C2", text: "C2 Banca con 2 props y 1 hooker" },
            { key: "C3", text: "C3 Planilla con 23 jugadores" }
          ];
          items.forEach((item) => {
            const li = document.createElement("li");
            const ok = validation.valido && !validation.errores.some((err) => err.startsWith(item.key));
            li.innerHTML = `<span class="${ok ? "ok" : "err"}">${ok ? "✔" : "✖"}</span> ${item.text}`;
            list.appendChild(li);
          });
          checklist.appendChild(list);
        }

        function updateTeamProfile(team) {
          if (!profile) return;
          if (!team) {
            profile.innerHTML = "";
            return;
          }
          const meta = ensureClubMeta(team);
          profile.innerHTML = `
            ${teamChipHTML(team, "large")}
            <p class="muted">${meta.city || "Chile"} · ${Store.league?.category || DEFAULT_CATEGORY}</p>
          `;
        }

        function renderLibraryOptions() {
          if (!librarySelect) return;
          const options = Util.availableLibraryTeams();
          if (options.length) {
            librarySelect.innerHTML =
              `<option value="">Selecciona club...</option>` +
              options.map((team) => `<option value="${team}">${team}</option>`).join("");
            librarySelect.disabled = false;
            if (addLibraryBtn) addLibraryBtn.disabled = false;
          } else {
            librarySelect.innerHTML = `<option value="">Sin más clubes demo</option>`;
            librarySelect.disabled = true;
            if (addLibraryBtn) addLibraryBtn.disabled = true;
          }
        }

        function positionSelect(value) {
          const options = ["", ...Roster.positions]
            .map((pos) => {
              const label = pos ? Roster.positionLabel(pos) : "--";
              return `<option value="${pos}" ${pos === value ? "selected" : ""}>${label}</option>`;
            })
            .join("");
          return `<select data-field="position">${options}</select>`;
        }
      }
    },
    fixture: {
      init(root) {
        const meta = root.querySelector("#fixtureMeta");
        const roundsDiv = root.querySelector("#fixtureRounds");
        const btn = root.querySelector("#generateFixture");
        btn.addEventListener("click", () => {
          if (Store.teams.length < 2) {
            UI.toast("Necesitas al menos 2 equipos", "warn");
            return;
          }
          const rounds = Scheduler.generateRoundRobin(Store.teams);
          Store.schedule = rounds;
          Store.matches = buildMatchesFromSchedule(rounds);
          Store.standings = Scoring.calcStandings(Store.matches);
          Util.save();
          render(rounds);
          UI.toast("Fixture generado", "success");
        });
        render(Store.schedule);

        function render(rounds) {
          roundsDiv.innerHTML = "";
          if (!rounds || !rounds.length) {
            roundsDiv.innerHTML = `<p class="muted">Genera el fixture para ver las jornadas.</p>`;
            if (meta) meta.textContent = "Sin fixture";
            return;
          }
          const teams = Store.teams.length;
          const odd = teams % 2 !== 0;
          const totalMatches = Store.matches.length;
          if (meta) {
            meta.textContent = `${rounds.length} jornadas · ${totalMatches} partidos · ${teams} equipos${odd ? " (impar: BYE)" : ""}`;
          }
          rounds.forEach((round) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h3>Jornada ${round[0]?.round || ""}</h3>`;
            const list = document.createElement("ul");
            list.className = "fixture-list";
            round.forEach((match) => {
              const li = document.createElement("li");
              if (match.bye) {
                const team = match.home === "BYE" ? match.away : match.home;
                li.innerHTML = `<span class="tag">BYE</span> ${teamChipHTML(team, "compact")}`;
              } else {
                const stored = Store.matches.find(
                  (m) => m.round === match.round && m.home === match.home && m.away === match.away
                );
                const status = stored?.status === "Final" ? "Final" : "Pendiente";
                li.innerHTML = `
                  <div class="fixture-row">
                    <span class="fixture-round">J${match.round}</span>
                    ${teamChipHTML(match.home, "compact")}
                    <span class="muted">vs</span>
                    ${teamChipHTML(match.away, "compact")}
                    <span class="tag">${status}</span>
                  </div>
                `;
              }
              list.appendChild(li);
            });
            card.appendChild(list);
            roundsDiv.appendChild(card);
          });
        }
      }
    },
    resultados: {
      init(root) {
        const tbody = root.querySelector("#resultsTable tbody");
        render();

        function render() {
          tbody.innerHTML = "";
          if (!Store.matches.length) {
            tbody.innerHTML = `<tr><td colspan="9" class="empty">Genera el fixture para cargar resultados.</td></tr>`;
            return;
          }
          [...Store.matches]
            .sort((a, b) => a.round - b.round)
            .forEach((match) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${match.round}</td>
                <td>${teamChipHTML(match.home, "compact")}</td>
                <td><input type="number" min="0" value="${match.homeScore || ""}" data-field="homeScore"></td>
                <td><input type="number" min="0" value="${match.homeTries || ""}" data-field="homeTries"></td>
                <td>${teamChipHTML(match.away, "compact")}</td>
                <td><input type="number" min="0" value="${match.awayScore || ""}" data-field="awayScore"></td>
                <td><input type="number" min="0" value="${match.awayTries || ""}" data-field="awayTries"></td>
                <td>
                  <select data-field="status">
                    <option value="Pendiente" ${match.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="Final" ${match.status === "Final" ? "selected" : ""}>Final</option>
                  </select>
                </td>
                <td><button class="btn ghost small" data-save>Guardar</button></td>
              `;
              const inputs = tr.querySelectorAll("input, select");
              inputs.forEach((input) => {
                input.addEventListener("change", () => {
                  applyChanges(match, tr);
                });
              });
              tr.querySelector("[data-save]").addEventListener("click", () => {
                applyChanges(match, tr, true);
              });
              tbody.appendChild(tr);
            });
        }

        function applyChanges(match, tr, notify = false) {
          match.homeScore = tr.querySelector('[data-field="homeScore"]').value;
          match.awayScore = tr.querySelector('[data-field="awayScore"]').value;
          match.homeTries = tr.querySelector('[data-field="homeTries"]').value;
          match.awayTries = tr.querySelector('[data-field="awayTries"]').value;
          match.status = tr.querySelector('[data-field="status"]').value;
          Store.standings = Scoring.calcStandings(Store.matches);
          Util.save();
          if (notify) {
            UI.toast("Resultado guardado", "success");
          }
        }
      }
    },
    tabla: {
      init(root) {
        const tbody = root.querySelector("#standingsBody");
        render();

        function render() {
          tbody.innerHTML = "";
          if (!Store.standings.length) {
            tbody.innerHTML = `<tr><td colspan="12" class="empty">Sin datos aún.</td></tr>`;
            return;
          }
          Store.standings.forEach((row, idx) => {
            const tr = document.createElement("tr");
            if (idx === 0) tr.classList.add("leader");
            tr.title = "Orden: Pts > Victorias > Dif. de tantos > Tries > Head-to-head > Fair play > Sorteo";
            tr.innerHTML = `
              <td>${idx + 1}</td>
              <td>${teamChipHTML(row.name, "compact")}</td>
              <td>${row.played}</td>
              <td>${row.wins}</td>
              <td>${row.draws}</td>
              <td>${row.losses}</td>
              <td>${row.gf}</td>
              <td>${row.gc}</td>
              <td>${row.diff}</td>
              <td>${row.tries}</td>
              <td>${row.bonus}</td>
              <td>${row.points}</td>
            `;
            tbody.appendChild(tr);
          });
        }
      }
    },
    public: {
      init(root) {
        const intro = root.querySelector("#publicIntro");
        const fixtureDiv = root.querySelector("#publicFixture");
        const standingsBody = root.querySelector("#publicStandings");
        const highlights = root.querySelector("#publicHighlights");

        if (intro) {
          const updated = Store.matches.some((m) => m.status === "Final")
            ? "Resultados al día"
            : "Fixture en progreso";
          intro.innerHTML = `
            <span>${Store.league?.name || "Liga sin nombre"}</span>
            <span>${Store.league?.category || DEFAULT_CATEGORY}</span>
            <span>${Store.teams.length} equipos</span>
            <span>${updated}</span>
          `;
        }

        renderFixture();
        renderStandings();
        renderHighlights();

        function renderFixture() {
          if (!fixtureDiv) return;
          fixtureDiv.innerHTML = "";
          if (!Store.schedule.length) {
            fixtureDiv.innerHTML = `<p class="muted">Fixture pendiente.</p>`;
            return;
          }
          Store.schedule.forEach((round) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h3>Jornada ${round[0]?.round || ""}</h3>`;
            const list = document.createElement("ul");
            list.className = "fixture-list compact";
            round.forEach((match) => {
              const li = document.createElement("li");
              if (match.bye) {
                const team = match.home === "BYE" ? match.away : match.home;
                li.innerHTML = `<span class="tag">BYE</span> ${teamChipHTML(team, "compact")}`;
              } else {
                const stored = Store.matches.find(
                  (m) => m.round === match.round && m.home === match.home && m.away === match.away
                );
                const status = stored?.status === "Final" ? "Final" : "Pendiente";
                li.innerHTML = `
                  <div class="fixture-row">
                    ${teamChipHTML(match.home, "compact")}
                    <span class="muted">vs</span>
                    ${teamChipHTML(match.away, "compact")}
                    <span class="tag">${status}</span>
                  </div>
                `;
              }
              list.appendChild(li);
            });
            card.appendChild(list);
            fixtureDiv.appendChild(card);
          });
        }

        function renderStandings() {
          if (!standingsBody) return;
          standingsBody.innerHTML = "";
          if (!Store.standings.length) {
            standingsBody.innerHTML = `<tr><td colspan="7" class="empty">Sin tabla disponible.</td></tr>`;
            return;
          }
          Store.standings.forEach((row, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${idx + 1}</td>
              <td>${teamChipHTML(row.name, "compact")}</td>
              <td>${row.played}</td>
              <td>${row.wins}</td>
              <td>${row.draws}</td>
              <td>${row.losses}</td>
              <td>${row.points}</td>
            `;
            standingsBody.appendChild(tr);
          });
        }

        function renderHighlights() {
          if (!highlights) return;
          highlights.innerHTML = "";
          const finals = Store.matches
            .filter((m) => m.status === "Final")
            .sort((a, b) => b.round - a.round)
            .slice(0, 3);
          if (!finals.length) {
            highlights.innerHTML = `<p class="muted">Aún no hay resultados finalizados para mostrar.</p>`;
            return;
          }
          finals.forEach((match) => {
            const card = document.createElement("div");
            card.className = "public-result";
            card.innerHTML = `
              <div class="public-result-row">
                ${teamChipHTML(match.home, "compact")}
                <strong>${match.homeScore || 0}</strong>
              </div>
              <div class="public-result-row">
                ${teamChipHTML(match.away, "compact")}
                <strong>${match.awayScore || 0}</strong>
              </div>
              <p class="muted">J${match.round} · Tries ${match.homeTries || 0}-${match.awayTries || 0}</p>
            `;
            highlights.appendChild(card);
          });
        }
      }
    }
  };

  function init() {
    if (!Util.load()) {
      seedDemoState();
    } else {
      Store.league = Store.league || { ...DEFAULT_LEAGUE };
      Store.league.category = Store.league.category || DEFAULT_CATEGORY;
      Store.teams = Store.teams || [];
      Store.clubMeta = Store.clubMeta || {};
      Store.rosters = Store.rosters || {};
      Store.schedule = Store.schedule || [];
      Store.matches = Store.matches || [];
      Store.teams.forEach((team) => {
        ensureClubMeta(team);
        ensureRoster(team);
      });
      Store.matches.forEach((match) => {
        match.status = match.status || "Pendiente";
      });
      Store.standings = Scoring.calcStandings(Store.matches);
      Util.save();
    }
    bindGlobalActions();
    Router.register("/", () => UI.mount("home"));
    Router.register("/liga", () => UI.mount("liga"));
    Router.register("/rosters", () => UI.mount("rosters"));
    Router.register("/fixture", () => UI.mount("fixture"));
    Router.register("/resultados", () => UI.mount("resultados"));
    Router.register("/tabla", () => UI.mount("tabla"));
    Router.register("/public", () => UI.mount("public"));
    Router.init();
  }

  function bindGlobalActions() {
    const resetBtn = document.getElementById("resetDemo");
    const themeBtn = document.getElementById("themeToggle");
    resetBtn?.addEventListener("click", () => {
      if (!confirm("¿Reiniciar la demo? Se perderán los datos.")) return;
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    });
    themeBtn?.addEventListener("click", () => {
      document.body.classList.toggle("dark-alt");
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
