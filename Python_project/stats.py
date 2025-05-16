from flask import render_template, session, url_for, redirect, Blueprint
from flask_login import current_user
from .models import Score
from .firebase_config import db

stats = Blueprint('stats', __name__)

@stats.route('/results')
def statistics():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))  # Redirect to login if not authenticated

    # Get all user scores
    user_scores = Score.get_user_scores(current_user.id)
    
    # Separate scores by game ID
    scores1_data = [score for score in user_scores if score.gameId == 1]
    scores2_data = [score for score in user_scores if score.gameId == 2]

    # Sort by date
    scores1_data.sort(key=lambda x: x.date)
    scores2_data.sort(key=lambda x: x.date)

    # Extract scores and dates
    scores1 = [score.score for score in scores1_data]
    dates1 = [score.date.strftime('%Y-%m-%d') for score in scores1_data]

    scores2 = [score.score for score in scores2_data]
    dates2 = [score.date.strftime('%Y-%m-%d') for score in scores2_data]

    # Pass data to the template
    return render_template("stats.html", scores1=scores1, dates1=dates1, scores2=scores2, dates2=dates2)
