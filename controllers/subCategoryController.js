const SubCategory = require('../models/subCategoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");


exports.getAllSubCategories = catchAsync(async (req, res, next) => {
    const subCategories = await SubCategory.find({categoryId: req.params.id});

    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: subCategories.length,
        data: {
            subCategories
        }
    });
});

exports.getSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            subCategory
        }
    });
});

exports.createSubCategory = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        keywords,
        status,
        categoryId
    } = req.body;


    const newSubCategory = await SubCategory.create({
        title,
        description,
        keywords,
        status,
        categoryId
    });

    res.status(201).json({
        status: 'success',
        data: {
            newSubCategory
        }
    });
});

exports.updateSubCategory = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        keywords,
        status,
        categoryId
    } = req.body;

    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, {
        title,
        description,
        keywords,
        status,
        categoryId
    }, {
        new: true,
        runValidators: true
    });

    if (!subCategory) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            subCategory
        }
    });
});

exports.deleteSubCategory = catchAsync(async (req, res, next) => {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

    if (!subCategory) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});