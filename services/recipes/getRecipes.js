// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.get_recipes = async (req, res) => {
  console.log("Get call to /recipes/:userid...");

  try {
    const { tag } = req.query;

    let cmd =
      "SELECT r.recipeid, userid, title, instructions, img FROM recipes r";

    if (tag) {
      cmd += ` INNER JOIN tags t ON t.recipeid = r.recipeid WHERE t.tag = "${tag}"`;
    }
    console.log({ cmd });

    const response = await runQuery(cmd);

    res.status(200).json({
      message: "success",
      recipes: response,
    });
  } catch (err) {
    console.log(err);
    //try
    res.status(400).json({
      message: err.message,
      recipes: [],
    });
  } //catch
}; //get
