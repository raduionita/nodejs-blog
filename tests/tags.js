module.exports.parse = function(args, defaults) {
  var results = typeof defaults == "object" && !(defaults instanceof Array) ? defaults : {};
  
  for(var i in args) {
    var arg = args[i];
    if(arg.substr(0, 2) === "--") {
      arg = arg.substr(2);
      if(arg.indexOf('=') !== -1) {
        arg = arg.split('=');
        var key = arg.shift();
        var value = arg.join("=");
        if(/^[0-9]+$/.test(value))
          value = parseInt(value, 10);
        results[key] = value;
      } else {
        results[arg] = true;
      }
    }
  }
  
  return results;
};