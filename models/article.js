// Require mongoose (dependencies)
var mongoose = require('mongoose');
// Create Schema class
var Schema = mongoose.Schema;
// Create article schema
var ArticleSchema = new Schema({

    title: {
        type: String,
        trim: true,
        required: true,
    },

    link: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

    notes: [{
        type: Schema.ObjectId,
        ref: 'Note'
    }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;