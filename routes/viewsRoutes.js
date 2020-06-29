const express = require("express");

const viewsController = require("./../controllers/viewsController");

const router = express.Router();

router.route("/").get(viewsController.index);

router.route("/admin").get(viewsController.adminPanel);

router.route("/admin/:category").get(viewsController.category);

router.route("/admin/product/add-product").get(viewsController.addProduct);

router.route("/admin/product/edit-product/:id").get(viewsController.editProduct);

router.route("/:lang").get(viewsController.index);

module.exports = router;
