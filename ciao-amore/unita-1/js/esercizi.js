/* Dati degli esercizi — Unità 1 */
window.ESERCIZI = {

  /* ---------------- A. Buongiorno! ---------------- */
  "a2": {
    tipo: "scelta",
    voci: [
      { q: "Come si chiama il ragazzo?", o: ["Roberto", "Alessio", "Marco"], a: 0 },
      { q: "Come si chiama la ragazza?", o: ["Natalia", "Carlotta", "Laura"], a: 1 },
      { q: "Di dove è Carlotta?", o: ["È di Venezia.", "È di Firenze.", "È di Roma."], a: 1 },
      { q: "Di dove è Roberto?", o: ["È italiano.", "È argentino.", "È spagnolo."], a: 1 },
      { q: "Roberto abita in Argentina?", o: ["Sì, abita in Argentina.", "No, abita a Venezia."], a: 1 },
      { q: "Dove abita Roberto?", o: ["A Firenze.", "A Buenos Aires.", "A Venezia."], a: 2 },
      { q: "Carlotta lavora a Venezia?", o: ["Sì, lavora a Venezia.", "No, lavora a Firenze."], a: 1 },
      { q: "Che lavoro fa Carlotta?", o: ["È archeologa.", "È guida d’arte.", "È insegnante."], a: 1 },
      { q: "Carlotta lavora in un museo?", o: ["Sì, lavora in un museo.", "No, lavora in una scuola."], a: 0 },
      { q: "Dove lavora Carlotta?", o: ["In un ristorante.", "Agli Uffizi.", "In un ospedale."], a: 1 },
      { q: "A Carlotta piace il suo lavoro?", o: ["Sì, le piace molto.", "No, non le piace."], a: 0 },
      { q: "A Carlotta piace Venezia?", o: ["Sì, Venezia è bellissima.", "No, Venezia è brutta."], a: 0 },
      { q: "A Roberto piace Venezia?", o: ["Sì, anche a lui piace.", "No, non gli piace."], a: 0 },
      { q: "Com’è Venezia, secondo Roberto?", o: ["Moderna e piccola.", "Piena di misteri.", "Noiosa."], a: 1 },
      { q: "Che lavoro fa Roberto?", o: ["È guida d’arte.", "È programmatore.", "È archeologo."], a: 2 }
    ]
  },

  "a3": {
    tipo: "vf",
    voci: [
      { q: "Roberto è italiano.", a: false },
      { q: "Carlotta è di Roma.", a: false },
      { q: "Roberto è archeologo.", a: true },
      { q: "Roberto abita a Venezia.", a: true },
      { q: "Carlotta lavora in Argentina.", a: false },
      { q: "Carlotta è guida d’arte.", a: true },
      { q: "Carlotta lavora in un museo.", a: true },
      { q: "A Carlotta piace il suo lavoro.", a: true },
      { q: "Venezia è una città piena di misteri.", a: true },
      { q: "A Roberto non piace Venezia.", a: false }
    ]
  },

  "a4": {
    tipo: "scelta",
    voci: [
      { q: "Come si chiama la donna?", o: ["Carlotta", "Natalia", "Laura"], a: 1 },
      { q: "Natalia è veneziana?", o: ["Sì, è veneziana.", "No, è di Firenze."], a: 0 },
      { q: "Dove vive Natalia?", o: ["A Roma.", "A Venezia.", "A Milano."], a: 1 },
      { q: "Com’è Venezia?", o: ["Antica, bella e piena di misteri.", "Moderna e grande.", "Piccola e tranquilla."], a: 0 },
      { q: "Che cosa ama Natalia?", o: ["Le montagne e la neve.", "I canali, le gondole, le maschere, i ponti e i tramonti.", "Il calcio e la pizza."], a: 1 },
      { q: "Quanti anni ha Natalia?", o: ["Venti.", "Duecento.", "Ventidue."], a: 1 },
      { q: "Natalia ha il cuore giovane?", o: ["Sì, ha il cuore giovane.", "No, ha il cuore vecchio."], a: 0 },
      { q: "Per Natalia, Venezia è solo una città?", o: ["Sì, è solo una città.", "No, è la sua casa."], a: 1 }
    ]
  },

  "a5": {
    tipo: "abbina",
    opzioni: ["Mi chiamo Carlotta.", "Sono di Firenze.", "Abito a Venezia.", "Sto bene, grazie!", "Piacere, Roberto.", "Sono guida d’arte."],
    voci: [
      { q: "Come ti chiami?", a: "Mi chiamo Carlotta." },
      { q: "Di dove sei?", a: "Sono di Firenze." },
      { q: "Dove abiti?", a: "Abito a Venezia." },
      { q: "Come stai?", a: "Sto bene, grazie!" },
      { q: "Piacere, Carlotta.", a: "Piacere, Roberto." },
      { q: "Che lavoro fai?", a: "Sono guida d’arte." }
    ]
  },

  /* ---------------- B. Che lavoro fai? ---------------- */
  "b1": {
    tipo: "abbina",
    opzioni: ["avvocato", "cameriere", "giornalista", "insegnante", "ladro", "medico", "operaio edile", "pittore", "poliziotto", "programmatore"],
    voci: [
      { q: "Cura le persone malate.", a: "medico" },
      { q: "Insegna agli studenti.", a: "insegnante" },
      { q: "Lavora con il computer e scrive programmi.", a: "programmatore" },
      { q: "Porta il cibo ai clienti in un ristorante.", a: "cameriere" },
      { q: "Scrive notizie e fa interviste.", a: "giornalista" },
      { q: "Costruisce case, edifici o strade.", a: "operaio edile" },
      { q: "Protegge le persone e lavora per la sicurezza.", a: "poliziotto" },
      { q: "Dipinge quadri e usa colori e pennelli.", a: "pittore" },
      { q: "Lavora con la legge e in tribunale.", a: "avvocato" },
      { q: "Ruba oggetti o denaro.", a: "ladro" }
    ]
  },

  "b2": {
    tipo: "abbina",
    opzioni: ["A. in un ristorante", "B. in un cantiere", "C. in uno studio legale", "D. in un ospedale", "E. in una scuola", "F. in una redazione", "G. in un ufficio o a casa", "H. in questura", "I. in uno studio d’arte", "J. per strada"],
    ordina: false,
    voci: [
      { q: "Il medico lavora…", a: "D. in un ospedale" },
      { q: "L’insegnante lavora…", a: "E. in una scuola" },
      { q: "Il programmatore lavora…", a: "G. in un ufficio o a casa" },
      { q: "Il cameriere lavora…", a: "A. in un ristorante" },
      { q: "Il giornalista lavora…", a: "F. in una redazione" },
      { q: "L’operaio edile lavora…", a: "B. in un cantiere" },
      { q: "Il poliziotto lavora…", a: "H. in questura" },
      { q: "Il pittore lavora…", a: "I. in uno studio d’arte" },
      { q: "L’avvocato lavora…", a: "C. in uno studio legale" },
      { q: "Il ladro “lavora”…", a: "J. per strada" }
    ]
  },

  "b4": {
    tipo: "buchi",
    banca: ["guida d’arte", "cuoco", "farmacista", "fotografo", "musicista", "architetto", "commessa", "autista", "segretaria", "traduttore"],
    voci: [
      { t: "Carlotta spiega ai visitatori le opere del museo. È una ___.", a: [["guida d'arte"]] },
      { t: "Marco prepara pasta, pizza e dolci in un ristorante. È un ___.", a: [["cuoco"]] },
      { t: "Lucia lavora in farmacia e vende medicine. È una ___.", a: [["farmacista"]] },
      { t: "Paolo fa foto di persone, città e monumenti. È un ___.", a: [["fotografo"]] },
      { t: "Roberto suona la chitarra e compone canzoni. È un ___.", a: [["musicista"]] },
      { t: "Giulia disegna case, palazzi e progetti. È un’___.", a: [["architetta", "architetto"]] },
      { t: "Sara lavora in un negozio e aiuta i clienti. È una ___.", a: [["commessa"]] },
      { t: "Luca guida l’autobus in città. È un ___.", a: [["autista"]] },
      { t: "Anna lavora in ufficio, risponde al telefono e organizza documenti. È una ___.", a: [["segretaria"]] },
      { t: "Matteo traduce testi dall’italiano allo spagnolo. È un ___.", a: [["traduttore"]] }
    ]
  },

  "b6": {
    tipo: "buchi",
    dialogo: true,
    voci: [
      { chi: "Luca", t: "Ciao, Anna! Che lavoro fai?", a: [] },
      { chi: "Anna", t: "Io ___ insegnante.", a: [["sono"]] },
      { chi: "Luca", t: "Dove ___?", a: [["lavori"]] },
      { chi: "Anna", t: "___ in una scuola. E tu che lavoro fai?", a: [["lavoro"]] },
      { chi: "Luca", t: "Io ___ medico.", a: [["sono"]] },
      { chi: "Anna", t: "Dove ___?", a: [["lavori"]] },
      { chi: "Luca", t: "___ in un ospedale.", a: [["lavoro"]] }
    ]
  },

  /* ---------------- C. Lettere e numeri ---------------- */
  "c1": {
    tipo: "scelta",
    comune: ["suono duro", "suono dolce"],
    voci: [
      { q: "casa", a: 0, say: "casa" },
      { q: "cena", a: 1, say: "cena" },
      { q: "cucina", a: 0, say: "cucina" },
      { q: "cinema", a: 1, say: "cinema" },
      { q: "chiesa", a: 0, say: "chiesa" },
      { q: "gatto", a: 0, say: "gatto" },
      { q: "gelato", a: 1, say: "gelato" },
      { q: "giro", a: 1, say: "giro" },
      { q: "spaghetti", a: 0, say: "spaghetti" },
      { q: "scena", a: 1, say: "scena" },
      { q: "schema", a: 0, say: "schema" },
      { q: "pesce", a: 1, say: "pesce" }
    ]
  },

  "c2": {
    tipo: "ascolta",
    istruzione: "Ascolta come si scrive il nome, lettera per lettera, e scrivilo.",
    voci: [
      { say: "erre. o. bi. e. erre. ti. o.", a: ["roberto"] },
      { say: "ci. a. erre. elle. o. ti. ti. a.", a: ["carlotta"] },
      { say: "enne. a. ti. a. elle. i. a.", a: ["natalia"] },
      { say: "gi. i. u. elle. i. a.", a: ["giulia"] },
      { say: "emme. a. erre. ci. o.", a: ["marco"] },
      { say: "esse. o. effe. i. a.", a: ["sofia"] }
    ]
  },

  "c3": {
    tipo: "ascolta",
    istruzione: "Ascolta il numero e scrivilo in cifre.",
    voci: [
      { say: "dodici", a: ["12"] },
      { say: "sette", a: ["7"] },
      { say: "quindici", a: ["15"] },
      { say: "tre", a: ["3"] },
      { say: "diciannove", a: ["19"] },
      { say: "dieci", a: ["10"] },
      { say: "quattordici", a: ["14"] },
      { say: "diciassette", a: ["17"] }
    ]
  },

  "c4": {
    tipo: "buchi",
    voci: [
      { t: "4 → ___", a: [["quattro"]] },
      { t: "9 → ___", a: [["nove"]] },
      { t: "11 → ___", a: [["undici"]] },
      { t: "13 → ___", a: [["tredici"]] },
      { t: "16 → ___", a: [["sedici"]] },
      { t: "18 → ___", a: [["diciotto"]] },
      { t: "6 → ___", a: [["sei"]] },
      { t: "20 → ___", a: [["venti"]] }
    ]
  },

  "c5": {
    tipo: "vf",
    voci: [
      { q: "Carlotta guida una visita agli Uffizi.", a: true },
      { q: "Natalia non ama il museo.", a: false },
      { q: "Oggi visitano tre sale.", a: true },
      { q: "La sala numero uno è vicina.", a: true },
      { q: "In una sala ci sono quattro quadri importanti.", a: true },
      { q: "La sala numero cinque è a dieci metri.", a: true }
    ]
  },

  "c6": {
    tipo: "scelta",
    voci: [
      { q: "Quanti anni ha il primo quadro?", o: ["Circa cinquanta.", "Circa cinquecento.", "Circa cinque."], a: 1 },
      { q: "Quante statue ci sono nella sala cinque?", o: ["Sei.", "Sette.", "Otto."], a: 0 },
      { q: "Quanti piccoli disegni ci sono?", o: ["Tre.", "Otto.", "Dodici."], a: 1 },
      { q: "Quanti ritratti ci sono sulla parete?", o: ["Dieci.", "Due.", "Dodici."], a: 2 },
      { q: "Quante opere ci sono nella sala dopo?", o: ["Quindici.", "Cinque.", "Quattordici."], a: 0 },
      { q: "In quale sala finisce la visita?", o: ["Nella sala numero dieci.", "Nella sala numero venti.", "Nella sala numero dodici."], a: 1 }
    ]
  },

  /* ---------------- D. Grammatica ---------------- */
  "d1": {
    tipo: "buchi",
    voci: [
      { t: "Io ___ Roberto.", a: [["sono"]] },
      { t: "Tu ___ italiano?", a: [["sei"]] },
      { t: "Lei ___ Carlotta.", a: [["è"]] },
      { t: "Natalia ___ veneziana.", a: [["è"]] },
      { t: "Noi ___ studenti.", a: [["siamo"]] },
      { t: "Voi ___ a Venezia?", a: [["siete"]] },
      { t: "Loro ___ guide d’arte.", a: [["sono"]] },
      { t: "Marco ___ un po’ nervoso.", a: [["è"]] }
    ]
  },

  "d2": {
    tipo: "buchi",
    voci: [
      { t: "Io ___ un libro.", a: [["ho"]] },
      { t: "Tu ___ una penna?", a: [["hai"]] },
      { t: "Natalia ___ 200 (duecento) anni.", a: [["ha"]] },
      { t: "Roberto ___ una fidanzata bellissima.", a: [["ha"]] },
      { t: "Carlotta ___ un lavoro interessante.", a: [["ha"]] },
      { t: "Noi ___ una lezione di italiano.", a: [["abbiamo"]] },
      { t: "Voi ___ paura?", a: [["avete"]] },
      { t: "Loro ___ fame.", a: [["hanno"]] }
    ]
  },

  "d3": {
    tipo: "buchi",
    voci: [
      { t: "Io ___ argentino.", a: [["sono"]] },
      { t: "Laura ___ un fidanzato un po’ pazzo.", a: [["ha"]] },
      { t: "Carlotta ___ guida d’arte.", a: [["è"]] },
      { t: "Roberto ___ a Venezia.", a: [["è"]] },
      { t: "Natalia ___ una maschera veneziana.", a: [["ha"]] },
      { t: "Marco ___ paura.", a: [["ha"]] },
      { t: "Noi ___ studenti stranieri.", a: [["siamo"]] },
      { t: "Voi ___ una domanda?", a: [["avete"]] }
    ]
  },

  "d4": {
    tipo: "buchi",
    lungo: true,
    voci: [
      { t: "Io sono italiano. → Io ___.", a: [["non sono italiano"]] },
      { t: "Tu hai fame. → Tu ___.", a: [["non hai fame"]] },
      { t: "Natalia è triste. → Natalia ___.", a: [["non è triste"]] },
      { t: "Roberto ha paura. → Roberto ___.", a: [["non ha paura"]] },
      { t: "Carlotta è in un museo. → Carlotta ___.", a: [["non è in un museo"]] },
      { t: "Noi abbiamo tempo. → Noi ___.", a: [["non abbiamo tempo"]] }
    ]
  },

  "d5": {
    tipo: "immagini",
    opzioni: ["Marco ha fame.", "Marco non ha soldi.", "Marco ha un libro.", "Marco non ha una penna.", "Marco ha paura.", "Marco non ha tempo."],
    voci: [
      { img: "img/marco/m1.webp", alt: "Marco con la mano sulla pancia pensa a un piatto", a: "Marco ha fame." },
      { img: "img/marco/m2.webp", alt: "Marco guarda il portafoglio vuoto", a: "Marco non ha soldi." },
      { img: "img/marco/m3.webp", alt: "Marco mostra un libro blu", a: "Marco ha un libro." },
      { img: "img/marco/m4.webp", alt: "Marco cerca nelle tasche del cappotto", a: "Marco non ha una penna." },
      { img: "img/marco/m5.webp", alt: "Marco ha gli occhi spalancati e trema", a: "Marco ha paura." },
      { img: "img/marco/m6.webp", alt: "Marco guarda l’orologio preoccupato", a: "Marco non ha tempo." }
    ]
  },

  /* ---------------- E. Cultura italiana ---------------- */
  "e1": {
    tipo: "immagini",
    opzioni: ["Firenze", "Milano", "Napoli", "Roma", "Venezia"],
    voci: [
      { img: "img/cultura-roma.webp", alt: "Un ragazzo davanti al Colosseo", a: "Roma" },
      { img: "img/cultura-milano.webp", alt: "Una ragazza davanti al Duomo con le guglie bianche", a: "Milano" },
      { img: "img/cultura-venezia.webp", alt: "Natalia su un canale con una gondola", a: "Venezia" },
      { img: "img/cultura-napoli.webp", alt: "Roberto con il Vesuvio sullo sfondo", a: "Napoli" },
      { img: "img/cultura-firenze.webp", alt: "Carlotta nel cortile degli Uffizi con la cupola del Duomo", a: "Firenze" }
    ]
  },

  "e2": {
    tipo: "scelta",
    voci: [
      { q: "Perché l’Italia è un paese famoso nel mondo?", o: ["Solo per la pizza.", "Per la cucina, l’arte, la storia, la musica e la bellezza.", "Per le spiagge tropicali."], a: 1 },
      { q: "Quali cibi e bevande italiani sono citati nel testo?", o: ["Pizza, pasta, gelato e caffè.", "Paella, tè e birra.", "Sushi e vino."], a: 0 },
      { q: "Che cosa si può vedere nelle città italiane?", o: ["Grattacieli e deserti.", "Monumenti, musei, chiese, piazze e fontane.", "Solo negozi."], a: 1 },
      { q: "Per che cosa è famosa Firenze?", o: ["Per il Rinascimento e le sue opere d’arte.", "Per i canali e le gondole.", "Per il Colosseo."], a: 0 },
      { q: "Quali altre città italiane sono nominate nel testo?", o: ["Madrid e Lisbona.", "Venezia, Milano, Napoli, Torino e Bologna.", "Parigi e Londra."], a: 1 },
      { q: "Come viene descritta la lingua italiana?", o: ["Musicale ed elegante.", "Fredda e difficile.", "Moderna e tecnica."], a: 0 },
      { q: "Quali parole italiane sono famose nel mondo?", o: ["Hello e thank you.", "Pizza, pasta, opera, bravo, ciao.", "Hola e gracias."], a: 1 },
      { q: "Che cosa rende unica ogni regione italiana?", o: ["Tradizioni, piatti tipici e storie diverse.", "Gli stessi piatti in tutte le regioni.", "Il clima freddo."], a: 0 }
    ]
  },

  /* ---------------- F. Fumetti ---------------- */
  "f1": {
    tipo: "scelta",
    voci: [
      { q: "Dove sono i ragazzi?", o: ["A Roma, al Colosseo.", "A Venezia, al Carnevale.", "A Firenze, agli Uffizi."], a: 1 },
      { q: "Come si chiama il ragazzo con Roberto e Laura?", o: ["Marco", "Alessio", "Luca"], a: 1 },
      { q: "Di dove è Alessio?", o: ["È di Roma.", "È di Firenze.", "È di Venezia."], a: 0 },
      { q: "Di dove è Laura?", o: ["È di Milano.", "È di Roma.", "È di Firenze."], a: 2 },
      { q: "Roberto è…", o: ["italiano.", "argentino.", "spagnolo."], a: 1 },
      { q: "Chi dice “Che succede?”", o: ["Alessio", "Laura", "Roberto"], a: 0 },
      { q: "Che cosa vede Roberto?", o: ["Una donna bellissima con una maschera.", "Un ladro.", "Una gondola."], a: 0 },
      { q: "Secondo Alessio, che cos’è?", o: ["Un mistero.", "La magia del Carnevale.", "Un sogno."], a: 1 }
    ]
  },

  "f2": {
    tipo: "buchi",
    dialogo: true,
    voci: [
      { chi: "Roberto", t: "Ciao! Io ___ Roberto.", a: [["sono"]] },
      { chi: "Alessio", t: "Piacere! Io sono Alessio. ___ di Roma.", a: [["sono"]] },
      { chi: "Laura", t: "E io sono Laura. Io sono ___ Firenze.", a: [["di"]] },
      { chi: "Roberto", t: "Io sono ___.", a: [["argentino"]] },
      { chi: "Alessio", t: "Che ___?", a: [["succede"]] },
      { chi: "Roberto", t: "Niente. Solo che c’è una donna ___.", a: [["bellissima"]] }
    ]
  }
};

/* Frasi per le flashcard (G. Note importanti) — traduzione in russo */
window.CARTE = [
  { titolo: "Saluti", carte: [
    ["Ciao!", "Привет! / Пока!"], ["Buongiorno!", "Доброе утро! / Добрый день!"], ["Buon pomeriggio!", "Добрый день! (после обеда)"],
    ["Buonasera!", "Добрый вечер!"], ["Buonanotte!", "Спокойной ночи!"],
    ["Arrivederci!", "До свидания!"], ["A presto!", "До скорого!"], ["A domani!", "До завтра!"] ] },
  { titolo: "Parole gentili", carte: [
    ["Per favore", "Пожалуйста (просьба)"], ["Grazie", "Спасибо"], ["Grazie mille", "Большое спасибо"], ["Prego", "Пожалуйста / Не за что"],
    ["Scusa", "Извини"], ["Mi dispiace", "Мне жаль"], ["Va bene", "Хорошо / Ладно"], ["Non c’è problema", "Нет проблем"] ] },
  { titolo: "Prime domande", carte: [
    ["Come stai?", "Как ты? / Как дела?"], ["Come va?", "Как дела?"], ["Come ti chiami?", "Как тебя зовут?"],
    ["Di dove sei?", "Откуда ты?"], ["Quanti anni hai?", "Сколько тебе лет?"], ["Parli italiano?", "Ты говоришь по-итальянски?"], ["Capisci?", "Понимаешь?"] ] },
  { titolo: "Prime risposte", carte: [
    ["Sto bene.", "У меня всё хорошо."], ["Sto molto bene.", "У меня всё очень хорошо."], ["Così così.", "Так себе."],
    ["Mi chiamo Roberto.", "Меня зовут Роберто."], ["Sono argentino. / Sono argentina.", "Я аргентинец. / Я аргентинка."],
    ["Sono di Buenos Aires.", "Я из Буэнос-Айреса."], ["Ho quarantuno anni.", "Мне сорок один год."],
    ["Parlo un po’ italiano.", "Я немного говорю по-итальянски."], ["Non capisco.", "Я не понимаю."] ] },
  { titolo: "Parole molto importanti", carte: [
    ["Sì", "Да"], ["No", "Нет"], ["Forse", "Может быть"], ["Bene", "Хорошо"], ["Male", "Плохо"], ["Molto", "Много / Очень"],
    ["Poco", "Мало"], ["Adesso", "Сейчас"], ["Oggi", "Сегодня"], ["Domani", "Завтра"], ["Ieri", "Вчера"] ] },
  { titolo: "Frasi utili in classe", carte: [
    ["Puoi ripetere, per favore?", "Можешь повторить, пожалуйста?"], ["Come si dice in italiano?", "Как это сказать по-итальянски?"],
    ["Che significa?", "Что это значит?"], ["Non lo so.", "Я не знаю."], ["Ho una domanda.", "У меня вопрос."],
    ["È facile.", "Это легко."], ["È difficile.", "Это трудно."] ] }
];
