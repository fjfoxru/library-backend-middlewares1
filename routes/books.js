const express = require('express');
const router = express.Router();
const fileMiddleware = require('../middleware/file');
const {Book} = require('../models');

const stor = {
    books: [],
};
[1, 2, 3].map(el => {
    const newBook = new Book(`Книга ${el}`, `описание ${el}`);
    stor.books.push(newBook);
});
const {books} = stor;


router.get('/', (request, responce) => {
    responce.json(books);
});

router.get('/:id', (request, responce) => {
    const {id} = request.params;
    const reqBook = books.find(book => book.id === id);
    if (reqBook) {
        responce.json(reqBook);
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }
});

router.post('/', fileMiddleware.single('fileBook'), (request, responce) => {
        const {fileBook} = request.file;
        const {title, description} = request.body;
        const newBook = new Book(title, description, fileBook);
        books.push(newBook);
        responce.status(201);
        responce.json(newBook);
});

router.put('/:id', (request, responce) => {
    const {id} = request.params;
    const {title, description} = request.body;
    const reqBook = books.findIndex(book => book.id === id);
    if (reqBook !== -1) {
        books[reqBook] === {
            ...reqBook,
            title,
            description
        }
        responce.json(reqBook);
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }
});

router.delete('/:id', (request, responce) => {
    const {id} = request.params;
    const reqBook = books.findIndex(book => book.id == id);
    if (reqBook !== -1) {
        books.splice(reqBook, 1);
        responce.json('ok');
    } else {
        responce.status(404);
        responce.json('нет такой книги');
    }

});


router.post('/api/books/:id/upload', fileMiddleware.single('cover'), (request, responce) => {
    console.log('111');
    if (request.file) {
        const {path} = request.file;
        responce.json(path);
    } else {
        responce.json(null);
    }
})

router.get('/api/books/:id/download', (request, responce) => {
    const {id} = request.params;
    responce.download(__dirname+'/public/img'+id+'.png', (err) => {
        console.log('Ошибка');
    });
    
})

module.exports = router;