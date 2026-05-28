<?php include __DIR__ . '/assets/components/header.php'; ?>

<main>
    <!-- HERO -->
    <section class="hero">
        <img src="assets/img/hangar.png" alt="Festival sfeer" class="hero-img">

        <div class="hero-overlay"></div>

        <div class="hero-text">
            <h2>Welkom bij ❤️U</h2>
            <p class="subtitle">De hartslag van de zomer</p>
        </div>

        <div class="scroll-indicator">
            <span class="material-icons">expand_more</span>
            <p>Scroll naar beneden</p>
        </div>
    </section>

    <!-- PROGRAMMA NU -->
    <section class="section">
        <div class="section-header">
            <h3>PROGRAMMA NU</h3>
            <span class="live">LIVE</span>
        </div>

        <div id="program-now"></div>
    </section>

        <!-- FAVORIETEN -->
        <section class="section" id="favorites-section" style="display:none;">
        <div class="section-header">
            <h3>JOUW FAVORIETEN</h3>
        </div>
        <div id="favorites-list"></div>
    </section>

    <!-- NIEUWS -->
    <section class="section">
        <h3>NIEUWS</h3>

        <div class="news-grid">

            <!-- LOCATIE / UPDATE -->
            <div class="news-card">
                <div class="news-tag info">
                    <span class="material-icons">info</span>
                    <span>Update</span>
                </div>
                <h5 class="gps-info-title">Locatiegebruik</h5>
                <p class="gps-info-text">
                    We gebruiken je locatie alleen voor het actuele weer en om de kaart correct te laden.
                    Je gegevens worden nooit opgeslagen of gedeeld.
                </p>
                <span class="timestamp">12:45u — Algemeen</span>
            </div>

            <!-- SHOPS -->
            <div class="news-card">
                <div class="news-tag secondary">
                    <span class="material-icons">storefront</span>
                    <span>Shops</span>
                </div>
                <h5>Shops & Services</h5>
                <p>Alle shops en services zijn geopend van <strong>12:00 tot 23:00</strong>, met uitzondering van de 4 stages.</p>
                <span class="timestamp">Vandaag — Service</span>
            </div>

            <!-- LIVE WEER (GEEN AFBEELDING) -->
            <div class="news-card" id="news-weather-card">
                <div class="news-tag primary">
                    <span class="material-icons">sunny</span>
                    <span>Weer</span>
                </div>

                <h5 class="weather-title">Weer Nu</h5>

                <div id="weather-news-content">
                    <p>Weer laden...</p>
                </div>

                <span class="timestamp">Live — GPS</span>
            </div>

        </div>
    </section>

    <!-- CTA -->
    <section class="cta">
        <h3>Mis niets van ❤️U</h3>
        <p>Meld je aan voor push-notificaties over je favoriete artiesten.</p>
        <button class="btn-light" id="activate-favorites">ACTIVEREN</button>
    </section>

    <!-- FAVORIETEN ACTIVATIE POPUP -->
<div id="favorites-activate-popup" class="popup-overlay hidden">
    <div class="popup-box">

        <h3>Favorieten ingeschakeld</h3>

        <p>
            Je kunt nu je favoriete artiesten selecteren.<br><br>
            Ga naar <strong>Programma</strong> en klik op het 
            <span class="material-icons inline-icon">favorite_border</span> 
            icoon om artiesten toe te voegen aan jouw favorietenlijst.
        </p>

        <button id="favorites-popup-close" class="btn-light popup-btn">
            BEGREPEN
        </button>

    </div>
</div>


</main>

<?php include __DIR__ . '/assets/components/footer.php'; ?>

<script src="assets/js/darkmode.js"></script>
<script type="module" src="assets/js/home.js"></script>
</html>
