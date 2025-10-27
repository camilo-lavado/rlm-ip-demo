(function () {
  const DEFAULT_TEAMS = [
    "COBS",
    "Old Boys",
    "Universidad Católica",
    "Stade Francais (Chile)",
    "PWCC",
    "Old Reds"
  ];

  const DEFAULT_LEAGUE = {
    name: "Liga Metropolitana",
    category: "Adulto XV",
    createdAt: null
  };

  const STORAGE_KEY = "RLM_STATE_V1";

  const Store = {
    league: null,
    teams: [],
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
        return true;
      } catch (err) {
        console.warn("Estado corrupto, se reinicia", err);
        return false;
      }
    },
    fmt(n) {
      return new Intl.NumberFormat("es-CL").format(n);
    }
  };

  const Roster = {
    positions: [
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
    ],
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
        errors.push("C1: la primera línea titular (LH, HK, TH) debe estar completa.");
      }
      const benchProps = bench.filter((p) => p.position === "PR-LH" || p.position === "PR-TH");
      const benchHK = bench.filter((p) => p.position === "HK");
      const coversLH = benchProps.some((p) => p.position === "PR-LH" || p.dual);
      const coversTH = benchProps.some((p) => p.position === "PR-TH" || p.dual);
      if (benchProps.length < 2 || benchHK.length < 1 || !coversLH || !coversTH) {
        errors.push("C2: la banca debe incluir al menos 2 props (LH y TH) y 1 hooker.");
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
        const leagueCard = root.querySelector("#home-league-card .home-league-body");
        const nextBody = root.querySelector("#home-next-card .home-next-body");
        const summary = root.querySelector(".home-summary-grid");
        if (leagueCard) {
          if (Store.league?.createdAt) {
            leagueCard.innerHTML = `
              <p><strong>${Store.league.name}</strong></p>
              <p class="muted">${Store.teams.length} equipos | ${Store.matches.length} partidos</p>
              <p class="muted">Última actualización: ${new Date(Store.league.createdAt).toLocaleString("es-CL")}</p>
            `;
          } else {
            leagueCard.innerHTML = `<p class="muted">Aún no se crea la liga. Configura equipos para comenzar.</p>`;
          }
        }
        if (nextBody) {
          if (!Store.schedule.length) {
            nextBody.innerHTML = `<p class="muted">Genera el fixture para ver los próximos partidos.</p>`;
          } else {
            const upcoming = Store.matches.find((m) => m.status !== "Final");
            if (!upcoming) {
              nextBody.innerHTML = `<p class="muted">Todos los partidos registrados.</p>`;
            } else {
              nextBody.innerHTML = `
                <p>Jornada ${upcoming.round}</p>
                <p><strong>${upcoming.home}</strong> vs <strong>${upcoming.away}</strong></p>
                <p class="muted">Registra el resultado para actualizar la tabla.</p>
              `;
            }
          }
        }
        if (summary) {
          summary.innerHTML = "";
          const cards = [
            {
              title: "Equipos",
              value: Store.teams.length,
              detail: Store.teams.join(", ") || "Sin equipos"
            },
            {
              title: "Partidos generados",
              value: Store.matches.length,
              detail: Store.schedule.length ? `${Store.schedule.length} jornadas` : "Pendiente"
            },
            {
              title: "Resultados cargados",
              value: Store.matches.filter((m) => m.status === "Final").length,
              detail: "Actualiza desde Resultados"
            },
            {
              title: "Tabla",
              value: Store.standings.length ? `${Store.standings[0].name} lidera` : "Sin datos",
              detail: Store.standings.length ? `${Store.standings[0].points} pts` : "Genera fixture"
            }
          ];
          cards.forEach((c) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<h3>${c.title}</h3><p class="badge">${c.value}</p><p class="muted">${c.detail}</p>`;
            summary.appendChild(div);
          });
        }
      }
    },
    liga: {
      init(root) {
        const form = root.querySelector("#leagueForm");
        const nameInput = form.querySelector("[name=leagueName]");
        nameInput.value = Store.league?.name || DEFAULT_LEAGUE.name;
        const teamList = root.querySelector("#teamsUl");
        renderTeams();
        const addBtn = root.querySelector("#addTeamBtn");
        const newTeamInput = root.querySelector("#newTeamInput");
        addBtn.addEventListener("click", () => {
          const value = newTeamInput.value.trim();
          if (!value) return;
          if (Store.teams.includes(value)) {
            UI.toast("El equipo ya existe", "warn");
            return;
          }
          Store.teams.push(value);
          newTeamInput.value = "";
          renderTeams();
        });
        root.querySelector("#saveLeague").addEventListener("click", () => {
          const name = nameInput.value.trim();
          if (!name) {
            UI.toast("La liga necesita un nombre", "error");
            return;
          }
          if (Store.teams.length < 2) {
            UI.toast("Debes contar con al menos 2 equipos", "warn");
            return;
          }
          Store.league = {
            name,
            category: DEFAULT_LEAGUE.category,
            createdAt: Date.now()
          };
          Util.save();
          UI.toast("Liga actualizada", "success");
        });

        function renderTeams() {
          teamList.innerHTML = "";
          if (!Store.teams.length) {
            teamList.innerHTML = `<li class="muted">Agrega equipos para comenzar.</li>`;
          } else {
            Store.teams.forEach((team) => {
              const li = document.createElement("li");
              li.innerHTML = `
                <span>${team}</span>
                <button type="button" class="btn ghost" data-remove="${team}">Quitar</button>
              `;
              teamList.appendChild(li);
              li.querySelector("[data-remove]").addEventListener("click", () => {
                Store.teams = Store.teams.filter((t) => t !== team);
                delete Store.rosters[team];
                renderTeams();
              });
            });
          }
          Util.save();
        }
      }
    },
    rosters: {
      init(root) {
        const select = root.querySelector("#rosterTeamSelect");
        select.innerHTML = Store.teams
          .map((team) => `<option value="${team}">${team}</option>`)
          .join("");
        const tbody = root.querySelector("#rosterTable tbody");
        const checklist = root.querySelector("#rosterChecklist");
        const saveBtn = root.querySelector("#saveRoster");
        select.addEventListener("change", () => {
          renderRoster(select.value);
        });
        saveBtn.addEventListener("click", () => {
          const team = select.value;
          const roster = collectRoster();
          const validation = Roster.validate(roster);
          if (!validation.valido) {
            UI.toast(validation.errores.join(" "), "error");
            renderChecklist(validation);
            return;
          }
          Store.rosters[team] = roster;
          Util.save();
          UI.toast("Roster guardado", "success");
          renderChecklist(validation);
        });
        if (Store.teams.length) {
          renderRoster(select.value || Store.teams[0]);
        } else {
          tbody.innerHTML = `<tr><td colspan="5" class="empty">Configura equipos primero.</td></tr>`;
        }

        function renderRoster(team) {
          const roster = Store.rosters[team]
            ? JSON.parse(JSON.stringify(Store.rosters[team]))
            : Roster.buildSkeleton();
          tbody.innerHTML = "";
          roster.forEach((player, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${idx + 1}</td>
              <td><input type="text" value="${player.name || ""}" data-field="name"></td>
              <td>${positionSelect(player.position)}</td>
              <td class="center"><input type="checkbox" data-field="dual" ${player.dual ? "checked" : ""}></td>
              <td><span class="tag">${player.starter ? "Titular" : "Banca"}</span></td>
            `;
            tbody.appendChild(tr);
          });
          renderChecklist(Roster.validate(roster));
        }

        function collectRoster() {
          const rows = Array.from(tbody.querySelectorAll("tr"));
          return rows.map((tr, index) => {
            const starter = index < 15;
            const name = tr.querySelector('[data-field="name"]').value.trim();
            const position = tr.querySelector('[data-field="position"]').value;
            const dual = tr.querySelector('[data-field="dual"]').checked;
            return { id: Util.uuid(), name, position, dual, starter, slot: index + 1 };
          });
        }

        function renderChecklist(validation) {
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
            const ok = !validation.errores.some((err) => err.startsWith(item.key));
            li.innerHTML = `<span class="${ok ? "ok" : "err"}">${ok ? "✔" : "✖"}</span> ${item.text}`;
            list.appendChild(li);
          });
          checklist.appendChild(list);
        }

        function positionSelect(value) {
          const options = [
            "",
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
          ]
            .map((pos) => `<option value="${pos}" ${pos === value ? "selected" : ""}>${pos || "--"}</option>`)
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
          Store.matches = [];
          rounds.forEach((round) => {
            round.forEach((pair) => {
              if (pair.bye) return;
              Store.matches.push({
                id: Util.uuid(),
                round: pair.round,
                home: pair.home,
                away: pair.away,
                status: "Pendiente",
                homeScore: "",
                awayScore: "",
                homeTries: "",
                awayTries: ""
              });
            });
          });
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
            meta.textContent = "Sin fixture";
            return;
          }
          const teams = Store.teams.length;
          const odd = teams % 2 !== 0;
          meta.textContent = `${rounds.length} jornadas | ${teams} equipos${odd ? " (impar: BYE)" : ""}`;
          rounds.forEach((round) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `<h3>Jornada ${round[0]?.round || ""}</h3>`;
            const list = document.createElement("ul");
            list.className = "checklist";
            round.forEach((match) => {
              const li = document.createElement("li");
              if (match.bye) {
                const team = match.home === "BYE" ? match.away : match.home;
                li.innerHTML = `<span class="tag">BYE</span> ${team}`;
              } else {
                li.innerHTML = `<span>${match.home}</span> vs <span>${match.away}</span>`;
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
          Store.matches
            .sort((a, b) => a.round - b.round)
            .forEach((match) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                <td>${match.round}</td>
                <td>${match.home}</td>
                <td><input type="number" min="0" value="${match.homeScore}" data-field="homeScore"></td>
                <td><input type="number" min="0" value="${match.homeTries}" data-field="homeTries"></td>
                <td>${match.away}</td>
                <td><input type="number" min="0" value="${match.awayScore}" data-field="awayScore"></td>
                <td><input type="number" min="0" value="${match.awayTries}" data-field="awayTries"></td>
                <td>
                  <select data-field="status">
                    <option value="Pendiente" ${match.status === "Pendiente" ? "selected" : ""}>Pendiente</option>
                    <option value="Final" ${match.status === "Final" ? "selected" : ""}>Final</option>
                  </select>
                </td>
                <td><button class="btn ghost" data-save>Guardar</button></td>
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
            tr.innerHTML = `
              <td>${idx + 1}</td>
              <td>${row.name}</td>
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
        const fixtureDiv = root.querySelector("#publicFixture");
        const standingsBody = root.querySelector("#publicStandings");
        renderFixture();
        renderStandings();

        function renderFixture() {
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
            list.className = "checklist";
            round.forEach((match) => {
              const li = document.createElement("li");
              if (match.bye) {
                const team = match.home === "BYE" ? match.away : match.home;
                li.innerHTML = `<span class="tag">BYE</span> ${team}`;
              } else {
                const stored = Store.matches.find(
                  (m) => m.round === match.round && ((m.home === match.home && m.away === match.away) || (m.home === match.away && m.away === match.home))
                );
                const status = stored?.status === "Final" ? "✔ Final" : "Pendiente";
                li.innerHTML = `<span>${match.home}</span> vs <span>${match.away}</span> <span class="tag">${status}</span>`;
              }
              list.appendChild(li);
            });
            card.appendChild(list);
            fixtureDiv.appendChild(card);
          });
        }

        function renderStandings() {
          standingsBody.innerHTML = "";
          if (!Store.standings.length) {
            standingsBody.innerHTML = `<tr><td colspan="7" class="empty">Sin tabla disponible.</td></tr>`;
            return;
          }
          Store.standings.forEach((row, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${idx + 1}</td>
              <td>${row.name}</td>
              <td>${row.played}</td>
              <td>${row.wins}</td>
              <td>${row.draws}</td>
              <td>${row.losses}</td>
              <td>${row.points}</td>
            `;
            standingsBody.appendChild(tr);
          });
        }
      }
    }
  };

  function init() {
    if (!Util.load()) {
      Store.league = { ...DEFAULT_LEAGUE };
      Store.teams = [...DEFAULT_TEAMS];
      Store.rosters = {};
      Store.matches = [];
      Store.standings = [];
      Store.schedule = [];
      Util.save();
    } else {
      Store.matches = Store.matches || [];
      Store.standings = Scoring.calcStandings(Store.matches);
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
    const exportBtn = document.getElementById("exportState");
    const resetBtn = document.getElementById("resetDemo");
    const themeBtn = document.getElementById("themeToggle");
    exportBtn?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(Store, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rlm-demo.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
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
