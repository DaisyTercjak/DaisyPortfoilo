from flask import Blueprint, render_template, flash, request
from datetime import datetime
from flask_login import login_required, current_user
from .firebase_config import db

site = Blueprint('site', __name__)

@site.route('/add-car', methods=['GET', 'POST'])
@login_required
def addCar():
    if request.method == 'POST':
        brand = request.form.get('brand')
        value = request.form.get('value')
        quantity = request.form.get('quantity')

        # TODO: Implement car functionality with Firebase if needed
        # from .models import Car
        # Car.create(brand, value, quantity, current_user.id)

    return render_template("add_car.html", user=current_user)