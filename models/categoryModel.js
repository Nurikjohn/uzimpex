const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Kategoriya nomi kiritilishi zarur.']
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    keywords: String,
    image: String,
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
categorySchema.pre('save', function (next) {
    this.slug = slugify(this.title, {
        lower: true
    });

    next()
});


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;