const Answer = require('../models/Answer');
const Question = require('../models/Question');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all answers
// @route   GET /api/answers
// @access  Public
exports.getAnswers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Create answer
// @route   POST /api/answers
// @access  Private
exports.createAnswer = asyncHandler(async (req, res, next) => {
  const question = await Question.findById(req.body.question);

  if (!question) {
    return next(
      new ErrorResponse(`No question found with id ${req.body.question}`, 404)
    );
  }

  // Add user to req.body
  req.body.author = req.user.id;

  const answer = await Answer.create(req.body);

  // Add points to user for answering
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { points: 10 } // 10 points for answering
  });

  res.status(201).json({
    success: true,
    data: answer
  });
});

// @desc    Upvote answer
// @route   PUT /api/answers/:id/upvote
// @access  Private
exports.upvoteAnswer = asyncHandler(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);

  if (!answer) {
    return next(
      new ErrorResponse(`No answer found with id ${req.params.id}`, 404)
    );
  }

  // Check if user already upvoted
  if (answer.upvotes.includes(req.user.id)) {
    return next(new ErrorResponse('You already upvoted this answer', 400));
  }

  answer.upvotes.push(req.user.id);
  await answer.save();

  // Add points to answer author
  await User.findByIdAndUpdate(answer.author, {
    $inc: { points: 5 } // 5 points for each upvote
  });

  res.status(200).json({
    success: true,
    data: answer
  });
});

// @desc    Accept answer
// @route   PUT /api/answers/:id/accept
// @access  Private
exports.acceptAnswer = asyncHandler(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);
  const question = await Question.findById(answer.question);

  if (!answer) {
    return next(
      new ErrorResponse(`No answer found with id ${req.params.id}`, 404)
    );
  }

  // Check if user is question author
  if (question.author.toString() !== req.user.id) {
    return next(
      new ErrorResponse('Only question author can accept answers', 401)
    );
  }

  // Mark as accepted
  answer.isAccepted = true;
  await answer.save();

  // Mark question as resolved
  question.status = 'resolved';
  await question.save();

  // Add points to answer author
  await User.findByIdAndUpdate(answer.author, {
    $inc: { points: 20 } // 20 points for accepted answer
  });

  res.status(200).json({
    success: true,
    data: answer
  });
});