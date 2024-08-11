#!/usr/bin/python3
from sqlalchemy import Column, Integer, String, create_engine, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    user_name = Column(String(20), nullable=False)
    password = Column(String(100), nullable=False)

    todos = relationship('Todo', back_populates='user')


class Todo(Base):
    __tablename__ = 'todos'
    id = Column(Integer, primary_key=True)
    todo = Column(String(200), nullable=True)
    date = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', back_populates='todos')

    def to_dict(self):
        return {
            'id': self.id,
            'todo': self.todo,
            'date': self.date,
            'user_id': self.user_id,
        }

engine = create_engine('sqlite:///test.db')
Base.metadata.create_all(engine)
session = sessionmaker(bind=engine)()

