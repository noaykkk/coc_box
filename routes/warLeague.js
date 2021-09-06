const express = require('express');
const router = express.Router();
const league = require('../controllers/warLeague');
const catchAsync = require('../public/catchAsync');

router.route('/')
    .get(catchAsync(league.index))
    .post(catchAsync(league.getLeague));

// router.route('/:id')
//     .get(catchAsync(league.showLeague));

router.get('/recentoneWarLeague', league.getRecentOneLeague);

router.get('/recenttwoWarLeague', league.getRecentTwoLeague);

router.get('/recentthreeWarLeague', league.getRecentThreeLeague);

module.exports = router;