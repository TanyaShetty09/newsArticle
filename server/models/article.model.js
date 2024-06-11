const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!!!"]
    },
    articleName: {
        type: String,
        required: [true, "Article name is needed!!!"],
        minLength: [3, "Article name must be at least 3 characters long!!!"]
    },
    articleType: {
        type: String,
        required: [true, "Please indicate type of pet!!!"],
        minLength: [3, "Article type must be at least 3 characters long!!!"]
    },
    articleDescription: {
        type: String,
        required: [true, "Please describe your pet!!!"],
        minLength: [3, "Article description must be at least 3 characters long!!!"]
    }
}, { timestamps: true });

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
