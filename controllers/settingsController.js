const Setting = require('./../models/settingsModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require("./../utils/appError");

exports.getSetting = catchAsync(async (req, res, next) => {
    const setting = await Setting.find();

    if (!setting) {
        return next(new AppError('Sozlamalar topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            setting
        }
    });
});

exports.createSetting = catchAsync(async (req, res, next) => {
    const newSettings = await Setting.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            tour: newSettings
        }
    });
});

exports.updateSetting = catchAsync(async (req, res, next) => {
    const setting = await Setting.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!setting) {
        return next(new AppError('Sozlamalar topilmadi', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            product: setting
        }
    });
});

exports.deleteSetting = catchAsync(async (req, res, next) => {
    const setting = await Setting.findByIdAndDelete(req.params.id);

    if (!setting) {
        return next(new AppError('Sozlamalar topilmadi', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});