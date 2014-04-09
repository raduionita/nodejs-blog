module.exports = function(app) {
  
  // private code here

  return new function() {
  
    this.index = function(req, res) {
      console.log('Index::index');
      res.render('index', { title: 'Home' });
    };
    
  };
};