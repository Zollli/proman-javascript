from flask import Flask, render_template, jsonify, url_for, request
from util import json_response
import data_handler
import security

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)

# ez az elso fajta logika.
@app.route("/register", methods=['POST', 'GET'])
@json_response
def auth_resp():
    data_json = request.get_json()
    hashed_password = security.hash_password(data_json['password'])

    if data_handler.check_username_in_db(data_json['username']):
        return {'Successful': False, 'message': 'already_in_use'}

    data_handler.execute_register(data_json['username'], hashed_password)
    # load into SESSION(?)
    return {'Successful': True}

# ez a masodik fajta logika. Melyik jobb? #TODO
@app.route("/login", methods=['POST', 'GET'])
@json_response
def login():
    data_json = request.get_json()
    return data_handler.execute_login(data_json['username'], data_json['password'])



@app.route('/login_p', methods=['POST', 'GET'])
@json_response
def login_handler():
    the_json = request.get_json()
    print(the_json)
    username = the_json['username']
    password = the_json['password']
    hashed_new_password = bcrypt.generate_password_hash(password)
    data_form_database = data_handler.check_user(username)
    print(hashed_new_password, username, data_form_database[0]['hashed_password'].encode('utf-8'))
    print(data_form_database[0]['hashed_password'].decode('utf-8') == hashed_new_password)
    if data_form_database[0]['name'] is not None:
        if data_form_database[0]['hashed_password'].decode('utf-8') == hashed_new_password:
            return username
        else:
            error = 'invalid password'
            return error
    else:
        error = 'invalid username'
        return error


def main():
    app.run(debug=True)

    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
