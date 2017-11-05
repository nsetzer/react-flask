from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from server.app import app, db, User, list_routes

migrate = Migrate(app, db)
manager = Manager(app)

# migrations
manager.add_command('db', MigrateCommand)

@manager.command
def create_db():
    """Creates the db tables."""

    db.create_all()

    user = User("admin","password")
    db.session.add(user)

    db.session.commit()

@manager.command
def routes():
    list_routes();

if __name__ == '__main__':
    manager.run()
