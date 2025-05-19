function includeHTML(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

window.addEventListener('DOMContentLoaded', () => {
    includeHTML('header-include', '../partials/header.html');
    includeHTML('footer-include', '../partials/footer.html');
}); 