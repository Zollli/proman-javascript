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
    persistence.get_cards_sql(1)
    return persistence.get_boards()


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
    if username == 'Dombi':
        return True
    else:
        return False

def execute_register(username, password):
    # hash the password
    hashed_pw = security.hash_password(password)
    return True



def execute_login(username, password):
    hashed_pw = "123"

    #if security.verify_password(password, hashed_pw):
    #    return True
    return True
    # tömör gyönyör