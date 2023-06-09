var express = require("express");
var router = express.Router();

var getRecipes = require("../services/recipes/getRecipes.js");
router.get("/", getRecipes.get_recipes);

module.exports = router;
