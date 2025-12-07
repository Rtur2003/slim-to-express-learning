const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const ensureIdValid = (value) => {
  const id = Number.parseInt(value, 10);
  return Number.isNaN(id) || id <= 0 ? null : id;
};

exports.validateRegistration = (req, res, next) => {
  const { username, password } = req.body;

  if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre zorunludur.' });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({ message: 'Kullanıcı adı en az 3 karakter olmalıdır.' });
  }

  if (password.trim().length < 6) {
    return res.status(400).json({ message: 'Şifre en az 6 karakter olmalıdır.' });
  }

  req.body.username = username.trim();
  next();
};

exports.validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!isNonEmptyString(username) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: 'Kullanıcı adı ve şifre zorunludur.' });
  }

  req.body.username = username.trim();
  next();
};

exports.validateNoteCreate = (req, res, next) => {
  const { title, content } = req.body;

  if (!isNonEmptyString(title) || !isNonEmptyString(content)) {
    return res.status(400).json({ message: 'Başlık ve içerik zorunludur.' });
  }

  req.body.title = title.trim();
  req.body.content = content.trim();
  next();
};

exports.validateNoteUpdate = (req, res, next) => {
  const { title, content } = req.body;

  if (!isNonEmptyString(title) && !isNonEmptyString(content)) {
    return res
      .status(400)
      .json({ message: 'Güncelleme için başlık veya içerikten en az biri sağlanmalıdır.' });
  }

  if (isNonEmptyString(title)) {
    req.body.title = title.trim();
  }

  if (isNonEmptyString(content)) {
    req.body.content = content.trim();
  }

  next();
};

exports.validateNoteIdParam = (req, res, next) => {
  const parsed = ensureIdValid(req.params.id);

  if (!parsed) {
    return res.status(400).json({ message: 'Geçersiz not ID.' });
  }

  // normalize param to number for downstream handlers
  req.params.id = parsed;
  next();
};
