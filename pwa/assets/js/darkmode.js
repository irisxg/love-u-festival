document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    if (!toggle) return;

    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
        toggle.textContent = 'light_mode';
    }

    toggle.addEventListener('click', () => {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            toggle.textContent = 'light_mode';
            localStorage.setItem('theme', 'dark');
        } else {
            toggle.textContent = 'dark_mode';
            localStorage.setItem('theme', 'light');
        }
    });
});
