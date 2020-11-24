const Art = require('../models/art.js');

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
        userId: userId
    });
    art.save()
    .then(result => {
        res.redirect('/');
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
    const newImageUrl = req.body.imageUrl;

    Art.findById(artId)
    .then(art => {
        art.title = newTitle;
        art.price = newPrice;
        art.description = newDescription;

        art.image = newImageUrl;

        return art.save()
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};