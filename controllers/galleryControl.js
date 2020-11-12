exports.getIndex = (req, res, next) => {
    res.render('../views/pages/index.ejs', {
        title: 'Gallery',
        path: '/index'
    });
};