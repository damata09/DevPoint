const mongoose = require('mongoose');

const PointTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['earn', 'redeem', 'transfer', 'penalty'],
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: [
      'code_contribution',
      'bug_report',
      'community_help',
      'event_participation',
      'content_creation'
    ]
  },
  relatedEntity: {
    type: mongoose.Schema.ObjectId,
    refPath: 'relatedEntityModel'
  },
  relatedEntityModel: {
    type: String,
    enum: ['Post', 'Comment', 'Project']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Atualizar pontos do usuário automaticamente
PointTransactionSchema.post('save', async function(doc) {
  if (doc.status === 'approved') {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(doc.user, {
      $inc: { points: doc.points }
    });
  }
});

module.exports = mongoose.model('PointTransaction', PointTransactionSchema);