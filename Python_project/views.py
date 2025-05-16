from flask import Blueprint, render_template, flash, request
from datetime import datetime
from flask_login import login_required, current_user
from .models import Note
from .firebase_config import db

views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
def home():
    # if request.method == 'POST':
    #     data = request.form
    #     # print(data)
    #     note = request.form.get('note')
    #
    #     if len(note) < 10:
    #         flash('Note must be greater than 10 characters.', category='error')
    #     else:
    #         Note.create(note, current_user.id)
    #         flash('Note added!', category='success')

    return render_template("home.html", text=get_today_date_and_day(), user=current_user, show_header=True)

def get_today_date_and_day():
    today = datetime.now()
    date_string = today.strftime("%Y-%m-%d")
    day_name = today.strftime("%A")
    return f"Today's date is {date_string}, and it's a {day_name}."

@views.route('/project-info')
def project_info():
    return render_template("project_info.html")

@views.route('/project-path')
def project_path():
    return render_template("project_path.html")
