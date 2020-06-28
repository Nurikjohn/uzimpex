const Product = require("./../models/productModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImage = upload.single("image");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("Product topilmadi", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    keywords,
    categoryId,
    subCategoryId,
    details,
    price,
    amount,
  } = req.body;

  const data = {
    title,
    description,
    keywords,
    categoryId,
    subCategoryId,
    details,
    price,
    amount,
  };

  let image = false;

  if (req.file) {
    image = `uploads/${req.file.filename}`;
  }

  if (image) {
    data.image = image;
  }

  const newProduct = await Product.create(data);

  res.status(201).json({
    status: "success",
    data: {
      newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    keywords,
    categoryId,
    subCategoryId,
    details,
    price,
    amount,
  } = req.body;

  const data = {
    title,
    description,
    keywords,
    categoryId,
    subCategoryId,
    details,
    price,
    amount,
  };

  let image = false;

  if (req.file) {
    image = `uploads/${req.file.filename}`;
  }

  if (image) {
    data.image = image;
  }

  const product = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("Product topilmadi", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("Product topilmadi", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
