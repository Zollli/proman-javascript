import persistence


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses_sql()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards()


def get_cards_for_board(board_id):
    persistence.clear_cache()
    all_cards = persistence.get_cards_sql(board_id)
    matching_cards = []
    for card in all_cards:
        if str(card['board_id']) == str(board_id):
            card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
            matching_cards.append(card)
    return matching_cards

def add_board(label):
    persistence.add_board('1', label)