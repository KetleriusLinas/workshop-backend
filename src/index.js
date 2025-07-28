//CRUD
// Create - app.post()
// Read   - app.get()
// Update - app.put()
// Delete - app.delete()


import express from 'express';
const app = express();
const port = 5505;

//middleware
app.use(express.json());

const books = [
    { id: 1, author: 'Kobo Abe', title: 'The box-man' },
    { id: 2, author: 'Obi Van Kenobi', title: 'The D' },
    { id: 3, author: 'Luck', title: 'I\'m Your Father' },
];


app.get('/', (req, res) => { res.send('It\'s a live') });

app.get('/demo', (req, res) => { res.send([a, b, c]) });

app.get('/demo/:id', (req, res) => {
    const id = req.params.id;
    res.send(id)
});

app.get('/demo/:cat/:id', (req, res) => {
    const cat = req.params.cat;
    const id = req.params.id;
    res.send([id, cat]);
});

//Query
app.get('/query', (req, res) => {
    const q = req.query;
    res.send(q)
});
//--------------------------------
app.get('/api/books', (req, res) => {
    res.send(books)
});
app.get('/api/books/:id', (req, res) => {
    const book = books.find((book) => book.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Tokia knyga nerasta!!!')
    }
    res.send(books)
});

//POST

app.post('/api/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        author: req.body.author,
        title: req.body.title
    }
    books.push(newBook);
    res.send(books);
});

app.listen(port, () => { console.log(`Example app listening on port http://localhost:${port}`) });

