const express = require('express');
const router = express.Router();
const controller = require('./dashboard.controller');

router.get('/dashboard',controller.index);

module.exports = router;
