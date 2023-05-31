// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.put_recipe = async (req, res) => {
  console.log("Put call to /recipes...");

  try {
    const data = req.body; // data => JS object

    const { title, instructions, ingredients } = data;
    console.log({ data });

    let cmd = `
        INSERT INTO recipes (userid, title, instructions)
        VALUES (${1}, "${title}", "${instructions}");
      `;

    let response = await runQuery(cmd);

    if (response.affectedRows !== 1) {
      throw new Error("failed to insert new row");
    }

    const recipeid = response.insertId;

    cmd =
      "INSERT INTO ingredients (recipeid, ingredientname, amount, measurement) VALUES ";
    ingredients.forEach((ingredient) => {
      const { name, amount, measurement } = ingredient;

      cmd += `(${recipeid}, "${name}", ${amount}, "${measurement}"),`;
    });
    cmd = cmd.substring(0, cmd.length - 1) + ";";
    console.log({ cmd });

    response = await runQuery(cmd);

    if (response.affectedRows !== ingredients.length) {
      throw new Error("failed to insert new rows");
    }

    res.status(200).json({
      message: "inserted",
      recipeid: recipeid,
    });
  } catch (err) {
    //try
    res.status(400).json({
      message: err.message,
      userid: -1,
    });
  } //catch
}; //put
