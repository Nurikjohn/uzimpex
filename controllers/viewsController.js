const Setting = require("../models/settingsModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const SubCategory = require("../models/subCategoryModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const fs = require('fs');
const i18n = require("i18n");


exports.index = catchAsync(async (req, res, next) => {
    let lang = req.params.lang || "ru";

    lang = lang === "favicon.ico" ? "ru" : lang;

    const settings = await Setting.findOne({lang});

    let products = await Product.find();
    let productsAll;

    if (products.length) {
        products = products.reverse();
        productsAll = products.slice(4, products.length);
        products = products.slice(0, 4);
    }

    console.log(products);
    console.log(productsAll);

    let langIndex;

    switch (lang) {
        case 'ru': langIndex = 0; break;
        case 'uz': langIndex = 1; break;
        case 'en': langIndex = 2; break;
    }

    i18n.setLocale(req, lang);

    res.status(200).render("index", {
        settings,
        products,
        productsAll,
        lang,
        res,
        langIndex
    });
});

exports.adminPanel = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies._token) {
        token = req.cookies._token;
    }

    if (!token) {
        return res.status(200).render("login");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return res.status(200).render("login");
    }

    const categories = await Category.find();

    res.redirect(`/admin/${categories[0].slug}`);
});

exports.category = catchAsync(async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies._token) {
        token = req.cookies._token;
    }

    if (!token) {
        return res.status(200).render("login");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return res.status(200).render("login");
    }

    const category = await Category.findOne({
        slug: req.params.category,
    });

    const categories = await Category.find();

    const subCategories = await SubCategory.find({
        categoryId: category._id,
    });
    let subCategories2 = [];

    for (let i in subCategories) {
        const products = await Product.find({
            categoryId: subCategories[i].categoryId,
            subCategoryId: subCategories[i]._id,
        });

        const {title, slug, _id} = subCategories[i];
        subCategories2.push({title, slug, _id, products});
    }

    res.status(200).render("admin", {subCategories: subCategories2, categories, current: req.params.category});
});

exports.addProduct = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies._token) {
        token = req.cookies._token;
    }

    if (!token) {
        return res.status(200).render("login");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return res.status(200).render("login");
    }

    const categories = await Category.find();

    const subCategory = await SubCategory.find({categoryId: categories[0]._id});

    res.status(200).render("addProduct", {categories, subCategory});
});

exports.editProduct = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies._token) {
        token = req.cookies._token;
    }

    if (!token) {
        return res.status(200).render("login");
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return res.status(200).render("login");
    }

    const product = await Product.findById(req.params.id);

    const categories = await Category.find();

    const subCategory = await SubCategory.find({categoryId: categories[0]._id});

    res.status(200).render("editProduct", {product, categories, subCategory});
});
