var express = require('express');
var http    = require('http');
var path    = require('path');
var app     = express();

var mongo = require('mongodb');
var db    = require('monk')('localhost:27017/blog');

app.configure(function() {
  app.set('db', db);
  app.set('port', process.env.PORT || 5002);
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname +'/public/img/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('F6DGH890S5D89F5'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
app.configure('development', function() {
  app.use(express.errorHandler());
});

var admin    = require('./routes/admin')(app);
var index    = require('./routes/index')(app);
var users    = require('./routes/users')(app);
var articles = require('./routes/articles')(app);

app.get('/',              index.index);
app.get('/admin',         admin.index);
app.get('/admin/articles',         admin.articles.index);
app.post('/admin/articles',        admin.articles.insert);
app.put('/admin/articles/:key',    admin.articles.update);
app.delete('/admin/articles/:key', admin.articles.delete);
app.get('/users',         users.index);
app.get('/articles',      articles.index);
app.get('/articles/:key', articles.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Listening...'+ app.get('port'));
});
