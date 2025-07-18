import express from 'express';
import Note from '../models/noteModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId });
  res.json(notes);
});

router.post('/', authMiddleware, async (req, res) => {
  const { content } = req.body;
  const note = new Note({ content, userId: req.user.userId });
  await note.save();
  res.status(201).json(note);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId
  });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted successfully' });
});

export default router;