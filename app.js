
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'),
    partials= require('express-partials'),
    flash= require('connect-flash');

var app = express();
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
 // app.set('view options', {layout:true});
  app.use(flash());
  app.use(partials());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
    app.use(express.cookieParser());
 //   app.use(app.router);
   // app.use(express.router(routes));
  app.use(express.static(__dirname +'/'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});






routes(app);



http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

