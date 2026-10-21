(function () {
  "use strict";

  var CHIAVE = "ciaoamore1-unita1:";
  var ICONA_VOCE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';

  /* ---------- Utilità ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === "class") e.className = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function norm(s) {
    return String(s || "").toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/\s+/g, " ")
      .replace(/\s*'\s*/g, "'")
      .replace(/[.!?,;:]+$/g, "").trim();
  }
  function senzaAccenti(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  // 2 = giusto, 1 = giusto ma senza accento, 0 = sbagliato
  function confronta(scritto, accettate) {
    var n = norm(scritto);
    if (!n) return 0;
    for (var i = 0; i < accettate.length; i++) if (n === norm(accettate[i])) return 2;
    for (var j = 0; j < accettate.length; j++) if (senzaAccenti(n) === senzaAccenti(norm(accettate[j]))) return 1;
    return 0;
  }
  function mescola(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function salva(id, punti, totale) {
    try {
      var vecchio = JSON.parse(localStorage.getItem(CHIAVE + id) || "null");
      if (!vecchio || punti >= vecchio.p) localStorage.setItem(CHIAVE + id, JSON.stringify({ p: punti, t: totale }));
    } catch (e) {}
  }
  function leggi(id) { try { return JSON.parse(localStorage.getItem(CHIAVE + id) || "null"); } catch (e) { return null; } }

  /* ---------- Voce (sintesi vocale) ---------- */
  var voce = null, haVoce = "speechSynthesis" in window;
  function scegliVoce() {
    if (!haVoce) return;
    var v = speechSynthesis.getVoices();
    voce = v.filter(function (x) { return /^it(-|_|$)/i.test(x.lang); })
      .sort(function (a, b) { return (/google|natural|premium|enhanced|alice|federica|elsa/i.test(b.name) ? 1 : 0) - (/google|natural|premium|enhanced|alice|federica|elsa/i.test(a.name) ? 1 : 0); })[0] || null;
  }
  if (haVoce) { scegliVoce(); speechSynthesis.onvoiceschanged = scegliVoce; }
  else document.documentElement.classList.add("no-voce");

  var turno = 0; // ogni nuova lettura "esterna" interrompe i dialoghi in corso
  function parla(testo, bottone, lento, fine, interno) {
    if (!haVoce) return;
    if (!interno) turno++;
    speechSynthesis.cancel();
    document.querySelectorAll(".parla").forEach(function (b) { b.classList.remove("parla"); });
    var u = new SpeechSynthesisUtterance(testo);
    u.lang = "it-IT"; if (voce) u.voice = voce;
    u.rate = lento ? 0.62 : 0.88;
    if (bottone) bottone.classList.add("parla");
    u.onend = u.onerror = function () { if (bottone) bottone.classList.remove("parla"); if (fine) fine(); };
    speechSynthesis.speak(u);
  }
  window.parla = parla;

  function bottoneVoce(testo, lento) {
    var b = el("button", { type: "button", class: "ascolta", "data-say": testo, "aria-label": "Ascolta: " + testo, title: "Ascolta" }, ICONA_VOCE);
    if (lento) b.setAttribute("data-lento", "1");
    return b;
  }

  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-say]");
    if (!b) return;
    ev.preventDefault();
    parla(b.getAttribute("data-say"), b, b.hasAttribute("data-lento"));
  });

  /* ---------- Tastiera accenti ---------- */
  var ultimoCampo = null;
  document.addEventListener("focusin", function (e) { if (e.target.matches && e.target.matches("input.campo")) ultimoCampo = e.target; });
  function tastieraAccenti() {
    var d = el("div", { class: "accenti" }, "<span>Accenti:</span>");
    ["à", "è", "é", "ì", "ò", "ù", "’"].forEach(function (c) {
      var b = el("button", { type: "button", "aria-label": "Inserisci " + c, text: c });
      b.addEventListener("mousedown", function (e) { e.preventDefault(); });
      b.addEventListener("click", function () {
        var f = ultimoCampo; if (!f) return;
        var s = f.selectionStart, e2 = f.selectionEnd;
        f.value = f.value.slice(0, s) + c + f.value.slice(e2);
        f.focus(); f.setSelectionRange(s + 1, s + 1);
        f.dispatchEvent(new Event("input"));
      });
      d.appendChild(b);
    });
    return d;
  }

  /* ---------- Costruttori ---------- */
  var COSTRUISCI = {

    scelta: function (dati, box) {
      var ol = el("ol", { class: "es-lista" });
      dati.voci.forEach(function (v, i) {
        var li = el("li");
        var opzioni = v.o || dati.comune;
        var dom = el("div", { class: "domanda" });
        dom.appendChild(document.createTextNode(v.q + " "));
        if (v.say) { var bv = bottoneVoce(v.say); bv.style.verticalAlign = "middle"; dom.appendChild(bv); }
        li.appendChild(dom);
        var g = el("div", { class: "opzioni", role: "group", "aria-label": v.q });
        opzioni.forEach(function (o, k) {
          var b = el("button", { type: "button", class: "opz", "aria-pressed": "false", "data-k": k, text: o });
          b.addEventListener("click", function () {
            g.querySelectorAll(".opz").forEach(function (x) { x.setAttribute("aria-pressed", "false"); x.classList.remove("giusta", "sbagliata", "era-giusta"); });
            b.setAttribute("aria-pressed", "true"); li.classList.remove("ok", "ko");
          });
          g.appendChild(b);
        });
        li.appendChild(g);
        ol.appendChild(li);
      });
      box.appendChild(ol);
      return {
        controlla: function (mostra) {
          var punti = 0;
          ol.querySelectorAll(":scope > li").forEach(function (li, i) {
            var giusta = dati.voci[i].a;
            var scelta = li.querySelector('.opz[aria-pressed="true"]');
            li.querySelectorAll(".opz").forEach(function (x) { x.classList.remove("giusta", "sbagliata", "era-giusta"); });
            li.classList.remove("ok", "ko");
            if (scelta && +scelta.dataset.k === giusta) { punti++; scelta.classList.add("giusta"); li.classList.add("ok"); }
            else {
              if (scelta) scelta.classList.add("sbagliata");
              li.classList.add("ko");
              if (mostra) li.querySelector('.opz[data-k="' + giusta + '"]').classList.add("era-giusta");
            }
          });
          return [punti, dati.voci.length];
        },
        azzera: function () { ol.querySelectorAll("li").forEach(function (li) { li.classList.remove("ok", "ko"); }); ol.querySelectorAll(".opz").forEach(function (x) { x.setAttribute("aria-pressed", "false"); x.classList.remove("giusta", "sbagliata", "era-giusta"); }); }
      };
    },

    vf: function (dati, box) {
      var copia = { voci: dati.voci.map(function (v) { return { q: v.q, a: v.a ? 0 : 1 }; }), comune: ["Vero", "Falso"] };
      var r = COSTRUISCI.scelta(copia, box);
      box.querySelectorAll(".opz").forEach(function (b) { b.classList.add("vf"); });
      return r;
    },

    abbina: function (dati, box) {
      var ol = el("ol", { class: "es-lista" });
      var opzioni = dati.ordina === false ? dati.opzioni : dati.opzioni.slice().sort(function (a, b) { return a.localeCompare(b, "it"); });
      dati.voci.forEach(function (v) {
        var li = el("li");
        var riga = el("div", { class: "riga-abbina" });
        riga.appendChild(el("span", { class: "testo", text: v.q }));
        var s = el("select", { class: "campo", "aria-label": v.q });
        s.appendChild(el("option", { value: "", text: "— scegli —" }));
        opzioni.forEach(function (o) { s.appendChild(el("option", { value: o, text: o })); });
        s.addEventListener("change", function () { s.classList.remove("ok", "ko"); li.classList.remove("ok", "ko"); var sol = li.querySelector(".sol"); if (sol) sol.remove(); });
        riga.appendChild(s);
        li.appendChild(riga);
        ol.appendChild(li);
      });
      box.appendChild(ol);
      return {
        controlla: function (mostra) {
          var punti = 0;
          ol.querySelectorAll(":scope > li").forEach(function (li, i) {
            var s = li.querySelector("select"), giusta = dati.voci[i].a;
            var vecchia = li.querySelector(".sol"); if (vecchia) vecchia.remove();
            s.classList.remove("ok", "ko"); li.classList.remove("ok", "ko");
            if (s.value === giusta) { punti++; s.classList.add("ok"); li.classList.add("ok"); }
            else { s.classList.add("ko"); li.classList.add("ko"); if (mostra) li.appendChild(el("span", { class: "sol", text: "→ " + giusta })); }
          });
          return [punti, dati.voci.length];
        },
        azzera: function () { ol.querySelectorAll("select").forEach(function (s) { s.value = ""; s.classList.remove("ok", "ko"); }); ol.querySelectorAll("li").forEach(function (li) { li.classList.remove("ok", "ko"); }); ol.querySelectorAll(".sol").forEach(function (x) { x.remove(); }); }
      };
    },

    immagini: function (dati, box) {
      var g = el("div", { class: "marco-griglia" });
      var opzioni = dati.opzioni.slice().sort(function (a, b) { return a.localeCompare(b, "it"); });
      dati.voci.forEach(function (v, i) {
        var c = el("div", { class: "cella" });
        c.appendChild(el("img", { src: v.img, alt: v.alt, loading: "lazy", width: "460", height: "440" }));
        var s = el("select", { class: "campo", "aria-label": "Immagine " + (i + 1) + ": " + v.alt });
        s.appendChild(el("option", { value: "", text: "— scegli —" }));
        opzioni.forEach(function (o) { s.appendChild(el("option", { value: o, text: o })); });
        s.addEventListener("change", function () { c.classList.remove("ok", "ko"); s.classList.remove("ok", "ko"); var x = c.querySelector(".sol"); if (x) x.remove(); });
        c.appendChild(s);
        g.appendChild(c);
      });
      box.appendChild(g);
      return {
        controlla: function (mostra) {
          var punti = 0;
          g.querySelectorAll(".cella").forEach(function (c, i) {
            var s = c.querySelector("select"), giusta = dati.voci[i].a;
            var x = c.querySelector(".sol"); if (x) x.remove();
            c.classList.remove("ok", "ko"); s.classList.remove("ok", "ko");
            if (s.value === giusta) { punti++; c.classList.add("ok"); s.classList.add("ok"); }
            else { c.classList.add("ko"); s.classList.add("ko"); if (mostra) c.appendChild(el("span", { class: "sol", text: "→ " + giusta })); }
          });
          return [punti, dati.voci.length];
        },
        azzera: function () { g.querySelectorAll(".cella").forEach(function (c) { c.classList.remove("ok", "ko"); var s = c.querySelector("select"); s.value = ""; s.classList.remove("ok", "ko"); var x = c.querySelector(".sol"); if (x) x.remove(); }); }
      };
    },

    buchi: function (dati, box) {
      box.appendChild(tastieraAccenti());
      var banca = null;
      if (dati.banca) {
        banca = el("div", { class: "banca", "aria-label": "Parole da usare" });
        dati.banca.forEach(function (p) { banca.appendChild(el("span", { text: p })); });
        box.appendChild(banca);
      }
      var ol = el("ol", { class: "es-lista" + (dati.dialogo ? " no-num" : "") });
      var campi = [];
      dati.voci.forEach(function (v, i) {
        var li = el("li", { class: "frase" });
        if (dati.dialogo) li.appendChild(el("strong", { class: "chi-" + v.chi.toLowerCase(), text: v.chi + ": " }));
        var pezzi = v.t.split("___");
        pezzi.forEach(function (p, k) {
          li.appendChild(document.createTextNode(p));
          if (k < pezzi.length - 1) {
            var risposte = v.a[k];
            var lung = Math.max.apply(null, risposte.map(function (r) { return r.length; }));
            var inp = el("input", { type: "text", class: "campo" + (dati.lungo ? " lungo" : ""), autocomplete: "off", autocapitalize: "off", spellcheck: "false", "aria-label": "Frase " + (i + 1) + ", spazio " + (k + 1) });
            if (!dati.lungo) inp.style.width = Math.max(6, lung + 3) + "ch";
            inp._risposte = risposte; inp._li = li;
            inp.addEventListener("input", function () { inp.classList.remove("ok", "ko", "quasi"); li.classList.remove("ok", "ko", "quasi"); var s = li.querySelector(".sol"); if (s) s.remove(); segnaBanca(); });
            inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var n = campi[campi.indexOf(inp) + 1]; if (n) n.focus(); else box.querySelector(".controlla").click(); } });
            campi.push(inp);
            li.appendChild(inp);
          }
        });
        ol.appendChild(li);
      });
      function segnaBanca() {
        if (!banca) return;
        var usate = campi.map(function (c) { return senzaAccenti(norm(c.value)); });
        banca.querySelectorAll("span").forEach(function (s) { s.classList.toggle("usata", usate.indexOf(senzaAccenti(norm(s.textContent))) > -1); });
      }
      box.appendChild(ol);
      return {
        controlla: function (mostra) {
          var punti = 0, quasi = 0;
          ol.querySelectorAll(".sol").forEach(function (x) { x.remove(); });
          ol.querySelectorAll(":scope > li").forEach(function (li) { li.classList.remove("ok", "ko", "quasi"); });
          var statoRiga = new Map();
          campi.forEach(function (c) {
            c.classList.remove("ok", "ko", "quasi");
            var r = confronta(c.value, c._risposte);
            var prev = statoRiga.has(c._li) ? statoRiga.get(c._li) : 2;
            if (r === 2) { punti++; c.classList.add("ok"); }
            else if (r === 1) { quasi++; c.classList.add("quasi"); }
            else { c.classList.add("ko"); }
            statoRiga.set(c._li, Math.min(prev, r));
          });
          statoRiga.forEach(function (stato, li) {
            li.classList.add(stato === 2 ? "ok" : stato === 1 ? "quasi" : "ko");
            if (stato === 1) li.appendChild(el("span", { class: "sol quasi-msg", text: "Quasi! Attenzione all’accento." }));
            if (stato < 2 && mostra) {
              var giuste = campi.filter(function (c) { return c._li === li; }).map(function (c) { return c._risposte[0]; });
              li.appendChild(el("span", { class: "sol", text: "Soluzione: " + giuste.join(" / ") }));
            }
          });
          return [punti, campi.length, quasi];
        },
        azzera: function () { campi.forEach(function (c) { c.value = ""; c.classList.remove("ok", "ko", "quasi"); }); ol.querySelectorAll("li").forEach(function (li) { li.classList.remove("ok", "ko", "quasi"); }); ol.querySelectorAll(".sol").forEach(function (x) { x.remove(); }); segnaBanca(); }
      };
    },

    ascolta: function (dati, box) {
      if (!haVoce) box.appendChild(el("p", { class: "nota", text: "Il tuo browser non può leggere ad alta voce. Prova con Chrome, Safari o Edge." }));
      var ol = el("ol", { class: "es-lista" });
      var campi = [];
      dati.voci.forEach(function (v, i) {
        var li = el("li");
        var riga = el("div", { class: "dettato" });
        var b1 = bottoneVoce(v.say, /\./.test(v.say));
        b1.setAttribute("aria-label", "Ascolta l’elemento " + (i + 1));
        riga.appendChild(b1);
        var inp = el("input", { type: "text", class: "campo", autocomplete: "off", autocapitalize: "off", spellcheck: "false", inputmode: /^\d+$/.test(v.a[0]) ? "numeric" : "text", "aria-label": "Risposta " + (i + 1) });
        inp.style.width = Math.max(8, v.a[0].length + 4) + "ch";
        inp._risposte = v.a; inp._li = li;
        inp.addEventListener("input", function () { inp.classList.remove("ok", "ko", "quasi"); li.classList.remove("ok", "ko"); var s = li.querySelector(".sol"); if (s) s.remove(); });
        inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); var n = campi[campi.indexOf(inp) + 1]; if (n) n.focus(); else box.querySelector(".controlla").click(); } });
        campi.push(inp);
        riga.appendChild(inp);
        li.appendChild(riga);
        ol.appendChild(li);
      });
      box.appendChild(ol);
      return {
        controlla: function (mostra) {
          var punti = 0;
          campi.forEach(function (c, i) {
            var li = c._li; var s = li.querySelector(".sol"); if (s) s.remove();
            c.classList.remove("ok", "ko"); li.classList.remove("ok", "ko");
            if (confronta(c.value, c._risposte) === 2) { punti++; c.classList.add("ok"); li.classList.add("ok"); }
            else { c.classList.add("ko"); li.classList.add("ko"); if (mostra) li.appendChild(el("span", { class: "sol", text: "Soluzione: " + dati.voci[i].a[0].replace(/^./, function (x) { return x.toUpperCase(); }) })); }
          });
          return [punti, campi.length];
        },
        azzera: function () { campi.forEach(function (c) { c.value = ""; c.classList.remove("ok", "ko"); c._li.classList.remove("ok", "ko"); var s = c._li.querySelector(".sol"); if (s) s.remove(); }); }
      };
    }
  };

  /* ---------- Montaggio esercizi ---------- */
  var REGISTRO = {};
  function messaggio(p, t) {
    var r = p / t;
    if (r === 1) return "Perfetto! Bravissimo!";
    if (r >= .8) return "Molto bene!";
    if (r >= .5) return "Bene, ma puoi migliorare.";
    return "Coraggio, riprova!";
  }

  document.querySelectorAll(".esercizio[data-es]").forEach(function (box) {
    var id = box.getAttribute("data-es"), dati = window.ESERCIZI[id];
    if (!dati) return;
    var api = COSTRUISCI[dati.tipo](dati, box);
    REGISTRO[id] = { box: box, totale: dati.voci.reduce(function (n, v) { return n + (v.a && Array.isArray(v.a) && dati.tipo === "buchi" ? v.a.length : 1); }, 0) };

    var az = el("div", { class: "azioni" });
    var bC = el("button", { type: "button", class: "controlla", text: "Controlla" });
    var bS = el("button", { type: "button", class: "secondario", text: "Mostra le soluzioni" });
    var bR = el("button", { type: "button", class: "secondario", text: "Ricomincia" });
    var ris = el("div", { class: "risultato", "aria-live": "polite" });
    az.appendChild(bC); az.appendChild(bS); az.appendChild(bR); az.appendChild(ris);
    box.appendChild(az);

    function mostraRisultato(r) {
      var p = r[0], t = r[1], q = r[2] || 0;
      ris.className = "risultato" + (p === t ? " top" : "");
      ris.innerHTML = '<span class="voto">' + p + "/" + t + '</span><span class="msg">' + esc(messaggio(p, t)) + (q ? " (" + q + " quasi giuste: controlla gli accenti)" : "") + "</span>";
    }
    bC.addEventListener("click", function () {
      var r = api.controlla(false);
      mostraRisultato(r); salva(id, r[0], r[1]); aggiornaProgressi();
      if (r[0] === r[1]) festa(box);
    });
    bS.addEventListener("click", function () { var r = api.controlla(true); mostraRisultato(r); });
    bR.addEventListener("click", function () { api.azzera(); ris.innerHTML = ""; });

    var prec = leggi(id);
    if (prec) ris.innerHTML = '<span class="msg">Il tuo miglior risultato: ' + prec.p + "/" + prec.t + "</span>";
  });

  /* ---------- Coriandoli (solo quando è tutto giusto) ---------- */
  function festa(box) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var colori = ["#2e6b4f", "#fffaf5", "#8f2a2a", "#b8862f", "#1d2a4d"];
    var r = box.querySelector(".controlla").getBoundingClientRect();
    for (var i = 0; i < 36; i++) {
      var c = document.createElement("span");
      c.style.cssText = "position:fixed;z-index:200;width:8px;height:12px;border-radius:2px;pointer-events:none;left:" + (r.left + r.width / 2) + "px;top:" + r.top + "px;background:" + colori[i % colori.length] + ";box-shadow:0 0 0 1px rgba(0,0,0,.08)";
      document.body.appendChild(c);
      var dx = (Math.random() - .5) * 420, dy = -120 - Math.random() * 260, rot = Math.random() * 720;
      c.animate([{ transform: "translate(0,0) rotate(0)", opacity: 1 }, { transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot / 2 + "deg)", opacity: 1, offset: .5 }, { transform: "translate(" + dx * 1.3 + "px," + (dy + 420) + "px) rotate(" + rot + "deg)", opacity: 0 }], { duration: 1500 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.4,1)" }).onfinish = (function (n) { return function () { n.remove(); }; })(c);
    }
  }

  /* ---------- Progressi ---------- */
  function aggiornaProgressi() {
    var perSez = {}, totP = 0, totT = 0;
    Object.keys(REGISTRO).forEach(function (id) {
      var sez = REGISTRO[id].box.closest(".sezione").id;
      var t = REGISTRO[id].totale, r = leggi(id), p = r ? Math.min(r.p, t) : 0;
      perSez[sez] = perSez[sez] || { p: 0, t: 0 };
      perSez[sez].p += p; perSez[sez].t += t; totP += p; totT += t;
    });
    document.querySelectorAll(".indice a").forEach(function (a) {
      var s = perSez[a.getAttribute("href").slice(1)];
      a.style.setProperty("--p", s && s.t ? Math.round(s.p / s.t * 100) : (a.dataset.letto ? 100 : 0));
    });
    var pt = document.querySelector(".punteggio-tot");
    if (pt) pt.textContent = "Punti: " + totP + " / " + totT;
    var pag = document.getElementById("pagella-lista");
    if (pag) {
      pag.innerHTML = "";
      document.querySelectorAll(".indice a").forEach(function (a) {
        var s = perSez[a.getAttribute("href").slice(1)];
        if (!s) return;
        pag.appendChild(el("li", null, "<span>" + esc(a.querySelector(".tip").textContent) + "</span><b>" + s.p + " / " + s.t + "</b>"));
      });
      document.getElementById("pagella-voto").textContent = totT ? Math.round(totP / totT * 100) + "%" : "0%";
    }
  }
  aggiornaProgressi();

  var bAz = document.getElementById("azzera-tutto");
  if (bAz) bAz.addEventListener("click", function () {
    if (!confirm("Vuoi cancellare tutti i tuoi risultati salvati?")) return;
    Object.keys(REGISTRO).forEach(function (id) { try { localStorage.removeItem(CHIAVE + id); } catch (e) {} });
    aggiornaProgressi();
    document.querySelectorAll(".risultato").forEach(function (r) { r.innerHTML = ""; });
  });

  /* ---------- Sezione attiva nell’indice ---------- */
  var links = document.querySelectorAll(".indice a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (voci) {
      voci.forEach(function (v) {
        if (v.isIntersecting) links.forEach(function (a) { a.setAttribute("aria-current", a.getAttribute("href") === "#" + v.target.id ? "true" : "false"); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll(".sezione").forEach(function (s) { io.observe(s); });
  }

  /* ---------- Dialoghi: ascolta tutto ---------- */
  document.querySelectorAll("[data-dialogo]").forEach(function (b) {
    b.addEventListener("click", function () {
      var righe = Array.prototype.slice.call(document.querySelectorAll("#" + b.getAttribute("data-dialogo") + " .battuta"));
      if (!b._orig) b._orig = b.innerHTML;
      if (b.classList.contains("in-corso")) { turno++; speechSynthesis.cancel(); return; }
      turno++;
      var mio = turno, i = 0;
      b.classList.add("in-corso");
      b.innerHTML = ICONA_VOCE + " Ferma";
      function fine() { b.classList.remove("in-corso"); b.innerHTML = b._orig; righe.forEach(function (r) { r.classList.remove("attiva"); }); }
      function prossima() {
        righe.forEach(function (r) { r.classList.remove("attiva"); });
        if (i >= righe.length || mio !== turno) { fine(); return; }
        var r = righe[i++]; r.classList.add("attiva");
        r.scrollIntoView({ block: "nearest", behavior: "smooth" });
        parla(r.querySelector(".cosa").textContent, r.querySelector(".ascolta"), false, function () { if (mio === turno) setTimeout(prossima, 250); else fine(); }, true);
      }
      prossima();
    });
  });

  /* ---------- Flashcard ---------- */
  var cont = document.getElementById("carte");
  if (cont && window.CARTE) {
    window.CARTE.forEach(function (g) {
      var box = el("div", { class: "gruppo-carte" });
      box.appendChild(el("h4", { text: g.titolo }));
      var griglia = el("div", { class: "carte" });
      g.carte.forEach(function (c) {
        var b = el("button", { type: "button", class: "carta", "aria-label": c[0] + ". Tocca per vedere la traduzione" },
          '<span class="carta-in"><span class="fronte">' + esc(c[0]) + '</span><span class="retro">' + esc(c[1]) + "</span></span>");
        b.addEventListener("click", function () {
          var girata = b.classList.toggle("girata");
          b.setAttribute("aria-label", girata ? c[1] : c[0] + ". Tocca per vedere la traduzione");
          if (girata) parla(c[0].replace(" / ", ". "));
        });
        griglia.appendChild(b);
      });
      box.appendChild(griglia);
      cont.appendChild(box);
    });
  }

  /* ---------- Alfabeto e numeri ---------- */
  var ALFABETO = [["A","a"],["B","bi"],["C","ci"],["D","di"],["E","e"],["F","effe"],["G","gi"],["H","acca"],["I","i"],["L","elle"],["M","emme"],["N","enne"],["O","o"],["P","pi"],["Q","cu"],["R","erre"],["S","esse"],["T","ti"],["U","u"],["V","vu"],["Z","zeta"]];
  var STRANIERE = [["J","i lunga"],["K","cappa"],["W","doppia vu"],["X","ics"],["Y","ipsilon"]];
  var NUMERI = ["uno","due","tre","quattro","cinque","sei","sette","otto","nove","dieci","undici","dodici","tredici","quattordici","quindici","sedici","diciassette","diciotto","diciannove","venti"];
  function riempiLettere(id, lista, straniere) {
    var c = document.getElementById(id); if (!c) return;
    lista.forEach(function (l) {
      var b = el("button", { type: "button", class: "lettera" + (straniere ? " straniera" : ""), "data-say": l[1], "aria-label": "Lettera " + l[0] + ", si legge " + l[1] },
        '<span class="grande">' + l[0] + '</span><span class="piccola">' + l[0].toLowerCase() + '</span><span class="nome">' + l[1] + "</span>");
      c.appendChild(b);
    });
  }
  riempiLettere("alfabeto", ALFABETO);
  riempiLettere("straniere", STRANIERE, true);
  var nc = document.getElementById("numeri");
  if (nc) NUMERI.forEach(function (n, i) {
    nc.appendChild(el("button", { type: "button", class: "lettera", "data-say": n, "aria-label": (i + 1) + ", " + n },
      '<span class="grande">' + (i + 1) + '</span><span class="piccola">' + n + "</span>"));
  });

  /* ---------- Bottoni voce automatici ---------- */
  document.querySelectorAll(".battuta").forEach(function (r) {
    if (!r.querySelector(".ascolta")) r.appendChild(bottoneVoce(r.querySelector(".cosa").textContent));
  });
  document.querySelectorAll(".ascolta:empty").forEach(function (b) { b.innerHTML = ICONA_VOCE; b.type = "button"; if (!b.title) b.title = "Ascolta"; if (!b.getAttribute("aria-label")) b.setAttribute("aria-label", "Ascolta: " + b.getAttribute("data-say")); });
  document.querySelectorAll(".parola, .p-it").forEach(function (p) { if (!p.hasAttribute("data-say")) p.setAttribute("data-say", (p.querySelector("b") || p).textContent); });

  /* ---------- Lightbox fumetto ---------- */
  var lb = document.getElementById("lightbox");
  if (lb) {
    document.querySelectorAll("[data-zoom]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        lb.querySelector("img").src = a.getAttribute("href");
        lb.querySelector("img").alt = a.querySelector("img").alt;
        lb.classList.add("aperto"); document.body.style.overflow = "hidden";
        lb.querySelector("button").focus();
      });
    });
    function chiudi() { lb.classList.remove("aperto"); document.body.style.overflow = ""; }
    lb.querySelector("button").addEventListener("click", chiudi);
    lb.addEventListener("click", function (e) { if (e.target === lb) chiudi(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") chiudi(); });
  }
})();
