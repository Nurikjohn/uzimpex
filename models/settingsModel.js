const mongoose = require('mongoose');
const slugify = require('slugify');

const settingsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Tashkilot nomi kiritilishi zarur.']
    },
    description: {
        type: String,
        trim: true
    },
    keywords: String,
    adress: String,
    phone: String,
    fax: String,
    email: String,
    facebook: String,
    instagram: String,
    twitter: String,
    aboutUS: String,
    references: String,
    contact: String,
    image: String,
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


const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;