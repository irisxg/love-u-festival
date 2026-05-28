import { scheduleData, getTimeString } from "./schedule.js";

/* =========================================================
   HELPERS
========================================================= */

function isNowBetween(start, end) {
    const now = getTimeString(); // "HH:MM"
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
   BUILD PROGRAM FOR DAY
========================================================= */

function buildProgram(dayKey, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const stages = scheduleData[dayKey];
    if (!stages) return;

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

            // kleur op basis van type
            if (act.type === "dj") card.classList.add("dj");
            if (act.type === "artist") card.classList.add("live");

            // NOW highlight
            const now = isNowBetween(act.start, act.end);
            if (now) card.classList.add("now");

            // check of act detail-popup heeft
            const hasDetail =
                act.type === "artist" &&
                act.image &&
                act.video &&
                act.bio &&
                act.short;

            if (hasDetail) {
                card.classList.add("clickable");
                card.dataset.name = act.name;
                card.dataset.short = act.short;
                card.dataset.bio = act.bio;
                card.dataset.image = act.image;
                card.dataset.video = act.video;
                card.dataset.time = `${act.start} – ${act.end}`;
                card.dataset.stage = stageName;
            }

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
            `;

            if (hasDetail) {
                card.addEventListener("click", () => openArtistModal(card));
            }

            itemsDiv.appendChild(card);
        });

        container.appendChild(stageDiv);
    });
}

/* =========================================================
   ARTIST MODAL
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

function openArtistModal(card) {
    artistImage.src = card.dataset.image;
    artistName.textContent = card.dataset.name;
    artistShort.textContent = card.dataset.short;
    artistBio.textContent = card.dataset.bio;
    artistTimeStage.textContent = `${card.dataset.stage} • ${card.dataset.time}`;
    artistVideo.src = toEmbedUrl(card.dataset.video);

    modal.classList.remove("hidden");
}

function closeArtistModal() {
    artistVideo.src = "";
    modal.classList.add("hidden");
}

modalBackdrop.addEventListener("click", closeArtistModal);
modalClose.addEventListener("click", closeArtistModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeArtistModal();
});

/* =========================================================
   WAIT FOR JSON, THEN BUILD
========================================================= */

const waitForData = setInterval(() => {
    if (Object.keys(scheduleData).length > 0) {
        clearInterval(waitForData);

        buildProgram("Zaterdag", "day1-grid");
        buildProgram("Zondag", "day2-grid");
    }
}, 50);

/* =========================================================
   DAY TOGGLE
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
