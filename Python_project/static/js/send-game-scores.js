export function sendGameScore(gameId, score) {

    //logic if score is less than 10 dont bother sending
    if (score < 30) {
        console.log('Score was not big enough to be saved in db');
        return;
    }

    // Define the data to be sent
    const data = {
        gameId: gameId,
        score: score
    };

    // Send an AJAX POST request using fetch
    fetch('http://127.0.0.1:5000/games/game-score', {
        method: 'POST', // HTTP method
        headers: {
            'Content-Type': 'application/json' // Inform the server you're sending JSON
        },
        body: JSON.stringify(data) // Convert the data object to a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Assuming the server responds with JSON
    })
    .then(result => {
        console.log('Score successfully sent:', result);
    })
    .catch(error => {
        console.error('Error sending score:', error);
    });
}
