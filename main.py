from flask import Flask, render_template, jsonify, url_for, request
from util import json_response

import data_handler

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


@app.route("/register", methods=['POST', 'GET'])
def auth_resp():
    data_json = request.get_json()

    if data_handler.check_username_in_db(data_json['username']):
        return jsonify({'already_in_use': True, 'Successful': False})

    if data_handler.execute_register(data_json['username'], data_json['password']):
        # load into SESSION(?)
        return jsonify({'already_in_use': False, 'Successful': True})

@app.route("/login", methods=['POST', 'GET'])
def login():
    data_json = request.get_json()
    if data_handler.execute_login(data_json['username'], data_json['password']):
        return jsonify({'Successful': True})


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
