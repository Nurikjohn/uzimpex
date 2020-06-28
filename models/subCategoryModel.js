const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Sub Kategoriya nomi kiritilishi zarur.']
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    keywords: String,
    categoryId: mongoose.Schema.ObjectId,
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

// Doument middleware
subCategorySchema.pre('save', function (next) {
    this.slug = slugify(this.title, {
        lower: true
    });

    next()
});


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;