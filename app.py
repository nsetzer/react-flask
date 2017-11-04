
import os
from server.app import app

port=4200
if "PORT" in os.environ:
    port = int(os.environ["PORT"])

app.run(host='localhost', port=port)
