import { scheduleData, getCurrentAct, getNextAct } from "./schedule.js";

/* =========================================================
   SUPER SMOOTH PINCH + PAN ENGINE
========================================================= */

const viewport = document.getElementById("map-container");
const inner = document.getElementById("map-content");

let scale = 1;
let tx = 0;
let ty = 0;
let minScale = 1;

const pointers = new Map();
let gesture = null;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/* =========================================================
   MIN SCALE
========================================================= */

function updateMinScale() {
  const mapW = inner.offsetWidth;
  const mapH = inner.offsetHeight;

  const vpW = viewport.offsetWidth;
  const vpH = viewport.offsetHeight;

  minScale = Math.max(vpW / mapW, vpH / mapH);

  if (scale < minScale) scale = minScale;
}

/* =========================================================
   CLAMP PAN
========================================================= */

function clampPan() {
  const mapW = inner.offsetWidth * scale;
  const mapH = inner.offsetHeight * scale;

  const vpW = viewport.offsetWidth;
  const vpH = viewport.offsetHeight;

  const maxX = 0;
  const maxY = 0;

  const minX = vpW - mapW;
  const minY = vpH - mapH;

  if (mapW <= vpW) tx = (vpW - mapW) / 2;
  else tx = clamp(tx, minX, maxX);

  if (mapH <= vpH) ty = (vpH - mapH) / 2;
  else ty = clamp(ty, minY, maxY);
}

/* =========================================================
   APPLY TRANSFORM
========================================================= */

function applyTransform() {
  clampPan();
  inner.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

  document.querySelectorAll(".marker, .user-marker").forEach(m => {
    m.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
  });
}

/* =========================================================
   ZOOM AT POINT
========================================================= */

function zoomAt(cx, cy, factor) {
  const newScale = clamp(scale * factor, minScale, 4);
  if (newScale === scale) return;

  const k = newScale / scale;

  tx = cx - k * (cx - tx);
  ty = cy - k * (cy - ty);

  scale = newScale;
  applyTransform();
}

/* =========================================================
   WHEEL ZOOM
========================================================= */

viewport.addEventListener("wheel", (e) => {
  e.preventDefault();
  const r = viewport.getBoundingClientRect();
  zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
}, { passive: false });

/* =========================================================
   POINTER EVENTS (PAN + PINCH)
========================================================= */

viewport.addEventListener("pointerdown", (e) => {
  viewport.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  gesture = null;
  e.preventDefault();
});

viewport.addEventListener("pointermove", (e) => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  e.preventDefault();

  if (pointers.size === 1) {
    const p = [...pointers.values()][0];
    if (!gesture) gesture = { p, tx, ty };
    tx = gesture.tx + (p.x - gesture.p.x);
    ty = gesture.ty + (p.y - gesture.p.y);
    applyTransform();

  } else if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };

    if (!gesture) gesture = { a, b, d: dist(a, b), m, scale, tx, ty };

    const k = clamp((dist(a, b) / gesture.d) * gesture.scale, minScale, 4);
    const rel = k / gesture.scale;

    tx = m.x - (gesture.m.x - gesture.tx) * rel;
    ty = m.y - (gesture.m.y - gesture.ty) * rel;
    scale = k;

    applyTransform();
  }
});

["pointerup", "pointercancel", "pointerleave"].forEach(t => {
  viewport.addEventListener(t, (e) => {
    pointers.delete(e.pointerId);
    gesture = null;
  });
});

/* =========================================================
   POPUP LOGIC (STAGE + SERVICE)
========================================================= */

const popup = document.getElementById("popup-card");

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", (e) => {
    e.stopPropagation();

    const type = marker.dataset.type;

    /* --------------------------
       SERVICE POPUP
    -------------------------- */
    if (type === "service") {

      const now = new Date();
      const hour = now.getHours();
      const isOpen = hour >= 12 && hour < 23;

      document.getElementById("popup-title").innerText = marker.dataset.title;
      document.getElementById("popup-status").innerText = "";

      // LIVE BADGE = OPEN / DICHT
      const liveBadge = document.querySelector(".live-badge");
      liveBadge.innerText = isOpen ? "OPEN" : "DICHT";
      liveBadge.style.display = "inline-block";

      // CURRENT = Openingstijden
      document.getElementById("popup-current").innerText =
        "Opening Hours: 12:00 – 23:00";

      // NEXT = niet voor services
      document.getElementById("popup-next").innerText = "";
      document.querySelector(".popup-next").style.display = "none";

      // Geen foto bij services
      document.querySelector(".popup-image").style.display = "none";

      updateFavoriteStatus(marker.dataset.title);
      setupFavoriteButtons(marker.dataset.title);

      popup.classList.remove("hidden");
      return;
    }

    /* --------------------------
       STAGE POPUP (JSON)
    -------------------------- */
    if (type === "stage") {

      const stage = marker.dataset.stage;
      const day = "Zaterdag";

      const current = getCurrentAct(stage, day);
      const next = getNextAct(stage, day);

      document.getElementById("popup-title").innerText = stage;
      document.getElementById("popup-status").innerText = "Festival Area";

      document.getElementById("popup-current").innerText =
        current ? `${current.name} (${current.start}–${current.end})` : "Geen act bezig";

      document.getElementById("popup-next").innerText =
        next ? `${next.name} (${next.start}–${next.end})` : "—";

      if (current?.type === "artist") {
        document.querySelector(".popup-image img").src = current.image;
        document.querySelector(".popup-image").style.display = "block";
      } else {
        document.querySelector(".popup-image").style.display = "none";
      }

      const liveBadge = document.querySelector(".live-badge");
      liveBadge.innerText = current ? "LIVE" : "";
      liveBadge.style.display = current ? "inline-block" : "none";

      updateFavoriteStatus(stage);
      setupFavoriteButtons(stage);

      popup.classList.remove("hidden");
    }
  });
});

/* =========================================================
   FAVORIETEN SYSTEEM
========================================================= */

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function isFavorite(title) {
  return favorites.includes(title);
}

function toggleFavorite(title) {
  if (isFavorite(title)) {
    favorites = favorites.filter(t => t !== title);
  } else {
    favorites.push(title);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

/* =========================================================
   UPDATE FAVORIET ICON
========================================================= */

function updateFavoriteStatus(title) {
  const icon = document.getElementById("favorite-status-icon");
  const btn = document.getElementById("favorite-status");

  if (!icon || !btn) return;

  if (isFavorite(title)) {
    icon.innerText = "star";
    btn.classList.add("active");
  } else {
    icon.innerText = "star_border";
    btn.classList.remove("active");
  }
}

/* =========================================================
   FAVORITE BUTTON LOGIC
========================================================= */

function setupFavoriteButtons(title) {
  document.getElementById("favorite-toggle").onclick = () => {
    toggleFavorite(title);
    updateFavoriteStatus(title);
  };

  document.getElementById("favorite-status").style.pointerEvents = "none";
}

/* =========================================================
   FAVORIETEN POPUP
========================================================= */

const favPopup = document.getElementById("favorites-popup");
const favList = document.getElementById("favorites-list");
const favClose = document.getElementById("favorites-close");

document.getElementById("favorites-list-btn").addEventListener("click", () => {

  favList.innerHTML = "";

  if (favorites.length === 0) {
    favList.innerHTML = `<p>Je hebt nog geen favorieten.</p>`;
  } else {
    favorites.forEach(f => {
      favList.innerHTML += `
        <div class="favorite-item">
            <span>${f}</span>
            <span class="material-symbols-outlined">star</span>
        </div>
      `;
    });
  }

  favPopup.classList.remove("hidden");
});

favClose.addEventListener("click", () => {
  favPopup.classList.add("hidden");
});

/* =========================================================
   POPUP CLOSE
========================================================= */

document.addEventListener("pointerdown", (e) => {

  if (popup.classList.contains("hidden")) return;

  if (popup.contains(e.target)) return;

  if (e.target.closest(".marker")) return;

  if (e.target.closest(".map-controls")) return;

  popup.classList.add("hidden");
});

/* =========================================================
   SEARCH FUNCTION
========================================================= */

const searchInput = document.getElementById("search-input");

function runSearch(query) {
  document.querySelectorAll(".marker").forEach(marker => {
    const label =
      (marker.dataset.stage || marker.dataset.title || "").toLowerCase();
    marker.style.display = label.includes(query.toLowerCase()) ? "block" : "none";
  });
}

searchInput?.addEventListener("input", () => {
  runSearch(searchInput.value);
});

/* =========================================================
   VOICE SEARCH
========================================================= */

const micBtn = document.getElementById("voice-search");

let recognition = null;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  recognition.lang = "nl-NL";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript;
    runSearch(transcript);
  };

  recognition.onerror = (event) => {
    console.warn("Microfoon fout:", event.error);
  };

}

micBtn?.addEventListener("click", () => {
  if (!recognition) {
    alert("Je browser ondersteunt spraakherkenning niet.");
    return;
  }

  recognition.start();

  micBtn.style.color = "#ff5545";
  setTimeout(() => micBtn.style.color = "", 800);
});

/* =========================================================
   GPS FOLLOW
========================================================= */

const userMarker = document.querySelector(".user-marker");

let userX = 0.5;
let userY = 0.5;
let lastGps = null;
let followUser = false;

const metersPerLat = 111320;
const metersPerLng = 71460;

function updateUserMarker() {
  userMarker.style.left = (userX * 100) + "%";
  userMarker.style.top = (userY * 100) + "%";
}

function handleGps(pos) {
  const { latitude, longitude } = pos.coords;

  if (lastGps) {
    const dLat = latitude - lastGps.lat;
    const dLng = longitude - lastGps.lng;

    const metersY = dLat * metersPerLat;
    const metersX = dLng * metersPerLng;

    const factor = 0.0008;

    userX += metersX * factor;
    userY -= metersY * factor;

    userX = clamp(userX, 0.05, 0.95);
    userY = clamp(userY, 0.05, 0.95);
  }

  lastGps = { lat: latitude, lng: longitude };
  updateUserMarker();

  if (followUser) {
    const px = userX * inner.offsetWidth;
    const py = userY * inner.offsetHeight;

    const vpW = viewport.offsetWidth;
    const vpH = viewport.offsetHeight;

    tx = vpW / 2 - px * scale;
    ty = vpH / 2 - py * scale;

    applyTransform();
  }
}

navigator.geolocation.watchPosition(
  handleGps,
  (err) => console.warn("GPS error", err),
  { enableHighAccuracy: true, maximumAge: 500, timeout: 10000 }
);

/* =========================================================
   MY LOCATION BUTTON
========================================================= */

document.getElementById("my-location")?.addEventListener("click", () => {
  followUser = true;

  scale = Math.max(scale, 2.5);

  const px = userX * inner.offsetWidth;
  const py = userY * inner.offsetHeight;

  const vpW = viewport.offsetWidth;
  const vpH = viewport.offsetHeight;

  tx = vpW / 2 - px * scale;
  ty = vpH / 2 - py * scale;

  applyTransform();
});

/* =========================================================
   INIT
========================================================= */

updateMinScale();
applyTransform();

window.addEventListener("resize", () => {
  updateMinScale();
  applyTransform();
});
