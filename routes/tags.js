var express = require('express');
var router = express.Router();

var getTags = require('../services/tags/getTags')
router.get('/', getTags.get_tags);

module.exports = router;
