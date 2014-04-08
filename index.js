var express = require('express');
var routes  = require('./routes');
var users    = require('./routes/users');
var articles = require('./routes/articles');
var http    = require('http');
var path    = require('path');
var app     = express();


var mongo = require('mongodb');
var monk  = require('monk');
var db    = monk('localhost:27017/blog');

// all environments
app.set('port', process.env.PORT || 5002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) { app.use(express.errorHandler()); }

app.get('/', routes.index);
app.get('/users', users.index);
app.get('/articles', articles.index(db));
app.get('/articles/:key', articles.view(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
