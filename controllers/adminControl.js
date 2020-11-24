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
        image: imageUrl,
        description: description,
        userId: userId
    });
    product.save()
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getEditArt = (req, res, next) => {
    res.render('../views/pages/edit-art', {
        title: 'Edit Art',
        path: '/edit-art'
    })
};

exports.postEditArt = (req, res, next) => {
    res.redirect('/');
};