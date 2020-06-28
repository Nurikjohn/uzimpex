const Comment = require('./../models/commentsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("./../utils/appError");

exports.getAllComments = catchAsync(async (req, res, next) => {
    const comments = await Comment.find({productId: req.params.id});

    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: comments.length,
        data: {
            comments
        }
    });
});

exports.getComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new AppError('Comment topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            comment
        }
    });
});

exports.createComment = catchAsync(async (req, res, next) => {
    const newComment = await Comment.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            newComment
        }
    });
});

exports.updateComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!comment) {
        return next(new AppError('Comment topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            comment
        }
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
        return next(new AppError('Comment topilmadi', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});