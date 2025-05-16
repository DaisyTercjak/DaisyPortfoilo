console.log("app.js loaded");

// Optionally, you can add more global JS here.
// If you want to ensure the menu is always present, add a fallback:

document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.getElementById('navItems');
    if (navItems && navItems.innerHTML.trim() === '') {
        navItems.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="pages/signup.html">Sign Up</a></li>
            <li class="nav-item"><a class="nav-link" href="pages/login.html">Login</a></li>
        `;
    }
}); 