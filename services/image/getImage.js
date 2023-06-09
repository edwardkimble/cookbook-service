// Inserts a new recipe into the database
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name, s3_region_name } = require("../../utils/aws.js");

const { runQuery } = require("../../utils/utils.js");

exports.get_image = async (req, res) => {
  console.log("Put call to /recipe...");

  try {
    const { bucketkey } = req.params; 

    console.log({bucketkey})

    const s3Cmd = new GetObjectCommand({
      Bucket: s3_bucket_name,
      Key: bucketkey,
    });

    const data = await s3.send(s3Cmd);

    res.set('Content-Type', data.ContentType);
    res.send(data.Body)
  } catch (err) {
    //try
    res.status(400).json({
      message: err.message,
      userid: -1,
    });
  } //catch
}; //get
