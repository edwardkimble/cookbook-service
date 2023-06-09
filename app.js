var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var config = require("./utils/config.js");
var logger = require("morgan");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ strict: false, limit: "50mb" }));

var indexRouter = require("./routes/index");
var recipeRouter = require("./routes/recipe");
var recipesRouter = require("./routes/recipes");
var imageRouter = require("./routes/image");
var tagsRouter = require("./routes/tags");

app.use("/", indexRouter);
app.use("/recipe", recipeRouter);
app.use("/recipes", recipesRouter);
app.use("/image", imageRouter);
app.use("/tags", tagsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res
    .status(err.status || 500)
    .json({ message: err.message ?? "unknown error occured" });
});

app.listen(config.service_port, () => {
  startTime = Date.now();
  console.log("web service running...");
  //
  // Configure AWS to use our config file:
  //
  // process.env.AWS_SHARED_CREDENTIALS_FILE = config.cookbook_config;
});

module.exports = app;
