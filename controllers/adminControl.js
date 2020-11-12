exports.getAddArt = (req, res, next) => {
    res.render('../views/pages/add-art',{
        title: 'Add Art',
        path: '/add-art'
    });
};

exports.postAddArt = (req, res, next) => {
    res.redirect('/');
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