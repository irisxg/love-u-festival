<?php include __DIR__ . '/assets/components/header.php'; ?>

<main class="programma-page">

    <section class="programma-header">
        <h2>Programma</h2>

        <div class="day-toggle">
            <button class="active" data-day="day1">Zaterdag 5 september 2026</button>
            <button data-day="day2">Zondag 6 september 2026</button>
        </div>
    </section>

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

    <!-- DAG 1 GRID -->
    <section class="programma-grid day1 visible">

        <div class="stage">
            <div class="stage-header">
                <h3>Main Stage</h3>
                <span class="material-icons">bolt</span>
            </div>

            <div class="stage-items">

                <div class="artist-card live">
                    <p class="time">19:00 – 20:30</p>
                    <h4>NINA KRAVIZ</h4>
                    <p class="genre">Techno / Acid</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">21:00 – 23:00</p>
                    <h4>PEGGY GOU</h4>
                    <p class="genre">House / Disco</p>
                </div>

                <div class="artist-card live">
                    <p class="time">23:30 – 01:00</p>
                    <h4>BICEP</h4>
                    <p class="genre">Electronic / Live</p>
                </div>

            </div>
        </div>

        <div class="stage">
            <div class="stage-header">
                <h3>Forest</h3>
                <span class="material-icons">forest</span>
            </div>

            <div class="stage-items">

                <div class="artist-card dj">
                    <p class="time">18:00 – 20:00</p>
                    <h4>HUNEE</h4>
                    <p class="genre">World / Rare Groove</p>
                </div>

                <div class="artist-card live">
                    <p class="time">20:30 – 22:00</p>
                    <h4>CARIBOU</h4>
                    <p class="genre">Indie Electronic</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">22:30 – 00:30</p>
                    <h4>KIASMOS</h4>
                    <p class="genre">Minimal / Techno</p>
                </div>

            </div>
        </div>

        <div class="stage">
            <div class="stage-header">
                <h3>Club</h3>
                <span class="material-icons">nightlight</span>
            </div>

            <div class="stage-items">

                <div class="artist-card dj">
                    <p class="time">20:00 – 22:00</p>
                    <h4>OBJET</h4>
                    <p class="genre">Experimental Techno</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">22:00 – 00:00</p>
                    <h4>HELENA HAUFF</h4>
                    <p class="genre">Electro / Industrial</p>
                </div>

                <div class="artist-card live">
                    <p class="time">00:00 – 02:00</p>
                    <h4>VTSS</h4>
                    <p class="genre">Hard Techno</p>
                </div>

            </div>
        </div>

    </section>

    <!-- DAG 2 GRID -->
    <section class="programma-grid day2">

        <div class="stage">
            <div class="stage-header">
                <h3>Main Stage</h3>
                <span class="material-icons">bolt</span>
            </div>

            <div class="stage-items">

                <div class="artist-card live">
                    <p class="time">18:00 – 19:30</p>
                    <h4>THE BLAZE</h4>
                    <p class="genre">Electronic / Live</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">20:00 – 22:00</p>
                    <h4>JOB JOBSE</h4>
                    <p class="genre">House / Techno</p>
                </div>

                <div class="artist-card live">
                    <p class="time">22:30 – 00:00</p>
                    <h4>MODERAT</h4>
                    <p class="genre">Electronic / Live</p>
                </div>

            </div>
        </div>

        <div class="stage">
            <div class="stage-header">
                <h3>Forest</h3>
                <span class="material-icons">forest</span>
            </div>

            <div class="stage-items">

                <div class="artist-card dj">
                    <p class="time">17:00 – 19:00</p>
                    <h4>PALMS TRAX</h4>
                    <p class="genre">House / Disco</p>
                </div>

                <div class="artist-card live">
                    <p class="time">19:30 – 21:00</p>
                    <h4>DJ KOZE</h4>
                    <p class="genre">Electronic / Experimental</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">21:30 – 23:00</p>
                    <h4>MALL GRAB</h4>
                    <p class="genre">Techno / Breaks</p>
                </div>

            </div>
        </div>

        <div class="stage">
            <div class="stage-header">
                <h3>Club</h3>
                <span class="material-icons">nightlight</span>
            </div>

            <div class="stage-items">

                <div class="artist-card dj">
                    <p class="time">19:00 – 21:00</p>
                    <h4>ANNA</h4>
                    <p class="genre">Techno</p>
                </div>

                <div class="artist-card dj">
                    <p class="time">21:00 – 23:00</p>
                    <h4>REINIER ZONNEVELD</h4>
                    <p class="genre">Techno / Live</p>
                </div>

            </div>
        </div>

    </section>

    <section class="promo-card">
        <img src="assets/img/promo.jpg" alt="Festival sfeer">
        <div class="promo-content">
            <p class="label">Uitgelichte Artiest</p>
            <h3>CHARLOTTE DE WITTE</h3>
            <button class="promo-btn">BEKIJK PROFIEL</button>
        </div>
    </section>

</main>

<?php include __DIR__ . '/assets/components/footer.php'; ?>

<script src="assets/js/darkmode.js"></script>

<script>
document.querySelectorAll('.day-toggle button').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelector('.day-toggle .active')?.classList.remove('active');
        button.classList.add('active');

        const day = button.dataset.day;

        document.querySelectorAll('.programma-grid').forEach(grid => {
            grid.classList.remove('visible');
        });

        document.querySelector(`.${day}`).classList.add('visible');
    });
});
</script>
