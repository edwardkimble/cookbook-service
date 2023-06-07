// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.get_recipe = async (req, res) => {
  console.log("Get call to /recipe/:id...");

  try {
    const { id } = req.params; // data => JS object

    let cmd = `
        SELECT * FROM recipes r WHERE r.recipeid = ${id}
      `;

    const recipePromise = runQuery(cmd);

    cmd = `
      SELECT * FROM ingredients i WHERE i.recipeid = ${id}
      `;

    const ingredientsPromise = runQuery(cmd);

    const [recipe, ingredients] = await Promise.all([
      recipePromise,
      ingredientsPromise,
    ]);

    if (recipe.length !== 1) {
      throw new Error("Failed to find recipe");
    }

    const ingredientsList = ingredients.map((ingredient) => {
      return {
        name: ingredient.ingredientname,
        ...ingredient,
      };
    });

    recipe[0].ingredients = ingredientsList;

    res.status(200).json({
      message: "success",
      recipe: recipe[0],
    });
  } catch (err) {
    //try
    res.status(400).json({
      message: err.message,
      recipe: -1,
    });
  } //catch
}; //put
