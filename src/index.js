//CRUD
// Create - app.post()
// Read   - app.get()
// Update - app.put()
// Delete - app.delete()

import Joi from 'joi';
import express from 'express';
const app = express();
const port = 5505;

//middleware
app.use(express.json());

const books = [
    {
        id: 1,
        author: 'Kobo Abe',
        title: 'The box-man'
    },
    {
        id: 2,
        author: 'Obi Van Kenobi',
        title: 'The D'
    },
    {
        id: 3,
        author: 'Luke',
        title: 'I\'m Your Father'
    },
];


app.get('/', (req, res) => {
    res.send('It\'s a live');
});

app.get('/demo', (req, res) => {
    res.send(['a', 'b', 'c']);
});

//Params
app.get('/demo/:id', (req, res) => {
    const id = req.params.id;
    res.send(id);
});

app.get('/demo/:cat/:id', (req, res) => {
    const cat = req.params.cat;
    const id = req.params.id;
    res.send([id, cat]);
});

//Query
app.get('/query', (req, res) => {
    const q = req.query;
    res.send(q);
});
//----------------APP----------------

//Get - read
app.get('/api/books', (req, res) => {
    res.send(books);
});
app.get('/api/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));

    if (!book) {
        return res.status(404).send('Tokia knyga nerasta!!!')
    }
    res.send(book)
});

//POST - create

// app.post('/api/books', (req, res) => {
//     const newBook = {
//         id: books.length + 1,
//         author: req.body.author,
//         title: req.body.title
//     }
//     books.push(newBook);
//     res.send(books);
// });

app.post('/api/books', (req, res) => {

    const schema = Joi.object({
        author: Joi.string().min(3).required(),
        title: Joi.string().min(1).required(),
    })

    const validation = schema.validate(req.body);


    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    const newBook = {
        id: books.length + 1,
        author: req.body.author,
        title: req.body.title
    }
    books.push(newBook);
    res.send(books);
});

// PUT - update

app.put('/api/books/:id', (req, res) => {

    const book = books.find((book) => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Tokia knyga nerasta!!!')
    }

    const schema = Joi.object({
        author: Joi.string().min(3).required(),
        title: Joi.string().min(1).required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
    }

    book.author = req.body.author;
    book.title = req.body.author;

    res.send(books);
});

app.listen(port, () => { console.log(`Example app listening on port http://localhost:${port}`) });

