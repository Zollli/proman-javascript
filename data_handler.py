import persistence
import security


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    persistence.get_boards()
    return persistence.get_boards()

#
# def get_cards_for_board(board_id):
#     persistence.clear_cache()
#     all_cards = persistence.get_cards()
#     matching_cards = []
#     for card in all_cards:
#         if card['board_id'] == str(board_id):
#             card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#             matching_cards.append(card)
#             return matching_cards


def add_board(label):
    persistence.add_board('1', label)
    pass


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards()
    matching_cards = []
    for card in all_cards:
        if card['board_id'] == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards


def check_username_in_db(username):
    user_data = persistence.get_user(username)
    if user_data != [] and user_data[0]['name'] == username: # boi TODO
        return True
    else:
        return False

def execute_register(username, password):
    return persistence.register_user(username, password)




def execute_login(username, password):

    data_form_database = persistence.get_user(username)
    if data_form_database[0]['name'] is not None:
        if security.verify_password(password, data_form_database[0]['hashed_password']):
            return {'Successful': True}
        else:
            return {'Successful': False, 'message': 'invalid password'}
    else:
        return {'Successful': False, 'message': 'invalid username'}

def add_user(username, password):
    persistence.register_user(username, password)

def check_user(username):
    return persistence.get_user(username)
