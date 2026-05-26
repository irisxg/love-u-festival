// ==============================
// SUPER SMOOTH PINCH + PAN ENGINE (FINAL FIXED VERSION)
// ==============================

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

// ==============================
// BEREKEN MINIMALE SCALE
// ==============================

function updateMinScale() {
  const mapW = inner.offsetWidth;
  const mapH = inner.offsetHeight;

  const vpW = viewport.offsetWidth;
  const vpH = viewport.offsetHeight;

  // kaart moet minstens zo groot zijn als viewport
  minScale = Math.max(vpW / mapW, vpH / mapH);

  if (scale < minScale) {
    scale = minScale;
  }
}

// ==============================
// PERFECTE CLAMP (EINDELIJK GOED)
// ==============================

function clampPan() {
  const mapW = inner.offsetWidth * scale;
  const mapH = inner.offsetHeight * scale;

  const vpW = viewport.offsetWidth;
  const vpH = viewport.offsetHeight;

  // maximale pan-ruimte
  const maxX = 0;
  const maxY = 0;

  const minX = vpW - mapW;
  const minY = vpH - mapH;

  // als kaart kleiner is dan viewport → centreren
  if (mapW <= vpW) {
    tx = (vpW - mapW) / 2;
  } else {
    tx = clamp(tx, minX, maxX);
  }

  if (mapH <= vpH) {
    ty = (vpH - mapH) / 2;
  } else {
    ty = clamp(ty, minY, maxY);
  }
}

// ==============================
// APPLY TRANSFORM
// ==============================

function applyTransform() {
  clampPan();
  inner.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

  // markers blijven mooi
  document.querySelectorAll(".marker, .user-marker").forEach(m => {
    m.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
  });
}

// ==============================
// ZOOM AT POINT
// ==============================

function zoomAt(cx, cy, factor) {
  const newScale = clamp(scale * factor, minScale, 4);
  if (newScale === scale) return;

  const k = newScale / scale;

  tx = cx - k * (cx - tx);
  ty = cy - k * (cy - ty);

  scale = newScale;
  applyTransform();
}

// ==============================
// WHEEL ZOOM
// ==============================

viewport.addEventListener("wheel", (e) => {
  e.preventDefault();
  const r = viewport.getBoundingClientRect();
  zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
}, { passive: false });

// ==============================
// POINTER EVENTS (PAN + PINCH)
// ==============================

viewport.addEventListener("pointerdown", (e) => {
  viewport.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  e.preventDefault();
});

viewport.addEventListener("pointermove", (e) => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  e.preventDefault();

  if (pointers.size === 1) {
    // PAN
    const p = [...pointers.values()][0];
    if (!gesture) gesture = { p, tx, ty };
    tx = gesture.tx + (p.x - gesture.p.x);
    ty = gesture.ty + (p.y - gesture.p.y);
    applyTransform();

  } else if (pointers.size === 2) {
    // PINCH
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

// ==============================
// ZOOM BUTTONS
// ==============================

document.getElementById("zoom-in")?.addEventListener("click", () => {
  const r = viewport.getBoundingClientRect();
  zoomAt(r.width / 2, r.height / 2, 1.2);
});

document.getElementById("zoom-out")?.addEventListener("click", () => {
  const r = viewport.getBoundingClientRect();
  zoomAt(r.width / 2, r.height / 2, 1 / 1.2);
});

// ==============================
// POPUP
// ==============================

const popup = document.getElementById("popup-card");

document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    document.getElementById("popup-title").innerText = marker.dataset.title;
    document.getElementById("popup-current").innerText = marker.dataset.current;
    document.getElementById("popup-next").innerText = marker.dataset.next;
    popup.classList.remove("hidden");
  });
});

// ==============================
// USER LOCATION
// ==============================

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
}

// ==============================
// INIT
// ==============================

updateMinScale();
applyTransform();
window.addEventListener("resize", () => {
  updateMinScale();
  applyTransform();
});
