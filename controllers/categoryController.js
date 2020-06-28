const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("./../utils/appError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `category-${Date.now()}.${ext}`)
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({storage: multerStorage, fileFilter: multerFilter});

exports.uploadImage = upload.single("image");

exports.getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Category.find();

    //SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
             categories
        }
    });
});

exports.getCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});

exports.createCategory = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        keywords,
        status,
    } = req.body;

    let image = "";

    if (req.file) {
        image = `uploads/${req.file.filename}`;
    }

    const newCategory = await Category.create({
        title,
        description,
        keywords,
        status,
        image
    });

    res.status(201).json({
        status: 'success',
        data: {
            newCategory
        }
    });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
    const {
        title,
        description,
        keywords,
        status,
    } = req.body;

    let image = "";

    if (req.file) {
        image = `uploads/${req.file.filename}`;
    }


    const category = await Category.findByIdAndUpdate(req.params.id, {
        title,
        description,
        keywords,
        status,
        image
    }, {
        new: true,
        runValidators: true
    });

    if (!category) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
        return next(new AppError('Category topilmadi', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});