const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator')

const productSchema = new mongoose.Schema({
    title: {
        type: [String],
        required: [true, 'Maxsulot nomi kiritilishi zarur.']
    },
    slug: String,
    description: {
        type: [String],
        trim: true
    },
    keywords: String,
    image: {
        type: String,
        default: "images/placeholder.png"
    },
    categoryId: mongoose.Schema.ObjectId,
    subCategoryId: mongoose.Schema.ObjectId,
    details: [String],
    price: Number,
    amount: {
        type: Number,
        default: 0
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

// Doument middleware
productSchema.pre('save', function (next) {
    this.slug = slugify(this.title[0], {
        lower: true
    });

    next()
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;