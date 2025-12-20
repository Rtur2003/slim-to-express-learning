let notes = [];
let nextNoteId = 1;

// ========================
//      GET /notes
// ========================
exports.getNotes = (req, res) => {
  const userNotes = notes.filter((note) => note.ownerId === req.user.id);
  return res.json(userNotes);
};

// ========================
//     POST /notes
// ========================
exports.addNote = (req, res) => {
  const { title, content } = req.body;

  const newNote = {
    id: nextNoteId++,
    ownerId: req.user.id,
    title,
    content
  };

  notes.push(newNote);

  return res.status(201).json(newNote);
};

// ========================
//     PUT /notes/:id
// ========================
exports.updateNote = (req, res) => {
  // req.params.id is already validated and parsed by validateNoteIdParam middleware
  const noteId = req.params.id;

  const note = notes.find((n) => n.id === noteId && n.ownerId === req.user.id);

  if (!note) {
    return res.status(404).json({ message: 'Not bulunamadı.' });
  }

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;

  return res.json(note);
};

// ========================
//     DELETE /notes/:id
// ========================
exports.deleteNote = (req, res) => {
  // req.params.id is already validated and parsed by validateNoteIdParam middleware
  const noteId = req.params.id;

  const index = notes.findIndex((n) => n.id === noteId && n.ownerId === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not bulunamadı.' });
  }

  notes.splice(index, 1);

  return res.json({ message: 'Not silindi.' });
};
