const Book = require("../models/Book");
const fs = require('fs');

class bookController {
    async addBook(req, res) {
        const book = req.body;
        console.log(book);
        await Book.create({
            name: book.name,
            pub_year: book.pub_year,
            author: book.author,
            description: book.description,
            genres: book.genres,
            image: req.file.filename,
            hidden: false
        }).then((book) => {
            return res.json({message: `Successfully added book ${book.name}!`});
        }).catch((error) =>
            res.status(400).json({
              message: "Book not successful added!",
              error: error.message,
            })
          );
    }
    async delBook(req, res) {
        const id = req.params.id
        console.log(id)
        await Book.findById({ _id: id })
        .then(book => {
                let filePath = `./store/${book.image}`;
                book.deleteOne().exec();
                fs.unlink(filePath, (err) => {
                    if (err) {
                      console.error(`Error removing file: ${err}`);
                      return;
                    }
                    console.log(`File ${filePath} has been successfully removed.`);
                });
            }
        )
        .then(book =>
          res.status(201).json({ 
            status: 201,
            message: "Book successfully deleted"
        })
        )
        .catch(error => {
            console.log(error)
            res
            .status(400)
            .json({ 
                status: 400,
                message: "An error occurred", 
                error: error })
        }
        )
    }
    async chgBook(req, res) {
        const id = req.params.id;
        const newBook = req.body;

        await Book.findOneAndUpdate({ _id: id }, {
            name: newBook.name, 
            pub_year: newBook.pub_year,
            author: newBook.author,
            description: newBook.description,
            genres: newBook.genres,
            image: req.file.filename
        }, 
        { new: true }
        ) .then((book) => {
            res.status("201").json({ 
                status: 201,
                message: `Update successful ${book.name}`
            });
        }).catch((error) => {
            res
            .status(400)
            .json({ 
                status: 400,
                message: "An error occurred", 
                error: error });
        })
    }
    async getBooks(req, res) {
        await Book.find({})
        .then((books) => {
            const bookFunction = books.map(book => {
                const container = {}
                container.id = book.id;
                container.name = book.name;
                container.pub_year = book.pub_year;
                container.author = book.author;
                container.description = book.description;
                container.genres = book.genres;
                container.image = book.image;
                container.hidden = book.hidden;
                return container;
            })
            res.status(200).json({ books: bookFunction })
        }).catch(err =>
            res.status(401).json({ message: "Not successful", error: err.message })
          )
    }
    async getBook(req, res) {
        const bookId = req.params.bookId;
        console.log(bookId);
        await Book.findById({ _id: bookId })
        .then((book) => {
            res.status(200).json({ book: book })
        }).catch(err => {
            res.status(401).json({ message: "Not successful", error: err.message })
        })
    }
}

module.exports = new bookController();