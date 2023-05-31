var express = require("express");
var router = express.Router();

var uploadRecipe = require("../services/recipes/uploadRecipe.js");
var getRecipe = require("../services/recipes/getRecipe.js");
/* GET users listing. */
router.put("/", uploadRecipe.put_recipe);
router.get("/:id", getRecipe.get_recipe);

module.exports = router;
