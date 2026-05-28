/* =========================================================
   SCHEDULE DATA HOLDER
========================================================= */

export let scheduleData = {};   // <-- DIT ontbrak bij jou

/* =========================================================
   LOAD SCHEDULE JSON
========================================================= */

fetch("assets/data/artists.json")
  .then(res => res.json())
  .then(data => {
    scheduleData = data;
  });

/* =========================================================
   TIME HELPERS
========================================================= */

export function getTimeString() {
  const now = new Date();
  return (
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0")
  );
}

/* =========================================================
   GET CURRENT ACT
========================================================= */

export function getCurrentAct(stage, day) {
  const acts = scheduleData[day]?.[stage];
  if (!acts) return null;

  const now = getTimeString();
  return acts.find(a => a.start <= now && a.end >= now) || null;
}

/* =========================================================
   GET NEXT ACT
========================================================= */

export function getNextAct(stage, day) {
  const acts = scheduleData[day]?.[stage];
  if (!acts) return null;

  const now = getTimeString();
  return acts.find(a => a.start > now) || null;
}
