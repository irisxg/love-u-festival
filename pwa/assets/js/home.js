import { scheduleData, getTimeString } from "./schedule.js";

/* =========================================================
   FAVORIETEN (ALLEEN TONEN)
========================================================= */

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function findActByName(name) {
    for (const day in scheduleData) {
        for (const stage in scheduleData[day]) {
            const found = scheduleData[day][stage].find(a => a.name === name);
            if (found) return found;
        }
    }
    return null;
}

function renderFavorites() {
    const section = document.getElementById("favorites-section");
    const list = document.getElementById("favorites-list");

    if (!favorites.length) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    list.innerHTML = "";

    favorites.forEach(name => {
        const act = findActByName(name);
        if (!act) return;

        const card = document.createElement("div");
        card.classList.add("program-card");

        const imgHTML = act.image
            ? `<img src="${act.image}" alt="${act.name}">`
            : "";

        card.innerHTML = `
            ${imgHTML}
            <div class="program-info">
                <span class="time">${act.start} — ${act.end} | ${act.stage}</span>
                <h4>${act.name}</h4>
                <p>${act.short || "Straks live op het festival."}</p>
                <button class="btn">BEKIJK VOLLEDIG PROGRAMMA</button>
            </div>
        `;

        card.querySelector(".btn").onclick = () => {
            window.location.href = "programma.php";
        };

        list.appendChild(card);
    });
}

/* =========================================================
   PROGRAMMA NU
========================================================= */

function isNowBetween(start, end) {
    const now = getTimeString();
    return start <= now && now <= end;
}

function collectActs(dayKey) {
    const day = scheduleData[dayKey];
    if (!day) return [];

    const result = [];

    Object.keys(day).forEach(stage => {
        day[stage].forEach(act => {
            result.push({ ...act, stage });
        });
    });

    return result;
}

function getLiveActs(dayKey) {
    return collectActs(dayKey).filter(a => isNowBetween(a.start, a.end));
}

function getNextAct(dayKey) {
    const now = getTimeString();
    const upcoming = collectActs(dayKey).filter(a => a.start > now);
    upcoming.sort((a, b) => a.start.localeCompare(b.start));
    return upcoming[0] || null;
}

function renderProgramNow() {
    const container = document.getElementById("program-now");
    container.innerHTML = "";

    const dayKey = "Zaterdag";

    const live = getLiveActs(dayKey);

    if (live.length > 0) {
        live.forEach(act => renderCard(act, container));
    } else {
        const next = getNextAct(dayKey);
        if (next) renderCard(next, container);
        else container.innerHTML = "<p>Geen acts gepland.</p>";
    }
}

function renderCard(act, container) {
    const card = document.createElement("div");
    card.classList.add("program-card");

    const imgHTML = act.image
        ? `<img src="${act.image}" alt="${act.name}">`
        : "";

    card.innerHTML = `
        ${imgHTML}
        <div class="program-info">
            <span class="time">${act.start} — ${act.end} | ${act.stage}</span>
            <h4>${act.name}</h4>
            <p>${act.short || "Straks live op het festival."}</p>
            <button class="btn">BEKIJK VOLLEDIG PROGRAMMA</button>
        </div>
    `;

    card.querySelector(".btn").onclick = () => {
        window.location.href = "programma.php";
    };

    container.appendChild(card);
}

/* =========================================================
   WEER
========================================================= */

function getWeatherAdvice(temp) {
    if (temp <= 5) return "Erg koud — draag een dikke jas.";
    if (temp <= 10) return "Koud — warme kleding aanbevolen.";
    if (temp <= 18) return "Fris — neem een trui mee.";
    if (temp <= 25) return "Perfect festivalweer!";
    if (temp <= 30) return "Warm — drink genoeg water.";
    return "Heet — zoek schaduw op.";
}

async function loadWeatherNews(lat, lon) {
    const box = document.getElementById("weather-news-content");

    try {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const data = await res.json();

        const w = data.current_weather;

        box.innerHTML = `
            <div class="temp">${w.temperature}°C</div>
            <div class="desc">${getWeatherAdvice(w.temperature)}</div>
        `;
    } catch {
        box.innerHTML = "<p>Weer niet beschikbaar.</p>";
    }
}

function initWeatherNews() {
    if (!navigator.geolocation) {
        loadWeatherNews(52.0907, 5.1214);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        pos => loadWeatherNews(pos.coords.latitude, pos.coords.longitude),
        () => loadWeatherNews(52.0907, 5.1214)
    );
}

/* =========================================================
   FAVORIETEN ACTIVATIE POPUP
========================================================= */

const activateBtn = document.getElementById("activate-favorites");
const popup = document.getElementById("favorites-activate-popup");
const popupClose = document.getElementById("favorites-popup-close");

activateBtn.onclick = () => {
    popup.classList.remove("hidden");
};

popupClose.onclick = () => {
    popup.classList.add("hidden");
};

/* =========================================================
   INIT
========================================================= */

const wait = setInterval(() => {
    if (Object.keys(scheduleData).length > 0) {
        clearInterval(wait);
        renderFavorites();
        renderProgramNow();
        initWeatherNews();
    }
}, 50);
