const art = require('../models/art.js');
const Art = require('../models/art.js');
const fileHelper = require('../util/fileManager');

exports.getArt = (req, res, next) => {
    const user = req.user;

    Art.find()
    .sort({dateAdded: -1})
    .then(art => {
        res.render('../views/pages/index.ejs',{
        title: 'My Art',
        path: '/my-art',
        user: user,
        itemList: art,
        owner: true
        });
    })
    .catch(err => console.log(err));
}; 

exports.getViewArt = (req, res, next) => { 
    const artId = req.query.artId;

    Art.findById(artId)
    .then(art => {
        let isOwner = (req.user === art.userId);

        res.render('../views/pages/view-art.ejs',{
        title: art.title,
        path: '/view-art',
        art: art,
        owner: isOwner
        });
    })
    .catch(err => console.log(err));
}; 

exports.getAddArt = (req, res, next) => {
    res.render('../views/pages/add-art',{
        title: 'Add Art',
        path: '/add-art'
    });
};

exports.postAddArt = (req, res, next) => { 
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file;
    const userId = req.user;

    if(!image){
        res.redirect('/add-art');
    }

    const imageUrl = image.path;

    const art = new Art({
        title: title, 
        tags: [], 
        image: imageUrl,
        description: description,
        userId: userId,
        dateAdded: new Date()
    });
    art.save()
    .then(result => {
        res.redirect('/my-art');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getEditArt = (req, res, next) => {
    const artId = req.query.artId;
    Art.findById(artId).then(art => {
        res.render('../views/pages/edit-art', {
        title: 'Edit Art',
        path: '/edit-art',
        art: art
        }) 
    })
};

exports.postEditArt = (req, res, next) => { 
    const artId = req.body.artId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newImage = req.file;

    Art.findById(artId)
    .then(art => {
        art.title = newTitle;
        art.description = newDescription;
        art.lastEdited = new Date();

        if(newImage){
            fileHelper.deleteFile(art.image);
            art.image = newImage.path;
        }

        return art.save()
    })
    .then(result => {
        res.redirect('/my-art');
    })
    .catch(err => console.log(err));
};

exports.getDeleteArt = (req, res, next) => {
    const artId = req.query.artId;

    Art.findById(artId)
    .then(art => {
        fileHelper.deleteFile(art.image);
        return Art.findByIdAndRemove(artId);
    })
    .then(() => {
        res.redirect('/my-art');
    })
    .catch(err => console.log(err));
};