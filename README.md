# Daisy Portfolio (JavaScript Port)

This project is a JavaScript port of the original Python Flask-based Daisy Portfolio. It uses Firebase for authentication and data storage, and is designed to run as a static web app.

## Project Structure

- `index.html` — Main landing page
- `pages/` — Contains subpages (login, signup, games, stats, etc.)
- `js/` — JavaScript logic (Firebase config, authentication, app logic)
- `css/` — Stylesheets
- `assets/` — Images and other static assets

## Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- (Optional) A local HTTP server for local development (recommended)
- (Optional) Your own Firebase project if you want to use your own backend

## Quick Start

1. **Clone or Download the Repository**

   ```sh
   git clone https://github.com/DaisyTercjak/DaisyPortfoilo.git
   cd DaisyPortfolio
   ```

2. **(Optional) Update Firebase Configuration**

   If you want to use your own Firebase project, create the config in `js/firebase-config.js` with your Firebase credentials.

3. **Run the Project Locally**

   You can open `index.html` directly in your browser, but for full functionality (especially with modules and Firebase), it's best to use a local HTTP server.

   - **Using Node.js (http-server):**
     ```sh
     # npm install -g http-server
     http-server -p 8000
     # Then open http://localhost:8000 in your browser
     ```

4. **Using the App**

   - Visit the home page (`index.html`).
   - Sign up for a new account or log in with an existing one.
   - Navigate to Games, Stats, and other pages from the navigation bar.
   - Games and stats features are under development and will be available soon.

## Features

- User authentication (sign up, login, logout) via Firebase
- Responsive design with Bootstrap
- Placeholder pages for games and stats
- Modular JavaScript codebase

## Notes

- This is a static web app; there is no Node.js/Express backend. All dynamic features use Firebase.
- If you want to deploy, you can use any static hosting service (GitHub Pages, Netlify, Vercel, Firebase Hosting, etc.).
- The original Python/Flask code is in the `Python_project/` directory for reference.

## License

MIT