// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.get_recipes = async (req, res) => {
  console.log("Get call to /recipes/:userid...");

  try {
    const { tag } = req.query;

    let cmd = `
      SELECT r.recipeid, userid, title, instructions, img FROM recipes r 
      LEFT OUTER JOIN timestamps ts ON r.recipeid = ts.recipeid
      `;

    if (tag) {
      cmd += ` JOIN tags t ON t.recipeid = r.recipeid WHERE t.tag = "${tag}"`;
    }

    cmd += ` ORDER BY accesstime ASC`;

    console.log({ cmd });

    const response = await runQuery(cmd);

    console.log({ response });
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
