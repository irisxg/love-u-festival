import { scheduleData, getTimeString } from "./schedule.js";

/* =========================================================
   FAVORIETEN
========================================================= */

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(name) {
    return favorites.includes(name);
}

function toggleFavorite(name) {
    if (isFavorite(name)) {
        favorites = favorites.filter(f => f !== name);
    } else {
        favorites.push(name);
    }
    saveFavorites();
    renderFavorites();
    renderProgram();
}

/* =========================================================
   FAVORIETEN BLOK
========================================================= */

function renderFavorites() {
    const section = document.getElementById("favorites-section");
    const list = document.getElementById("favorites-list");

    if (!section || !list) return;

    if (favorites.length === 0) {
        section.style.display = "none";
        return;
    }

    section.style.display = "block";
    list.innerHTML = "";

    favorites.forEach(name => {
        const act = findAct(name);
        if (!act) return;

        const div = document.createElement("div");
        div.classList.add("fav-card");

        div.innerHTML = `
            <div class="fav-title">${act.name}</div>
            <div class="fav-time">${act.start} – ${act.end} • ${act.stage}</div>
        `;

        list.appendChild(div);
    });
}

function findAct(name) {
    for (const day in scheduleData) {
        for (const stage in scheduleData[day]) {
            const found = scheduleData[day][stage].find(a => a.name === name);
            if (found) return found;
        }
    }
    return null;
}

/* =========================================================
   HELPERS
========================================================= */

function isNowBetween(start, end) {
    const now = getTimeString();
    return start <= now && now <= end;
}

function toEmbedUrl(url) {
    if (!url) return "";
    if (url.includes("watch?v=")) {
        const id = url.split("watch?v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
    }
    return url;
}

/* =========================================================
   ARTIST POPUP (ZONDER HARTJE)
========================================================= */

const modal = document.getElementById("artist-modal");
const modalBackdrop = document.getElementById("artist-modal-backdrop");
const modalClose = document.getElementById("artist-modal-close");

const artistImage = document.getElementById("artist-image");
const artistName = document.getElementById("artist-name");
const artistShort = document.getElementById("artist-short");
const artistBio = document.getElementById("artist-bio");
const artistTimeStage = document.getElementById("artist-time-stage");
const artistVideo = document.getElementById("artist-video");

function openArtistModal(act) {
    artistImage.src = act.image;
    artistName.textContent = act.name;
    artistShort.textContent = act.short;
    artistBio.textContent = act.bio;
    artistTimeStage.textContent = `${act.stage} • ${act.start} – ${act.end}`;
    artistVideo.src = toEmbedUrl(act.video);

    // Geen hartje meer in popup → geen code nodig

    modal.classList.remove("hidden");
}

modalBackdrop.addEventListener("click", () => modal.classList.add("hidden"));
modalClose.addEventListener("click", () => modal.classList.add("hidden"));

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.add("hidden");
});

/* =========================================================
   PROGRAMMA BOUWEN (HARTJE RECHTS-ONDER)
========================================================= */

function renderProgram() {
    ["day1", "day2"].forEach(dayKey => {
        const container = document.getElementById(`${dayKey}-grid`);
        container.innerHTML = "";

        const dayName = dayKey === "day1" ? "Zaterdag" : "Zondag";
        const stages = scheduleData[dayName];

        Object.keys(stages).forEach(stageName => {
            const stageDiv = document.createElement("div");
            stageDiv.classList.add("stage");

            stageDiv.innerHTML = `
                <div class="stage-header">
                    <h3>${stageName}</h3>
                    <span class="material-icons">bolt</span>
                </div>
                <div class="stage-items"></div>
            `;

            const itemsDiv = stageDiv.querySelector(".stage-items");

            const acts = stages[stageName]
                .slice()
                .sort((a, b) => a.start.localeCompare(b.start));

            acts.forEach(act => {
                const card = document.createElement("div");
                card.classList.add("artist-card");

                if (act.type === "dj") card.classList.add("dj");
                if (act.type === "artist") card.classList.add("live");

                const now = isNowBetween(act.start, act.end);
                if (now) card.classList.add("now");

                const hasDetail =
                    act.type === "artist" &&
                    act.image &&
                    act.video &&
                    act.bio &&
                    act.short;

                const shortText = act.short || "";
                const stageLabel = `${stageName} • ${act.start} – ${act.end}`;

                card.innerHTML = `
                    <div class="time-row">
                        <p class="time">${act.start} – ${act.end}</p>
                        ${now ? `<span class="now-pill">NOW</span>` : ""}
                    </div>

                    <h4>${act.name}</h4>

                    <p class="short">${shortText}</p>

                    <p class="stage-label">${stageLabel}</p>

                    <!-- HARTJE RECHTS-ONDER -->
                    <div class="fav-bottom-wrapper">
                        <button class="fav-small-btn bottom" data-name="${act.name}">
                            <span class="material-icons">
                                ${isFavorite(act.name) ? "favorite" : "favorite_border"}
                            </span>
                        </button>
                    </div>
                `;

                // HARTJE KLIK
                card.querySelector(".fav-small-btn").onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(act.name);
                };

                // POPUP KLIK
                if (hasDetail) {
                    card.onclick = () => openArtistModal(act);
                }

                itemsDiv.appendChild(card);
            });

            container.appendChild(stageDiv);
        });
    });
}

/* =========================================================
   DAG SWITCH
========================================================= */

document.querySelectorAll(".day-toggle button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".day-toggle .active")?.classList.remove("active");
        button.classList.add("active");

        const day = button.dataset.day;

        document.querySelectorAll(".programma-grid").forEach(grid => {
            grid.classList.remove("visible");
        });

        document.querySelector(`.${day}`).classList.add("visible");
    });
});
// LEGENDA POPUP
const legendBtn = document.getElementById("legend-btn");
const legendPopup = document.getElementById("legend-popup");
const legendClose = document.getElementById("legend-close");

legendBtn.onclick = () => legendPopup.classList.remove("hidden");
legendClose.onclick = () => legendPopup.classList.add("hidden");


/* =========================================================
   INIT
========================================================= */

const waitForData = setInterval(() => {
    if (Object.keys(scheduleData).length > 0) {
        clearInterval(waitForData);

        renderFavorites();
        renderProgram();
    }
}, 50);
