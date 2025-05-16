from flask_login import UserMixin
from datetime import datetime

class User(UserMixin):
    def __init__(self, uid, email, first_name):
        self.id = uid
        self.email = email
        self.first_name = first_name

    @staticmethod
    def get(user_id):
        from .firebase_config import db
        user_doc = db.collection('users').document(user_id).get()
        if user_doc.exists:
            user_data = user_doc.to_dict()
            return User(user_id, user_data.get('email'), user_data.get('first_name'))
        return None

class Note:
    def __init__(self, id, data, date, user_id):
        self.id = id
        self.data = data
        self.date = date
        self.user_id = user_id

    @staticmethod
    def create(data, user_id):
        from .firebase_config import db
        note_ref = db.collection('notes').document()
        note_data = {
            'data': data,
            'date': datetime.now(),
            'user_id': user_id
        }
        note_ref.set(note_data)
        return Note(note_ref.id, data, note_data['date'], user_id)

    @staticmethod
    def get_user_notes(user_id):
        from .firebase_config import db
        notes = []
        for doc in db.collection('notes').where('user_id', '==', user_id).stream():
            data = doc.to_dict()
            notes.append(Note(doc.id, data.get('data'), data.get('date'), data.get('user_id')))
        return notes

class Product:
    def __init__(self, id, name, brand, value, quantity, user_id):
        self.id = id
        self.name = name
        self.brand = brand
        self.value = value
        self.quantity = quantity
        self.user_id = user_id

    @staticmethod
    def create(name, brand, value, quantity, user_id):
        from .firebase_config import db
        product_ref = db.collection('products').document()
        product_data = {
            'name': name,
            'brand': brand,
            'value': value,
            'quantity': quantity,
            'user_id': user_id
        }
        product_ref.set(product_data)
        return Product(product_ref.id, name, brand, value, quantity, user_id)

    @staticmethod
    def get_user_products(user_id):
        from .firebase_config import db
        products = []
        for doc in db.collection('products').where('user_id', '==', user_id).stream():
            data = doc.to_dict()
            products.append(Product(
                doc.id,
                data.get('name'),
                data.get('brand'),
                data.get('value'),
                data.get('quantity'),
                data.get('user_id')
            ))
        return products

class Score:
    def __init__(self, id, gameId, score, user_id, date):
        self.id = id
        self.gameId = gameId
        self.score = score
        self.user_id = user_id
        self.date = date

    @staticmethod
    def create(gameId, score, user_id):
        from .firebase_config import db
        score_ref = db.collection('scores').document()
        score_data = {
            'gameId': gameId,
            'score': score,
            'user_id': user_id,
            'date': datetime.now()
        }
        score_ref.set(score_data)
        return Score(score_ref.id, gameId, score, user_id, score_data['date'])

    @staticmethod
    def get_user_scores(user_id):
        from .firebase_config import db
        scores = []
        for doc in db.collection('scores').where('user_id', '==', user_id).stream():
            data = doc.to_dict()
            scores.append(Score(
                doc.id,
                data.get('gameId'),
                data.get('score'),
                data.get('user_id'),
                data.get('date')
            ))
        return scores

