const express = require('express');
const {
  getRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward
} = require('../controllers/rewardController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/')
  .get(getRewards)
  .post(protect, authorize('admin'), createReward);

router.route('/:id')
  .put(protect, authorize('admin'), updateReward)
  .delete(protect, authorize('admin'), deleteReward);

router.post('/:id/redeem', protect, redeemReward);

module.exports = router;