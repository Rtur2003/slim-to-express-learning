const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/config');

let users = [];
let nextUserId = 1;

const issueToken = (user) =>
  jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

// ============ KAYIT ==============
exports.register = (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: 'Kullanıcı zaten var.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = {
    id: nextUserId++,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  return res.status(201).json({ message: 'Kayıt başarılı.', token: issueToken(newUser) });
};

// ============ GİRİŞ ==============
exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Şifre yanlış.' });
  }

  return res.json({ message: 'Giriş başarılı', token: issueToken(user) });
};
