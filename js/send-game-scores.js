import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { auth } from './firebase-config.js'; // To get the current user

export async function sendGameScore(gameId, score) {
    // Only save if score is high enough
    if (score < 30) {
        console.log('Score was not big enough to be saved in db');
        return;
    }

    // Get the current user ID (if logged in)
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    try {
        await addDoc(collection(db, "scores"), {
            gameId: gameId,
            score: score,
            user_id: userId,
            date: serverTimestamp()
        });
        console.log('Score successfully saved to Firestore!');
    } catch (error) {
        console.error('Error saving score:', error);
    }
}