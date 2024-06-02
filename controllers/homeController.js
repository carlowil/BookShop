exports.about = function(req, res) {
    res.render('about', {});
}

exports.login = function(req, res) {
    res.render('login', {});
}

exports.registration = function(req, res) {
    res.render('registration', {});
}

exports.profile = function(req, res) {
    res.render('profile', {});
}

exports.shop = async function(req, res) {
    await fetch('http://localhost:8080/api/book/')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        res.render('shop', 
        {
            data: data.books
        }
    );
    })
}

exports.book = async function(req, res) {
    let bookId = req.params.bookId;
    console.log(bookId);
    console.log('http://localhost:8080/api/book/' + bookId);
    await fetch('http://localhost:8080/api/book/' + bookId)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log(data);
        res.render('book', {
            data: data.book
        })
    })
}

exports.index = async function(req, res) {
    await fetch('http://localhost:8080/api/book/')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        res.render('shop', 
        {
            data: data.books
        }
    );
    })
}

exports.admin = async function(req, res) {
    await fetch('http://localhost:8080/api/book/')
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        res.render('admin', 
        {
            data: data.books
        }
    );
    })
}

exports.users = function(req, res) {
    res.render('users', {});
}

exports.reviews = function(req, res) {
    res.render('reviews', {});
}

exports.add = function(req, res) {
    res.render('add-book', {});
}

exports.logout = function(req, res) {
    res.cookie("jwt", "", { maxAge: "1" });
    res.redirect("/login");
}

exports.feedback = function(req, res) {
    res.render('feedback', {});
}

exports.red = async function(req, res) {
    let bookId = req.params.id
    fetch(`http://localhost:8080/api/book/${bookId}`).then((book) => {
        return book.json();
    }).then((data) => {
        console.log(data)
        res.render('red-book', {
            data: data.book
        })
    });
}