const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// Ensure config can load without external env files during test runs
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-at-least-32-chars-long!';

const app = require('../server');

const startServer = () =>
  new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });

const request = (server, { method, path, body, token }) =>
  new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: server.address().port,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        let parsed = responseBody;
        try {
          parsed = responseBody ? JSON.parse(responseBody) : {};
        } catch (err) {
          // keep raw string if json parse fails
        }

        resolve({ status: res.statusCode, body: parsed });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(data);
    }

    req.end();
  });

test('notes flow enforces auth and basic CRUD works per user', async (t) => {
  const server = await startServer();
  t.after(() => server.close());

  // Unauthorized note creation should fail
  const unauthorizedCreate = await request(server, {
    method: 'POST',
    path: '/notes',
    body: { title: 'x', content: 'y' }
  });
  assert.strictEqual(unauthorizedCreate.status, 401);

  // Register user
  const register = await request(server, {
    method: 'POST',
    path: '/users/register',
    body: { username: 'alice', password: 'secret123' }
  });
  assert.strictEqual(register.status, 201);
  assert.ok(register.body.token, 'register returns token');

  // Login to ensure credentials work
  const login = await request(server, {
    method: 'POST',
    path: '/users/login',
    body: { username: 'alice', password: 'secret123' }
  });
  assert.strictEqual(login.status, 200);
  assert.ok(login.body.token, 'login returns token');

  const token = login.body.token;

  // Create note
  const created = await request(server, {
    method: 'POST',
    path: '/notes',
    body: { title: 'Test', content: 'Content' },
    token
  });
  assert.strictEqual(created.status, 201);
  assert.ok(created.body.id, 'note has id');

  // Read notes
  const fetched = await request(server, {
    method: 'GET',
    path: '/notes',
    token
  });
  assert.strictEqual(fetched.status, 200);
  assert.strictEqual(fetched.body.length, 1);
  assert.strictEqual(fetched.body[0].title, 'Test');

  const noteId = created.body.id;

  // Update note
  const updated = await request(server, {
    method: 'PUT',
    path: `/notes/${noteId}`,
    body: { title: 'Updated' },
    token
  });
  assert.strictEqual(updated.status, 200);
  assert.strictEqual(updated.body.title, 'Updated');

  // Delete note
  const deleted = await request(server, {
    method: 'DELETE',
    path: `/notes/${noteId}`,
    token
  });
  assert.strictEqual(deleted.status, 200);

  // Ensure list is empty
  const finalList = await request(server, {
    method: 'GET',
    path: '/notes',
    token
  });
  assert.strictEqual(finalList.status, 200);
  assert.strictEqual(finalList.body.length, 0);
});
