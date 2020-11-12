const Art = require('../models/art');

exports.getIndex = (req, res, next) => {
    res.render('../views/pages/index', {
        title: 'Gallery',
        path: '/index', 
        itemList: null
    });
};

exports.getArtDetails = (req, res, next) => {
    res.render('../views/pages/art-details', {
        title: 'Art Details',
        path: '/art-details', 
        itemList: null
    });
};