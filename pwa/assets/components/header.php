<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">

    <!-- iPhone & PWA veilige viewport -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>❤️U Festival</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Sansation:wght@300;400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    
    <!-- PWA Manifest & Icons -->
    <link rel="manifest" href="manifest.json">
    <link rel="icon" type="image/png" href="assets/img/logo.png">
    <link rel="apple-touch-icon" href="assets/img/logo.png">
    <meta name="theme-color" content="#000000">

    <!-- CSS -->
    <link rel="stylesheet" href="/love-u-festival/pwa/assets/css/global.css">
    <link rel="stylesheet" href="/love-u-festival/pwa/assets/css/home.css">
    <link rel="stylesheet" href="/love-u-festival/pwa/assets/css/programma.css">
    <link rel="stylesheet" href="/love-u-festival/pwa/assets/css/info.css">
    <script type="module" src="assets/js/language.js"></script>
    
    <!-- Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then(reg => console.log('Service Worker registered!', reg))
                    .catch(err => console.error('Service Worker registration failed!', err));
            });
        }
    </script>
</head>

<body>

<header class="app-header">
    <div class="header-inner">
        <div class="header-left" style="display: flex; gap: 8px; align-items: center;">
            <span class="lang-switch" id="lang-btn-nl" style="font-size: 22px; cursor: pointer; user-select: none; transition: transform 0.2s, opacity 0.2s;" title="Nederlands">🇳🇱</span>
            <span class="lang-switch" id="lang-btn-en" style="font-size: 22px; cursor: pointer; user-select: none; transition: transform 0.2s, opacity 0.2s;" title="English">🇬🇧</span>
        </div>

        <h1 class="header-title">❤️U FESTIVAL</h1>

        <div class="header-right">
            <span class="material-icons theme-toggle">dark_mode</span>
        </div>
    </div>
</header>
