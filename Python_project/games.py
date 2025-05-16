from flask import Blueprint, render_template, flash, request, jsonify
from datetime import datetime
from flask_login import login_required, current_user
from .models import Score
from .firebase_config import db

games = Blueprint('games', __name__)

@games.route('/java-script')
def java_script_games():
    return render_template("games.html")

@games.route('/whack-a-mole')
def whack_a_mole():
    return render_template("whack_a_mole.html")

@games.route('/space-invaders')
def space_invaders():
    return render_template("space_invaders.html")

@games.route('/thomas-gia')
def thomas_gia():
    return render_template("thomas_gia.html")

@games.route('/game-score', methods=['POST'])
@login_required
def addGameScore():
    if request.method == 'POST':
        # Get JSON data from the request
        data = request.get_json()

        # Validate the required fields
        if not data or 'gameId' not in data or 'score' not in data:
            return jsonify({"error": "Bad Request - Missing 'gameId' or 'score'"}), 400

        # Extract gameId and score
        game_id = data['gameId']
        score_value = data['score']

        try:
            # Create score in Firebase
            Score.create(game_id, score_value, current_user.id)
            return jsonify({"message": "OK"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return "Bad request", 400