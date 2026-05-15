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

            <div class="program-card">
                <img src="assets/images/artist.jpg" alt="Artiest">
                <div class="program-info">
                    <span class="time">14:00 — 15:30 | Main Stage</span>
                    <h4>Velvet Theory</h4>
                    <p>De perfecte mix van elektronische beats en organische klanken.</p>
                    <button class="btn">BEKIJK VOLLEDIG PROGRAMMA</button>
                </div>
            </div>
        </section>

        <!-- NIEUWS -->
        <section class="section">
            <h3>NIEUWS</h3>

            <div class="news-grid">

                <div class="news-card">
                    <div class="news-tag info">
                        <span class="material-icons">info</span>
                        <span>Update</span>
                    </div>
                    <h5>Ingang Noord tijdelijk gesloten</h5>
                    <p>Maak gebruik van Ingang Zuid om drukte te vermijden bij de hoofdpoort.</p>
                    <span class="timestamp">12:45u — Algemeen</span>
                </div>

                <div class="news-card">
                    <div class="news-tag secondary">
                        <span class="material-icons">restaurant</span>
                        <span>Food</span>
                    </div>
                    <h5>Food Court Open</h5>
                    <p>Onze gastronomische zone is nu geopend. Ontdek lokale delicatessen en premium wijnen.</p>
                    <span class="timestamp">11:30u — Service</span>
                </div>

                <div class="news-card">
                    <div class="news-tag primary">
                        <span class="material-icons">sunny</span>
                        <span>Weer</span>
                    </div>
                    <h5>Zonnig & Mild</h5>
                    <p><strong>24°C</strong> — Vergeet je niet in te smeren, we verwachten een wolkenloze middag.</p>
                    <span class="timestamp">Vandaag — Verwachting</span>
                </div>

            </div>
        </section>

        <!-- CTA -->
        <section class="cta">
            <h3>Mis niets van ❤️U</h3>
            <p>Meld je aan voor push-notificaties over je favoriete artiesten.</p>
            <button class="btn-light">ACTIVEREN</button>
        </section>

    </main>

    <?php include __DIR__ . '/assets/components/footer.php'; ?>

    <script src="assets/js/darkmode.js"></script>

</html>