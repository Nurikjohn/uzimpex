const express = require('express');

const settingsController = require('./../controllers/settingsController');

const router = express.Router();

router
    .route('/')
    .get(settingsController.getSetting)
    .post(settingsController.createSetting);

router
    .route('/:id')
    .patch(settingsController.updateSetting)
    .delete(settingsController.deleteSetting);

module.exports = router;