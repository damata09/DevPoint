const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: [
      'points_earned',
      'badge_earned',
      'mention',
      'reply',
      'system'
    ],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedEntity: {
    type: mongoose.Schema.ObjectId,
    refPath: 'relatedEntityModel'
  },
  relatedEntityModel: {
    type: String,
    enum: ['Post', 'Comment', 'PointTransaction', 'Badge']
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice para buscas frequentes
NotificationSchema.index({ user: 1, isRead: 1 });

module.exports = mongoose.model('Notification', NotificationSchema);