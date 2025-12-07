const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../middleware/validation');

const handle = (fn) => (req, res, next) => {
  try {
    return fn(req, res, next);
  } catch (err) {
    return next(err);
  }
};

// Tüm not işlemleri için JWT doğrulaması zorunlu
router.use(authMiddleware);

// GET /notes - kullanıcının kendi notlarını getir
router.get('/', handle(notesController.getNotes));

// POST /notes - yeni not ekle
router.post('/', validation.validateNoteCreate, handle(notesController.addNote));

// PUT /notes/:id - notu güncelle
router.put(
  '/:id',
  validation.validateNoteIdParam,
  validation.validateNoteUpdate,
  handle(notesController.updateNote)
);

// DELETE /notes/:id - notu sil
router.delete('/:id', validation.validateNoteIdParam, handle(notesController.deleteNote));

module.exports = router;
