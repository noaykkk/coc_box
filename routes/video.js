const express = require('express');
const router = express.Router();
const video = require('../controllers/video');
const catchAsync = require('../public/catchAsync');

router.route('/collect')
    .get(catchAsync(video.collection))

module.exports = router;