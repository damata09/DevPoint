const express = require('express');
const authRoutes = require('./auth');
const questionRoutes = require('./questions');
const answerRoutes = require('./answers');
const userRoutes = require('./users');
const rewardRoutes = require('./rewards');

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/questions', questionRoutes);
router.use('/api/answers', answerRoutes);
router.use('/api/users', userRoutes);
router.use('/api/rewards', rewardRoutes);

module.exports = router;