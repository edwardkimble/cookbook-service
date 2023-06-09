// Inserts a new recipe into the database
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { s3, s3_bucket_name } = require("../../utils/aws.js");

exports.get_image = async (req, res) => {
  console.log("Put call to /recipe...");

  try {
    const { bucketkey } = req.params;

    console.log({ bucketkey });

    const s3Cmd = new GetObjectCommand({
      Bucket: s3_bucket_name,
      Key: bucketkey,
    });

    const data = await s3.send(s3Cmd);
    const imageBuffer = data.Body;
    // const dataType = data.ContentType;
    // const dataLength = data.ContentLength.toString();

    // // console.log(data.ContentType);
    // res.set("Content-Type", dataType);
    // res.set("Content-Length", dataLength);
    // res.send(imgBuffer);
    // Convert the image buffer to a Base64-encoded string
    const imageBase64 = imageBuffer.toString("base64");
    const imageSrc = `data:${data.ContentType};base64,${imageBase64}`;

    res.send(imageSrc);
  } catch (err) {
    //try
    console.log(err);
    res.status(400).json({
      message: err.message,
      userid: -1,
    });
  } //catch
}; //get
