from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from firebase_admin import auth as firebase_auth
from .firebase_config import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        try:
            # Sign in user with Firebase
            user_record = firebase_auth.get_user_by_email(email)
            # Get additional user data from Firestore
            user_doc = db.collection('users').document(user_record.uid).get()
            
            if user_doc.exists:
                user_data = user_doc.to_dict()
                user = User(user_record.uid, email, user_data.get('first_name'))
                login_user(user, remember=True)
                flash('Logged in successfully!', category='success')
                return redirect(url_for('views.home'))
            else:
                flash('User data not found.', category='error')
        except:
            flash('Email or password incorrect.', category='error')

    return render_template("login.html", text="Testing", info="Testing info", user="Daisy", logged_in=False)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/sign-up', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        form_valid = True

        try:
            # Check if user already exists
            firebase_auth.get_user_by_email(email)
            flash(f'Email "{email}" already in use.', category='error')
            form_valid = False
        except firebase_auth.UserNotFoundError:
            pass

        if len(email) < 4:
            flash(f'Email "{email}" must be greater than 3 characters.', category='error')
            form_valid = False
        elif len(first_name) < 2:
            flash(f'FirstName "{first_name}" must be greater than 2 characters.', category='error')
            form_valid = False
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
            form_valid = False
        elif len(password1) < 6:
            flash('Password must be at least 6 characters.', category='error')
            form_valid = False

        if form_valid:
            try:
                # Create user in Firebase Authentication
                user_record = firebase_auth.create_user(
                    email=email,
                    password=password1
                )

                # Store additional user data in Firestore
                user_data = {
                    'email': email,
                    'first_name': first_name
                }
                db.collection('users').document(user_record.uid).set(user_data)

                # Create User object and log in
                user = User(user_record.uid, email, first_name)
                login_user(user, remember=True)
                flash('Account created!', category='success')
                return redirect(url_for('views.home'))
            except Exception as e:
                flash(f'Error creating account: {str(e)}', category='error')

    return render_template("sign_up.html")

@auth.route('/add-product', methods=['GET', 'POST'])
@login_required
def addProducts():
    if request.method == 'POST':
        name = request.form.get('productName')
        brand = request.form.get('brand')
        value = request.form.get('value')
        quantity = request.form.get('quantity')

        try:
            from .models import Product
            product = Product.create(name, brand, int(value), int(quantity), current_user.id)
            flash('Product added successfully!', category='success')
        except Exception as e:
            flash(f'Error adding product: {str(e)}', category='error')

    return render_template("add_product.html", user=current_user)



