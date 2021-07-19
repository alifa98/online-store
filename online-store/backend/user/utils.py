import re


def password_is_valid(given_password):
    return re.search('([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+)', given_password)


def signup_info_is_valid(first_name, last_name, username, password, address):
    return len(first_name) < 255 and len(last_name) < 255 and len(username) < 255 and 8 <= len(password) < 255\
           and len(address) < 1000 and password_is_valid(password)


def login_is_valid(username, password):
    print(len(password))
    return len(username) < 255 and 8 <= len(password) < 255 and password_is_valid(password)
