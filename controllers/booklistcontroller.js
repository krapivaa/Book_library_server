let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Books = require('../db').import('../models/books');


router.post('/create', validateSession, (req, res) => {
    const BooksEntry = {
        title: req.body.books.title,
        author: req.body.books.author,
        notes: req.body.books.notes,
        date: req.body.books.date,
        haveRead: req.body.books.haveRead,
        willRead: req.body.books.willRead,
        photo: req.body.books.photo,
        owner: req.user.id
    }
    Books.create(BooksEntry)
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json({error: err}))
});



//Gets all books for individual user
router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Books.findAll({
        where: {owner: userid}
    })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json({error: err}))
});


router.put('/update/:entryId', validateSession, function (req, res) {
    const updateBooksEntry = {
        title: req.body.books.title,
        author: req.body.books.author,
        notes: req.body.books.notes,
        date: req.body.books.date,
        haveRead: req.body.books.haveRead,
        willRead: req.body.books.willRead,
        photo: req.body.books.photo,
    };

    const query = { where: {id: req.params.entryId, owner: req.user.id}};

    Books.update(updateBooksEntry, query)
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(500).json({error:  err}));
});

//Gets books which have read
router.get('/haveRead', validateSession, (req, res) => {
    // let haveRead = req.params.haveRead;

    Books.findAll({
        where: {haveRead: true, owner: req.user.id}
    })
    .then(book => res.status(200).json(book))
    .catch(err => res.status(500).json({error: err}))
    //res.send("It worked")
});


router.delete('/delete/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Books.destroy(query)
    .then(() => res.status(200).json({ message: "Book entry has been removed"  }))
    .catch((err) => res.status(500).json({ error: err } ));
});



module.exports = router;