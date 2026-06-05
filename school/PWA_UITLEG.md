# PWA Handleiding: Werking & Gebruik

De ❤️U Festival App is ontwikkeld als een **Progressive Web App (PWA)**. Dit betekent dat de website zich gedraagt als een installeerbare, native mobiele app. 

Deze handleiding legt uit hoe de PWA-technologie in deze app werkt en hoe je dit kunt testen en gebruiken.

---

## ⚙️ Hoe de PWA werkt

De PWA-functionaliteit is opgebouwd uit drie belangrijke pijlers:

### 1. Het Web App Manifest (`manifest.json`)
Dit bestand bevat de metadata van de app, zoals de naam, themakleuren en de icoontjes. Dit zorgt ervoor dat:
*   De app geïnstalleerd kan worden op het startscherm van een telefoon of desktop.
*   De app opstart in een fullscreen "standalone" venster (zonder browser-adresbalk).
*   De app de juiste iconen (het ❤️U logo) toont op het startscherm.

### 2. De Service Worker (`sw.js`)
De Service Worker is een script dat op de achtergrond van de browser draait. Het fungeert als een netwerk-proxy en regelt:
*   **Offline werking:** Essentiële bestanden (CSS, JS, fonts, afbeeldingen en de pagina's zelf) worden gecachet.
*   **Caching-strategieën:**
    *   *Network-First (voor PHP-pagina's):* De app probeert altijd eerst de nieuwste pagina op te halen via het internet. Als er geen internet is, valt de app direct terug op de gecachte versie. Zo blijft de app offline werken, maar zie je wel direct updates als je weer online bent.
    *   *Cache-First (voor static assets zoals CSS, JS en afbeeldingen):* Laadt direct vanaf het apparaat zelf voor maximale snelheid.

### 3. HTTPS of Localhost
Om veiligheidsredenen ondersteunen browsers alleen PWA-features (zoals Service Workers en Geolocatie) over een beveiligde verbinding (HTTPS) óf via `localhost` (bijvoorbeeld met MAMP).

---

## Hoe de PWA te installeren

### Op Mobiel (Android / Chrome)
1. Open de browser en navigeer naar de app op je lokale netwerk of webadres.
2. Onderaan het scherm verschijnt automatisch een banner met *"Toevoegen aan startscherm"*.
3. Klik hierop. De app staat nu tussen je normale apps!

### Op Mobiel (iOS / Safari)
1. Open Safari en ga naar de website.
2. Tik op de **Deel-knop** (vierkantje met pijltje omhoog).
3. Scroll naar beneden en tik op **"Zet op beginscherm"** (Add to Home Screen).

### Op Desktop (Chrome / Edge)
1. Open de website in Chrome of Edge.
2. Rechts in de adresbalk verschijnt een icoontje (een computertje met een pijltje omlaag) met de tekst *"Installeren"*.
3. Klik hierop om de app als losse desktop-applicatie te installeren.

---

## PWA Inspecteren en Testen (Chrome DevTools)

Je kunt de werking van de PWA inspecteren via de Chrome-ontwikkelaarstools:

1. Open de app in Google Chrome en druk op `F12` (of rechtermuisknop -> *Inspecteren*).
2. Ga naar het tabblad **Application** (Applicatie).
3. In het linker-menu zie je drie belangrijke onderdelen:
    *   **Manifest:** Hier kun je controleren of `manifest.json` goed wordt ingeladen en zie je de app-iconen.
    *   **Service Workers:** Hier zie je of `sw.js` actief is. Je kunt hier ook de optie **"Offline"** aanvinken om te testen of de app zonder internetverbinding blijft werken!
    *   **Cache Storage:** Klik op `love-u-cache-v1` om te zien welke bestanden er lokaal op het apparaat zijn opgeslagen voor offline gebruik.

---

## Push-meldingen (Voorbereiding)
Op de homepage bevindt zich een actieknop om push-notificaties te activeren. Zodra je hierop klikt, wordt de gebruiker voorbereid op notificaties over favoriete artiesten. Voor een echte push-notificatie is een push-server (zoals Firebase of WebPush in PHP) nodig. De interface en toestemmingsvragen zijn in deze PWA alvast volledig voorbereid.
