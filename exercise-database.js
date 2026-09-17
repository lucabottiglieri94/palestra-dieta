/* ICON RECOMP — Database esercizi più utilizzati
   Database locale: nessuna API YouTube necessaria.
   Il Coach può usare getExerciseGuide(nome) per ottenere descrizione, muscoli e ricerca video.
*/
(function () {
  const EXERCISE_DATABASE = {
    "panca piana": { aliases:["bench press","panca con bilanciere"], category:"Petto", muscles:["Gran pettorale","Tricipiti","Deltoide anteriore"], equipment:"Bilanciere e panca", tips:"Scapole addotte, piedi stabili, discesa controllata al petto." },
    "panca inclinata manubri": { aliases:["incline dumbbell press","panca inclinata"], category:"Petto", muscles:["Pettorale alto","Tricipiti","Spalle"], equipment:"Manubri e panca inclinata", tips:"Mantieni i gomiti leggermente sotto i polsi e non inarcare eccessivamente la schiena." },
    "chest press": { aliases:["pressa petto","machine chest press"], category:"Petto", muscles:["Gran pettorale","Tricipiti"], equipment:"Macchina", tips:"Regola il sedile, spingi senza bloccare violentemente i gomiti." },
    "croci ai cavi": { aliases:["cable fly","cable crossover","croci cavi"], category:"Petto", muscles:["Gran pettorale"], equipment:"Cavi", tips:"Braccia semi-flesse, chiudi davanti al petto senza slanciare." },
    "lat machine": { aliases:["lat pulldown","pulley verticale"], category:"Schiena", muscles:["Gran dorsale","Bicipiti"], equipment:"Lat machine", tips:"Tira verso la parte alta del petto, evitando di dondolare." },
    "rematore manubrio": { aliases:["one arm dumbbell row","rematore"], category:"Schiena", muscles:["Dorsali","Romboidi","Bicipiti"], equipment:"Manubrio e panca", tips:"Schiena neutra, porta il gomito verso il fianco." },
    "seated row": { aliases:["pulley basso","cable row","rematore ai cavi"], category:"Schiena", muscles:["Dorsali","Romboidi","Trapezio"], equipment:"Cavo basso", tips:"Petto aperto e ritorno lento senza incurvare la schiena." },
    "military press": { aliases:["shoulder press","overhead press","spinte sopra la testa"], category:"Spalle", muscles:["Deltoidi","Tricipiti"], equipment:"Bilanciere o macchina", tips:"Contrai l'addome e non compensare con la zona lombare." },
    "alzate laterali": { aliases:["lateral raises","side raises"], category:"Spalle", muscles:["Deltoide laterale"], equipment:"Manubri o cavi", tips:"Solleva fino circa all'altezza delle spalle con movimento controllato." },
    "curl manubri": { aliases:["dumbbell curl","curl bicipiti"], category:"Bicipiti", muscles:["Bicipite brachiale","Brachiale"], equipment:"Manubri", tips:"Gomiti fermi vicino al busto, evita di oscillare." },
    "curl bilanciere": { aliases:["barbell curl","curl ez"], category:"Bicipiti", muscles:["Bicipite brachiale"], equipment:"Bilanciere", tips:"Salita controllata e discesa completa senza slancio." },
    "pushdown tricipiti": { aliases:["triceps pushdown","push down cavo"], category:"Tricipiti", muscles:["Tricipite"], equipment:"Cavo alto", tips:"Gomiti fermi, estendi completamente gli avambracci." },
    "squat": { aliases:["back squat","squat bilanciere"], category:"Gambe", muscles:["Quadricipiti","Glutei","Femorali"], equipment:"Bilanciere", tips:"Ginocchia in linea con i piedi, schiena neutra e profondità controllata." },
    "leg press": { aliases:["pressa 45","pressa gambe"], category:"Gambe", muscles:["Quadricipiti","Glutei","Femorali"], equipment:"Leg press", tips:"Non staccare il bacino dallo schienale e non bloccare le ginocchia." },
    "leg extension": { aliases:["estensioni gambe","extension quadricipiti"], category:"Gambe", muscles:["Quadricipiti"], equipment:"Macchina", tips:"Movimento lento, fermo breve in massima contrazione." },
    "leg curl": { aliases:["seated leg curl","lying leg curl","femorali macchina"], category:"Gambe", muscles:["Femorali"], equipment:"Macchina", tips:"Mantieni il bacino stabile e controlla il ritorno." },
    "calf raise": { aliases:["polpacci","standing calf raise","calf machine"], category:"Polpacci", muscles:["Gastrocnemio","Soleo"], equipment:"Macchina o multipower", tips:"Massima escursione: allungamento in basso e contrazione in alto." },
    "plank": { aliases:["isometria plank","plank addominali"], category:"Core", muscles:["Addome","Trasverso","Lombari"], equipment:"Corpo libero", tips:"Corpo in linea, glutei e addome contratti, non inarcare la schiena." },
    "crunch": { aliases:["crunch addominali","cable crunch"], category:"Core", muscles:["Retto addominale"], equipment:"Corpo libero o cavo", tips:"Arrotola il busto senza tirare il collo." },
    "stacco rumeno": { aliases:["romanian deadlift","rdl","stacco gambe tese"], category:"Gambe", muscles:["Femorali","Glutei","Lombari"], equipment:"Bilanciere o manubri", tips:"Spingi il bacino indietro mantenendo la schiena neutra." }
  };

  function normalizeExerciseName(value) {
    return String(value || '').toLowerCase().trim().replace(/[àáâä]/g,'a').replace(/[èéêë]/g,'e').replace(/[ìíîï]/g,'i').replace(/[òóôö]/g,'o').replace(/[ùúûü]/g,'u');
  }

  function getExerciseGuide(name) {
    const key = normalizeExerciseName(name);
    let foundKey = Object.keys(EXERCISE_DATABASE).find(k => key === k || key.includes(k) || EXERCISE_DATABASE[k].aliases.some(a => key === normalizeExerciseName(a) || key.includes(normalizeExerciseName(a))));
    const item = foundKey ? EXERCISE_DATABASE[foundKey] : { category:'Altro', muscles:[], equipment:'Variabile', tips:'Esegui il movimento lentamente e con tecnica controllata.' };
    const searchTerm = encodeURIComponent(`${name} tecnica esecuzione palestra`);
    return { name, canonicalName: foundKey || name, ...item, youtubeSearchUrl:`https://www.youtube.com/results?search_query=${searchTerm}` };
  }

  window.EXERCISE_DATABASE = EXERCISE_DATABASE;
  window.getExerciseGuide = getExerciseGuide;
  window.normalizeExerciseName = normalizeExerciseName;
})();
