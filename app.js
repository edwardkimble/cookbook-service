var createError = require('http-errors');
var express = require('express');
var config = require('./utils/config.js')
var logger = require('morgan');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = express();

app.use(logger('dev'));
app.use(express.json({ strict: false, limit: "50mb" }));

var indexRouter = require('./routes/index');
var recipesRouter = require('./routes/recipes');

app.use('/', indexRouter);
app.use('/recipes', recipesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ message: err.message ?? 'unknown error occured' });
});

app.listen(config.service_port, () => {
  startTime = Date.now();
  console.log("web service running...");
  //
  // Configure AWS to use our config file:
  //
  process.env.AWS_SHARED_CREDENTIALS_FILE = config.photoapp_config;
});

module.exports = app;
