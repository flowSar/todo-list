from flask import jsonify, request, abort
from api.v1.views import app_views
from db_storage import session, User, Todo
from datetime import datetime
import json

@app_views.route('/users', methods=['GET', 'POST'])
def get_users():
    if request.method == 'GET':
        data = session.query(User).all()
        users = []
        for user in data:
            users.append({'username': user.user_name, 'password': user.password})
        return jsonify(users)
    elif request.method == 'POST':
        if request.get_json():
            data = request.get_json()
            print('json data',data)
            session.add(User(user_name=data['username'], password=data['password']))
            session.commit()
            return jsonify({}), 200
        else:
            return abort(404)

@app_views.route('/users/auth', methods=['POST'])
def user_auth():
    users = session.query(User).all()
    data = request.get_json()
    username = data['username']
    password = data['password']
    print('heer')
    for user in users:
        if username == user.user_name and password == user.password:
            return jsonify({}), 200
    return abort(404)



@app_views.route('/user/addtask', methods=['POST'])
def add_task():
    data = request.get_json()
    username = data['username']
    date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    task = data['task']
    user = session.query(User).filter(User.user_name == username).all()
    user_id = int(user[0].id)
    todo = Todo(todo=task, date=date, user_id=user_id)
    session.add(todo)
    session.commit()
    # tasks = session.query(Todo).filter(Todo.user_id==user_id).all()
    return jsonify(), 200

@app_views.route('/user/tasks', methods=['POST'])
def get_tasks():
    data = request.get_json()
    username = data['username']
    user = session.query(User).filter(User.user_name == username).all()
    user_id = int(user[0].id)
    tasks = session.query(Todo).filter(Todo.user_id==user_id).all()
    tasks_list = [task.to_dict() for task in tasks]
    return jsonify(tasks_list), 200

@app_views.route('/user/tasks/<int:id>', methods=['DELETE', 'PUT'])
def delete_task(id):
    username = request.get_json()['username']
    user = session.query(User).filter(User.user_name == username).all()
    user_id = int(user[0].id)
    tasks = session.query(Todo).filter(Todo.user_id==user_id).all()
    if request.method == 'DELETE':
        if tasks:
            session.delete(tasks[id])
            session.commit()
            return jsonify({}), 200
        return abort(404)
    elif request.method == 'PUT':
        if tasks:
            new_task = request.get_json()['task']
            if new_task:
                tasks[id].todo = new_task
            session.commit()
            return jsonify({}), 200
        return abort(404)
