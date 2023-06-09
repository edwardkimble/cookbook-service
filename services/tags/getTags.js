// Inserts a new recipe into the database
const { runQuery } = require("../../utils/utils.js");

exports.get_tags = async (req, res) => {
  console.log("Get call to /tags");

  try {
    const { tag } = req.query;

    let cmd = 'SELECT DISTINCT(tag) from tags';

    const response = await runQuery(cmd);

    const tags = response.map((tag) => tag.tag)

    res.status(200).json({
      message: "success",
      tags: tags,
    });
  } catch (err) {
    //try
    res.status(400).json({
      message: err.message,
      tags: [],
    });
  } //catch
}; //get
