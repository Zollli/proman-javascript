# import csv
import connection
#
# STATUSES_FILE = './data/statuses.csv'
# BOARDS_FILE = './data/boards.csv'
# CARDS_FILE = './data/cards.csv'
#
# _cache = {}  # We store cached data in this dict to avoid multiple file readings
#
#
# def _read_csv(file_name):
#     """
#     Reads content of a .csv file
#     :param file_name: relative path to data file
#     :return: OrderedDict
#     """
#     with open(file_name) as boards:
#         rows = csv.DictReader(boards, delimiter=',', quotechar='"')
#         formatted_data = []
#         for row in rows:
#             formatted_data.append(dict(row))
#         return formatted_data
#
#
# def _get_data(data_type, file, force):
#     """
#     Reads defined type of data from file or cache
#     :param data_type: key where the data is stored in cache
#     :param file: relative path to data file
#     :param force: if set to True, cache will be ignored
#     :return: OrderedDict
#     """
#     if force or data_type not in _cache:
#         _cache[data_type] = _read_csv(file)
#     return _cache[data_type]
#
#
# def clear_cache():
#     for k in list(_cache.keys()):
#         _cache.pop(k)
#
#
# def get_statuses(force=False):
#     return _get_data('statuses', STATUSES_FILE, force)
#
#
# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)
#
#
# def get_cards(force=False):
#     return _get_data('cards', CARDS_FILE, force)


@connection.connection_handler
def get_status(cursor):
    cursor.execute("""
    SELECT * FROM statuses
    """)
    result = cursor.fetchall()
    return result


@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
    SELECT * FROM boards
    """)
    result = cursor.fetchall()
    return result


@connection.connection_handler
def add_board(cursor, user_id, title):
    cursor.execute("""
    INSERT INTO boards(user_id, title)
     VALUES (%(user_id)s,%(title)s)
    """,
                   {'user_id': user_id, 'title': title})


@connection.connection_handler
def get_cards_sql(cursor, board_id):
    cursor.execute("""
    SELECT title FROM cards
    WHERE board_id = %(board_id)s
    """,
                   {'board_id': board_id})
    return cursor.fetchall()


@connection.connection_handler
def register_user(cursor, user_name, password):
    cursor.execute('''
    INSERT INTO users(name, hashed_password) 
    VALUES (%(user_name)s, %(password)s)
    ''', {'user_name': user_name, 'password': password})
    return True


@connection.connection_handler
def get_user(cursor, username):
    cursor.execute('''
    SELECT name, hashed_password FROM users WHERE name = %(name)s
    ''', {'name': username})
    return cursor.fetchall()
