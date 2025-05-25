const express = require('express');
const {
  getAnswers,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  upvoteAnswer,
  acceptAnswer
} = require('../controllers/answerController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getAnswers)
  .post(protect, createAnswer);

router.route('/:id')
  .put(protect, updateAnswer)
  .delete(protect, deleteAnswer);

router.put('/:id/upvote', protect, upvoteAnswer);
router.put('/:id/accept', protect, acceptAnswer);

module.exports = router;