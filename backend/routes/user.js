const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserQuestions,
  getUserAnswers
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, authorize('admin'), deleteUser);

router.get('/:id/questions', getUserQuestions);
router.get('/:id/answers', getUserAnswers);

module.exports = router;