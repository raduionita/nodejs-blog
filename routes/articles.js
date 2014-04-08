
exports.index = function(req, res) {
  res.send('Articles::index');
};

exports.view = function(req, res) {
  res.send('Articles::view');
  res.render('article', {
    title: 'Title of article',
    body : 'Body from db'
  });
};