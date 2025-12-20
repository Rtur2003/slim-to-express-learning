const fs = require('fs');
const path = require('path');

// Lightweight .env loader (avoids extra dependency like dotenv)
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  lines.forEach((line) => {
    if (!line || line.trim().startsWith('#')) return;
    const [key, ...rest] = line.split('=');
    const value = rest.join('=').trim();
    if (key && !(key in process.env)) {
      process.env[key.trim()] = value;
    }
  });
}

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate PORT is within valid range
if (PORT < 1 || PORT > 65535) {
  throw new Error(`PORT must be between 1 and 65535, got: ${PORT}`);
}

// Validate JWT_SECRET exists and has minimum strength
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Set it via environment variable.');
}

if (JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters for security. Current length: ' + JWT_SECRET.length);
}

module.exports = {
  PORT,
  JWT_SECRET
};
