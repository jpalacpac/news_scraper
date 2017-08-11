// Require dependencies
var Article = require('../models/Article');
var Note = require('../models/Note');
var cheerio = require('cheerio');
var request = require('request');

// Export app routes
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get('/index', function(req, res) {

        var articlesArray = [];

        // Make a request for the news section of google
        request('https://news.google.com/news/?ned=us&hl=en', function(err, res2, html) {

            var $ = cheerio.load(html);

            $('a.nuEeue.hzdq5d.ME7ew').each(function(i, element) {

                var articleObj = {};

                articleObj.id = i;
                articleObj.title = $(this).text();
                articleObj.link = $(this).children().attr('href');
                articlesArray.push(articleObj);
            });
            res.render('index', { articles: articlesArray });
        });
    });

    // This is the route used to save an article
    app.post('/articles', function(req, res) {
        var savedArticle = req.body;
        Article.create(savedArticle, function(err, doc) {
            if (err) {
                console.log(err);
                res.redirect('/index');
            } 
            else {
                res.redirect('/index');
            }
        });
    });

    // Route to get all saved articles
    app.get('/articles', function(req, res) {
        Article.find({})
            .populate('notes')
            .exec(function(err, articles) {
                if (err) {
                    res.send(err);
                } 
                else {
                    var allSavedArticles = articles.map(function(article) {
                        return article;
                    });
                    res.render('articles', { articles: allSavedArticles });
                }
            });
    });

    // Route to post notes
    app.post('/notes', function(req, res) {
        var note = req.body;
        Article.findOne({
            title: note.title
        }, function(err, article) {
            Note.create({
                _article: article._id,
                text: note.text
            }, function(err, doc) {
                article.notes.push(doc);
                article.save(function(err) {
                    if (err) {
                        res.send(err);
                    } 
                    else {
                        res.redirect('/articles');
                    }
                });
            });
        });
    });

    // Route to delete a note
    app.delete('/notes', function(req, res) {
        var noteId = req.body.id;
        Note.remove({ _id: noteId }, function(err, note) {
            if (err) {        
                res.send(err);
            } 
            else {           
                res.redirect('/articles');
            }
        });
    });
};