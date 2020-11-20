exports.getSignup = (req, res, next) => {
    res.render('pages/signup', {
        title: 'Signup', 
        path: '/signup',
        errorMessage: req.flash('error')
    });
};

exports.postSignup = (req, res, next) => {
    res.redirect('/');
};

exports.getLogin = (req, res, next) => {
    res.render('pages/login', {
        title: 'Login', 
        path: '/login'
    });
};

exports.postLogin = (req, res, next) => {
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
    });
};