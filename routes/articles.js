module.exports = function(app) {

  // private code here...
  
  var db = app.get('db');

  return new function() {
  
    this.index = function(req, res) {                                   // http://site.com/articles
      console.log('Articles::index');
      var articles = db.get('articles');
      articles.find({}, {}, function(err, data) {
        res.render('articles', {
          'articles': data
        });
      });
    };
    
    this.view = function(req, res) {                                    // http://site.com/articles/article-key
      console.log('Articles::view');
      var key = req.params.key;
      var articles = db.get('articles');
      articles.findOne({key: key}, {}, function(err, data) {
        res.render('article', {
          'article' : data
        });
      });
    };
    
  };
};




