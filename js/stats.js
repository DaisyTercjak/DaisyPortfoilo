import { db, auth } from './firebase-config.js';
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function fetchScores() {
    // Wait for user to be authenticated
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe();
            if (!user) {
                resolve({});
                return;
            }
            const userId = user.uid;
            const q = query(collection(db, "scores"), where("user_id", "==", userId), orderBy("date"));
            const querySnapshot = await getDocs(q);
            const scoresByGame = { 1: [], 2: [] };
            const datesByGame = { 1: [], 2: [] };
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const gameId = data.gameId;
                const score = data.score;
                const date = data.date && data.date.toDate ? data.date.toDate().toISOString().slice(0, 10) : (data.date ? data.date.split('T')[0] : '');
                if (gameId === 1 || gameId === 2) {
                    scoresByGame[gameId].push(score);
                    datesByGame[gameId].push(date);
                }
            });
            resolve({ scoresByGame, datesByGame });
        });
    });
}

function alignScores(dates, scores, allDates) {
    const scoreMap = new Map(dates.map((date, idx) => [date, scores[idx]]));
    return allDates.map(date => scoreMap.get(date) || null);
}

async function renderChart() {
    const { scoresByGame, datesByGame } = await fetchScores();
    const dates1 = datesByGame ? datesByGame[1] : [];
    const dates2 = datesByGame ? datesByGame[2] : [];
    const scores1 = scoresByGame ? scoresByGame[1] : [];
    const scores2 = scoresByGame ? scoresByGame[2] : [];
    // Merge dates and remove duplicates
    const allDates = Array.from(new Set([...(dates1 || []), ...(dates2 || [])])).sort();
    const alignedScores1 = alignScores(dates1, scores1, allDates);
    const alignedScores2 = alignScores(dates2, scores2, allDates);
    const ctx = document.getElementById('statsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: allDates,
            datasets: [
                {
                    label: 'Whack-a-mole',
                    data: alignedScores1,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Space-Invaders',
                    data: alignedScores2,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true }
            },
            scales: {
                x: { title: { display: true, text: 'Date' } },
                y: { title: { display: true, text: 'Score' } }
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', renderChart); 