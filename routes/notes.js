const express = require('express');
const router = express.Router();

const notesController = require('../controllers/notesController');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../middleware/validation');
const asyncHandler = require('../middleware/asyncHandler');

// Tüm not işlemleri için JWT doğrulaması zorunlu
router.use(authMiddleware);

// GET /notes - kullanıcının kendi notlarını getir
router.get('/', asyncHandler(notesController.getNotes));

// POST /notes - yeni not ekle
router.post('/', validation.validateNoteCreate, asyncHandler(notesController.addNote));

// PUT /notes/:id - notu güncelle
router.put(
  '/:id',
  validation.validateNoteIdParam,
  validation.validateNoteUpdate,
  asyncHandler(notesController.updateNote)
);

// DELETE /notes/:id - notu sil
router.delete('/:id', validation.validateNoteIdParam, asyncHandler(notesController.deleteNote));

module.exports = router;
