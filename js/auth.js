import { auth, db } from './firebase-config.js';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Auth state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        updateNavigation(true);
        loadUserData(user);
    } else {
        updateNavigation(false);
        // Only redirect if on a protected page
        const protectedPages = [
            '/pages/games.html',
            '/pages/stats.html',
            // add more protected pages here
        ];
        if (protectedPages.includes(window.location.pathname)) {
            window.location.href = 'login.html';
        }
        // Do NOT redirect on index.html or public pages
    }
});

function updateNavigation(isAuthenticated) {
    const navItems = document.getElementById('navItems');
    if (isAuthenticated) {
        navItems.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="pages/games.html">Games & Tests</a></li>
            <li class="nav-item"><a class="nav-link" href="pages/stats.html">Stats</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>
        `;
    } else {
        navItems.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="pages/signup.html">Sign Up</a></li>
            
        `;
    }
}

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        
        if (userDoc.exists()) {
            window.location.href = '/index.html';
        } else {
            throw new Error('User data not found');
        }
    } catch (error) {
        alert(error.message);
    }
}

async function signup(email, password, firstName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email,
            first_name: firstName
        });
        
        window.location.href = '/index.html';
    } catch (error) {
        alert(error.message);
    }
}

async function logout() {
    if (confirm('Are you sure you want to log out?')) {
        try {
            await signOut(auth);
            window.location.href = 'pages/login.html';
        } catch (error) {
            alert(error.message);
        }
    }
}

window.logout = logout;

export { login, signup, logout }; 