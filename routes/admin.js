module.exports = function(app) {
  
  // private code here
  
  // authorize
  
  var db = app.get('db');
  
  app.locals.modules = ["dashboard", "articles", "users"];
  app.locals.ucfirst = function(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return new function() {
  
    this.index = function(req, res) {
      console.log('Admin::index');
      res.render('admin/index', { 
        module: 'dashboard' 
      });
    };
    
    this.articles = new function() {
      this.index = function(req, res) {
        var articles = db.get('articles');
        articles.find({}, {}, function(err, data) {
          res.render('admin/articles', {
            module  : 'articles',
            articles: data
          });
        });
      };
      
      this.insert = function(req, res) {
        var title = req.body.title;
        var body  = req.body.body;
        var articles = db.get('articles');
        articles.insert({
          title: title,
          key  : title.toLowerCase().replace(/[\W]+/. '-'),
          body : body,
          created : new Date(),
          modified: new Date(),
          status  : 1,
          views   : 0
        }, function(err, data) {
          if(err)
            res.send('Error adding article!');
          else
            // ...
        });
      };
      
      this.update = function(req, res) {
      
      };
      
      this.delete = function(req, res) {
      
      };
      
    };
  };
  
  this.users = new function() {
    this.index = function(req, res) {
      res.render('admin/users', { 
        module: 'users' 
      });
    };
  };
};