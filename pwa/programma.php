<?php include __DIR__ . '/assets/components/header.php'; ?>

<main class="programma-page">


    <!-- HEADER -->
    <section class="programma-header">
        <h2>Programma</h2>

        <div class="day-toggle">
            <button class="active" data-day="day1">Zaterdag 5 september 2026</button>
            <button data-day="day2">Zondag 6 september 2026</button>
        </div>
    </section>

    <!-- LEGEND -->
    <section class="programma-legend">
        <div class="legend-item">
            <span class="dot live"></span>
            <span>Live Act</span>
        </div>

        <div class="legend-item">
            <span class="dot dj"></span>
            <span>DJ Set</span>
        </div>
    </section>

    <!-- DAG 1 -->
    <section class="programma-grid day1 visible" id="day1-grid"></section>

    <!-- DAG 2 -->
    <section class="programma-grid day2" id="day2-grid"></section>

</main>

<!-- ARTIEST POPUP -->
<div class="artist-modal hidden" id="artist-modal">

    <div class="artist-modal-backdrop" id="artist-modal-backdrop"></div>

    <div class="artist-modal-card">

        <button class="artist-modal-close" id="artist-modal-close">
            <span class="material-symbols-outlined">close</span>
        </button>

        <div class="artist-modal-header">
            <img id="artist-image" src="" alt="">
            <div class="artist-header-overlay"></div>
            <div class="artist-header-text">
                <h2 id="artist-name"></h2>
                <p id="artist-short"></p>
            </div>
        </div>

        <div class="artist-modal-body">

            <p class="artist-time-stage" id="artist-time-stage"></p>

            <p class="artist-bio" id="artist-bio"></p>

            <div class="artist-video-wrapper">
                <iframe
                    id="artist-video"
                    src=""
                    title="Artist video"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>

        </div>

    </div>

</div>


<?php include __DIR__ . '/assets/components/footer.php'; ?>

<script src="assets/js/darkmode.js"></script>
<script type="module" src="assets/js/programma.js"></script>
</html>
