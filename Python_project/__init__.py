from flask import Flask
from flask_login import LoginManager, current_user
from os import path

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'jsacnasnajc'

    from .views import views
    from .auth import auth
    from .site import site
    from .games import games
    from .stats import stats

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/auth/')
    app.register_blueprint(site, url_prefix='/site/')
    app.register_blueprint(games, url_prefix='/games/')
    app.register_blueprint(stats, url_prefix='/stats/')

    from .models import User

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.get(id)

    # Add a context processor to inject current_user globally
    @app.context_processor
    def inject_user():
        return dict(user=current_user)

    return app
