import persistence


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


def get_cards_for_board(board_id):
    return persistence.get_cards_sql(board_id)


def add_board(label):
    persistence.add_board('1', label)
