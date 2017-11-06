import os
import unittest
import tempfile
import json

from .app import app, db, db_reset

class AuthAppWrapper(object):
    """docstring for AuthAppWrapper"""
    def __init__(self, app, token):
        super(AuthAppWrapper, self).__init__()
        self.app = app
        self.token = token

    def get(self, *args, **kwargs):
        return self._wrapper(self.app.get, args,kwargs)

    def post(self, *args, **kwargs):
        return self._wrapper(self.app.post, args,kwargs)

    def put(self, *args, **kwargs):
        return self._wrapper(self.app.put, args,kwargs)

    def delete(self, *args, **kwargs):
        return self._wrapper(self.app.delete, args,kwargs)

    def _wrapper(self, method, args, kwargs):
        if "headers" not in kwargs:
            kwargs['headers'] = {}
        if "Authorization" not in kwargs['headers']:
            kwargs['headers']['Authorization'] = self.token
        return method(*args,**kwargs)



class AppTestCase(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.app = app.test_client()
        with self.app:
            db_reset()

    def tearDown(self):
        pass

    def login(self, email, password):
        """
        Attempt to generate a session token for the given user.
        returns a new Application wrapper, which automatically
        sends the authentication token with any request.
        """
        body = {
            "email" : email,
            "password" : password,
        }
        res = self.app.post('/api/user/login',
                            data=json.dumps(body),
                            content_type='application/json');
        self.assertEqual(res.status_code,200)
        data = json.loads(res.data)
        return AuthAppWrapper(self.app, data['token'])

    def test_sample(self):
        res = self.app.get('/api/random')
        body = json.loads(res.data)
        self.assertEqual(res.status_code,200)
        self.assertLessEqual(body['value'],100)
        self.assertGreaterEqual(body['value'],0)

    def test_login(self):

        email = "admin"
        password="password"
        app = self.login( email, password)

        res = app.get("/api/user")
        body = json.loads(res.data)
        self.assertEqual(res.status_code,200)

        user = body['result']
        self.assertEqual(user['email'],email)
