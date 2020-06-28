const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true
    },
    productId: mongoose.Schema.ObjectId,
    rate: {
      type: Number,
      default: 0
    },
    ip: String,
    status: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;