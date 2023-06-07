// Inserts a new recipe into the database
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("../../utils/aws.js");

const uuid = require("uuid");
const { runQuery } = require("../../utils/utils.js");

exports.put_recipe = async (req, res) => {
  console.log("Put call to /recipe...");

  try {
    const data = req.body; // data => JS object

    const { title, instructions, ingredients, img } = data;
    const bytes = Buffer.from(img, "base64");
    const key = uuid.v4();

    let cmd = `
        INSERT INTO recipes (userid, title, instructions, img)
        VALUES (${1}, "${title}", "${instructions}", "${key}.jpg");
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

    const s3Cmd = new PutObjectCommand({
      Bucket: s3_bucket_name,
      Key: key + ".jpg",
      Body: bytes,
    });

    await s3.send(s3Cmd);

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
