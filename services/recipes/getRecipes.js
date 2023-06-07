// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.get_recipes = async (req, res) => {
  console.log("Get call to /recipes/:userid...");

  try {
    const { userId } = req.params; // data => JS object

    // const { category } = req.query;

    let cmd = `
        SELECT * FROM recipes r WHERE r.userid = ${userId}
      `;

    const response = await runQuery(cmd);

    res.status(200).json({
      message: "success",
      recipes: response,
    });
  } catch (err) {
    //try
    res.status(400).json({
      message: err.message,
      recipes: [],
    });
  } //catch
}; //put
