module.exports = function(app) {
  
  // private code here...
  
  return new function() {
  
    this.index = function(req, res){
      console.log('Users::index');
      res.send("Users::index");
    };
  
  }
};

