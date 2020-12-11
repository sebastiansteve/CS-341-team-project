const path = require('path');
const express = require('express');
const isAuth = require('../middleware/is-auth');
const gridFS = require('multer-gridfs-storage')
const router = express.Router();
const multer = require('multer');
const Promise = require('es6-promise').Promise;
const crypto = require('crypto');

const galleryController = require('../controllers/galleryControl.js');
const adminController = require('../controllers/adminControl.js');
const authController = require('../controllers/authControl');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '_' + file.originalname);
    }
})

var upload = multer({ storage: fileStorage});



//gallery
router.get('/', galleryController.getIndex);
router.get('/art-details', galleryController.getArtDetails); 

//admin
router.get('/my-art', isAuth, adminController.getArt); 
router.get('/view-art', adminController.getViewArt); 
router.get('/add-art', isAuth, adminController.getAddArt); 
router.post('/add-art', isAuth, upload.single('image'), adminController.postAddArt);
router.get('/edit-art', isAuth, adminController.getEditArt);
router.post('/edit-art', isAuth, upload.single('image'), adminController.postEditArt);
router.get('/delete-art', isAuth, adminController.getDeleteArt);

//auth
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);

module.exports = router;