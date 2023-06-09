// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.eat_again = async (req, res) => {
  console.log("Get call to /recipes/again/:userid...");

  try {
    const { userid } = req.params;

    let cmd = `
      SELECT r.recipeid, userid, title, instructions, img FROM recipes r
      INNER JOIN timestamps t ON r.recipeid = t.recipeid
      WHERE userid = ${userid}
      ORDER BY t.accesstime ASC;
      `;

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
