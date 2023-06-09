var express = require("express");
var router = express.Router();

var getRecipes = require("../services/recipes/getRecipes.js");
var eatAgain = require("../services/recipes/eatAgain.js");

router.get("/", getRecipes.get_recipes);
router.get("/again/:userid", eatAgain.eat_again);

module.exports = router;
