#!/usr/bin/python3
from flask import Flask, render_template, request, redirect, abort, session
from db_storage import  User
from flask_session import Session
from db_storage import session as db_session

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'supersecretkey'
Session(app)

# this route for rendering the home page or login page
@app.route('/', methods=['GET'])
def home():
    session.clear()
    return render_template('home.html')

# this route for todo page and in dodo page will list all the task the user created
@app.route('/todo', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # extract the username from the URL
        loginuser = request.args.get('username')
        # here I send the username to the page so I can use it to track the userna of the user
        # I know this not the best way but this is the solution I come up ith right now
        return render_template('todo.html',username=loginuser)


# thie route for sign up page which the user can create and account
@app.route('/signup', methods=['GET', 'POST'])
def sign_up():
    """in this method we save user infor to the sqlite database after 
        the user sign up we redirect it to the login page or home page
    """
    if request.method == 'POST':
        username = request.form['userName']
        password = request.form['password']
        user = User(user_name=username, password=password)
        db_session.add(user)
        db_session.commit()
        return redirect('/')
    elif request.method == 'GET':
        return render_template('signup.html')

if __name__ == '__main__':
    app.run(host='localhost', port=2222, debug=True)