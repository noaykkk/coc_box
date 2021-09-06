const express = require('express');
const router = express.Router();
const clan = require('../controllers/clan');
const catchAsync = require('../public/catchAsync');

router.route('/')
    .get(catchAsync(clan.index))
    .post(catchAsync(clan.listMember))
    .put(catchAsync(clan.updateMember));

router.route('/history')
    .get(catchAsync(clan.memHistory))

module.exports = router;