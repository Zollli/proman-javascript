from flask import Flask, render_template, jsonify, url_for, request
from util import json_response
from flask_bcrypt import Bcrypt
import data_handler

app = Flask(__name__)
bcrypt = Bcrypt(app)


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


@app.route("/register", methods=['POST', 'GET'])
@json_response
def auth_resp():
    data_json = request.get_json()
    print(data_json)
    data_username = data_json['username']
    data_password = data_json['password']
    hashed_password = bcrypt.generate_password_hash(data_password)
    data_handler.add_user(data_username, hashed_password)
    print(hashed_password, data_username)
    return data_username


@app.route('/login')
def login_handler():
    the_json = request.get_json()
    print(the_json)
    username = the_json['username']
    password = the_json['password']
    data_form_database = data_handler.check_user(username)
    if data_form_database is not None:
        password_valid = bcrypt.check_password_hash(data_form_database['hashed_password'],password)
        if password_valid is True:
            return username
        else:
            return


def main():
    app.run(debug=True)

    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
