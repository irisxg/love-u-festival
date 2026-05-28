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
        id="search-input"
        placeholder="Zoek een podium of bar...">

    <span class="material-symbols-outlined mic-icon" id="voice-search">
        mic
    </span>

</div>


<!-- MAP CONTAINER -->
<div id="map-container">

    <div id="map-content">

        <!-- MAP IMAGE -->
        <img
            id="festival-map"
            src="assets/svg/festival-map.svg"
            alt="Festival Map">

        <!-- USER LOCATION -->
        <div class="user-marker"></div>

        <!-- MARKER 1 — POTON -->
        <div
            class="marker marker-large"
            data-type="stage"
            data-stage="Poton"
            style="left:21%; top:63%;">
            <img src="assets/svg/marker_stage1_ponton.svg" class="marker-icon">
        </div>

        <!-- MARKER 2 — THE LAKE -->
        <div
            class="marker marker-large"
            data-type="stage"
            data-stage="The Lake"
            style="left:54%; top:46%;">
            <img src="assets/svg/marker_stage2_the_lake.svg" class="marker-icon">
        </div>

        <!-- MARKER 3 — THE CLUB -->
        <div
            class="marker marker-large"
            data-type="stage"
            data-stage="The Club"
            style="left:69%; top:39%;">
            <img src="assets/svg/marker_stage3_the_club.svg" class="marker-icon">
        </div>

        <!-- MARKER 4 — HANGGAR -->
        <div
            class="marker marker-large"
            data-type="stage"
            data-stage="Hanggar"
            style="left:90%; top:17.2%;">
            <img src="assets/svg/marker_stage4_hangar.svg" class="marker-icon">
        </div>


            <!-- EHBO -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:18%; top:31%;"
                data-title="EHBO">
                <img src="assets/svg/marker_first_aid.svg" class="marker-icon">
            </div>

            <!-- ETEN -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:12%; top:62%;"
                data-title="Eten">
                <img src="assets/svg/marker_food.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:35.3%; top:44%;"
                data-title="Eten">
                <img src="assets/svg/marker_food.svg" class="marker-icon">
            </div>

            <!-- IJS -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:27%; top:66.4%;"
                data-title="IJs">
                <img src="assets/svg/marker_ice_cream.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:38.7%; top:41.4%;"
                data-title="IJs">
                <img src="assets/svg/marker_ice_cream.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:62.5%; top:33.4%;"
                data-title="IJs">
                <img src="assets/svg/marker_ice_cream.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:83.4%; top:18%;"
                data-title="IJs">
                <img src="assets/svg/marker_ice_cream.svg" class="marker-icon">
            </div>

            <!-- DRINKEN -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:11.6%; top:73.3%;"
                data-title="Bar">
                <img src="assets/svg/marker_bar.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:51%; top:41%;"
                data-title="Bar">
                <img src="assets/svg/marker_bar.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:72%; top:28.8%;"
                data-title="Bar">
                <img src="assets/svg/marker_bar.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:81%; top:28%;"
                data-title="Bar">
                <img src="assets/svg/marker_bar.svg" class="marker-icon">
            </div>

            <!-- KLEDING -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:31.7%; top:39%;"
                data-title="Merchandise">
                <img src="assets/svg/marker_merchandise.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:18%; top:78.7%;"
                data-title="Merchandise">
                <img src="assets/svg/marker_merchandise.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:65%; top:39%;"
                data-title="Merchandise">
                <img src="assets/svg/marker_merchandise.svg" class="marker-icon">
            </div>

            <!-- KLUISJES -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:24%; top:82.4%;"
                data-title="Lockers">
                <img src="assets/svg/marker_locker.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:30.4%; top:81.5%;"
                data-title="Lockers">
                <img src="assets/svg/marker_locker.svg" class="marker-icon">
            </div>

            <!-- WC -->
            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:7.7%; top:78.7%;"
                data-title="WC">
                <img src="assets/svg/marker_toilet.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:49%; top:27.5%;"
                data-title="WC">
                <img src="assets/svg/marker_toilet.svg" class="marker-icon">
            </div>

            <div
                class="marker"
                data-type="service"
                data-open="true"
                style="left:93%; top:25.4%;"
                data-title="WC">
                <img src="assets/svg/marker_toilet.svg" class="marker-icon">
            </div>

            <!-- IN/UIT GANG -->
            <div
                class="marker marker-largee"
                data-type="service"
                data-open="true"
                style="left:69%; top:84.5%;"
                data-title="Entrance / Exit">
                <img src="assets/svg/marker_entrance_exit.svg" class="marker-icon">
            </div>

        </div>

    </div>

<!-- CONTROLS (RECHTSBOVEN) -->
<div class="map-controls">

    <!-- FAVORIETEN OVERZICHT (WÉL klikbaar) -->
    <button id="favorites-list-btn" class="map-star-btn">
        <span class="material-symbols-outlined">star</span>
    </button>

    <!-- MY LOCATION -->
    <button id="my-location" class="primary-btn">
        <span class="material-symbols-outlined">my_location</span>
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
                    <h2 id="popup-title">Stage</h2>
                    <p id="popup-status"></p>
                </div>

                <span class="live-badge">LIVE</span>

            </div>

            <div class="popup-times">
    <span class="now-label">NOW</span>
    <span id="popup-current"></span>
</div>


            <div class="popup-next">
                Next:
                <span id="popup-next">Next Artist</span>
            </div>

        </div>

    </div>

    <!-- POPUP BUTTONS -->
    <div class="popup-actions">

        <!-- FAVORITE ACTIE KNOP (ROOD) -->
        <button class="favorite-btn" id="favorite-toggle">
            FAVORITE
        </button>

        <!-- FAVORITE STATUS KNOP (STER) — NIET klikbaar -->
        <button class="favorite-status-btn" id="favorite-status">
            <span class="material-symbols-outlined" id="favorite-status-icon">
                star_border
            </span>
        </button>

    </div>

</div>


<!-- FAVORIETEN POPUP (APART, BUITEN popup-card) -->
<div id="favorites-popup" class="hidden">

    <div class="favorites-window">

        <div class="favorites-header">
            <h3>⭐ Favorieten</h3>
            <button id="favorites-close">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>

        <div id="favorites-list" class="favorites-list">
            <!-- Wordt gevuld via JS -->
        </div>

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
<script type="module" src="assets/js/schedule.js"></script>
<script type="module" src="assets/js/map.js"></script>

</body>

</html>