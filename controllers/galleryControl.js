const Art = require('../models/art');

exports.getIndex = (req, res, next) => {
    Art.find()
    .sort({dateAdded: -1})
    .then(art => {
        res.render('../views/pages/index', { 
            title: 'Gallery',
            path: '/index', 
            itemList: art,
            owner: false
        });
    }) 

};

exports.getArtDetails = (req, res, next) => {
    res.render('../views/pages/art-details', {
        title: 'Art Details',
        path: '/art-details', 
        art: null
    });
};