var express = require('express');
var router = express.Router();

var getImage = require('../services/image/getImage')
/* GET home page. */
router.get('/:bucketkey', getImage.get_image);

module.exports = router;
