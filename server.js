var express = require("express")

var app = express();


app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/_include'));


app.get('/', function (req, res) {
  res.render('index.html');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


function startServer() {
  app.listen(app.get('port'), function () {
    console.log('Express started in ' + app.get('env') +
                ' mode on http://localhost:' + app.get('port') +
                '; press Ctrl + C to terminate');
  });
}


if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}
