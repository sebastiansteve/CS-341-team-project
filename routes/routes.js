const path = require('path');

const express = require('express');

const router = express.Router();

const galleryController = require('../controllers/galleryControl.js');
const adminController = require('../controllers/adminControl.js');
const authController = require('../controllers/authControl');

router.get('/', galleryController.getIndex);

module.exports = router;