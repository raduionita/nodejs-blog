
exports.index = function(db) {
  console.log('Articles::index');
  return function(req, res) {
    var articles = db.get('articles');
    articles.find({}, {}, function(err, data) {
      console.log(err);
      res.render('articles', {
        'articles': data
      });
    });
  };
};

exports.view = function(db) {
  console.log('Articles::view');
  return function(req, res) {
    var key = req.params.key;
    var articles = db.get('articles');
    articles.findOne({key: key}, {}, function(err, data) {
      console.log(err);
      res.render('article', {
        'article' : data
      });
    });
  };
};