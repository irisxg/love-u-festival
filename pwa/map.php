<!-- index.php -->

<?php include __DIR__ . '/assets/components/header.php'; ?>
<link rel="stylesheet" href="/love-u-festival/pwa/assets/css/map.css">

<link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js">
</script>

<main id="map-wrapper">

    <!-- SEARCH -->
    <div class="search-container">

        <span class="material-symbols-outlined search-icon">
            search
        </span>

        <input
            type="text"
            placeholder="Zoek een podium of bar...">

        <span class="material-symbols-outlined mic-icon">
            mic
        </span>

    </div>

    <!-- MAP CONTAINER -->
    <div id="map-container">

        <div id="map-content">

            <!-- MAP IMAGE (SVG als IMG, niet OBJECT) -->
            <img
                id="festival-map"
                src="assets/svg/festival-map.svg"
                alt="Festival Map">

            <!-- USER LOCATION -->
            <div class="user-marker"></div>

            <!-- MARKERS -->
            <div
                class="marker"
                style="left:18%; top:67%;"
                data-title="Ponton"
                data-current="Main Act Live"
                data-next="DJ Nova">
                <img src="assets/svg/marker_stage1_ponton.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                style="left:50%; top:48%;"
                data-title="The Lake"
                data-current="Unknown Talent"
                data-next="Luna Beats">
                <img src="assets/svg/marker_stage2_the_lake.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                style="left:68%; top:40%;"
                data-title="The Club"
                data-current="Comedy Show"
                data-next="Stand-up Live">
                <img src="assets/svg/marker_stage3_the_club.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                style="left:88%; top:12%;"
                data-title="Hangar"
                data-current="Techno Set"
                data-next="House Session">
                <img src="assets/svg/marker_stage4_hangar.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                style="left:18%; top:31%;"
                data-title="Hangar"
                data-current="Techno Set"
                data-next="House Session">
                <img src="assets/svg/marker_first_aid.svg" class="marker-icon">
            </div>




        </div>

    </div>


    <!-- CONTROLS -->
    <div class="map-controls">

        <button id="zoom-in">
            <span class="material-symbols-outlined">
                +
            </span>
        </button>

        <button id="zoom-out">
            <span class="material-symbols-outlined">
                -
            </span>
        </button>

        <button id="my-location" class="primary-btn">
            <span class="material-symbols-outlined">
                my_location
            </span>
        </button>

    </div>

    <!-- POPUP -->
    <div id="popup-card" class="hidden">

        <div class="popup-content">

            <div class="popup-image">
                <img
                    src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200"
                    alt="">
            </div>

            <div class="popup-info">

                <div class="popup-top">

                    <div>
                        <h2 id="popup-title">
                            Stage
                        </h2>

                        <p>Festival Area</p>
                    </div>

                    <span class="live-badge">
                        LIVE
                    </span>

                </div>

                <div class="popup-times">

                    <span class="material-symbols-outlined">
                        schedule
                    </span>

                    <span id="popup-current">
                        Current Act
                    </span>

                </div>

                <div class="popup-next">
                    Next:
                    <span id="popup-next">
                        Next Artist
                    </span>
                </div>

            </div>

        </div>

        <div class="popup-actions">

            <button class="route-btn">
                BRENG ME ERHEEN
            </button>

            <button class="favorite-btn">
                <span class="material-symbols-outlined">
                    favorite
                </span>
            </button>

        </div>

    </div>

</main>

<!-- NAVIGATION -->
<nav class="bottom-nav">

    <button>
        <span class="material-symbols-outlined">
            home
        </span>
        <span>Home</span>
    </button>

    <button>
        <span class="material-symbols-outlined">
            info
        </span>
        <span>Info</span>
    </button>

    <button>
        <span class="material-symbols-outlined">
            calendar_today
        </span>
        <span>Schedule</span>
    </button>

    <button class="active">
        <span class="material-symbols-outlined">
            map
        </span>
        <span>Map</span>
    </button>

</nav>

<?php include __DIR__ . '/assets/components/footer.php'; ?>

<!-- JS -->
<script src="assets/js/darkmode.js"></script>
<script src="assets/js/map.js"></script>

</body>

</html>