
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory books array
let books = [
    { id: 1, title: 'Atomic Habits', author: 'James Clear' },
    { id: 2, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
    { id: 3, title: 'The Alchemist', author: 'Paulo Coelho' }
];

// 1. GET - Get all books
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

// 2. GET - Get one book by ID
app.get('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.status(200).json(book);
});

// 3. POST - Create a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: 'Title and author are required'
        });
    }

    const newBook = {
        id: books.length
            ? Math.max(...books.map(book => book.id)) + 1
            : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book created successfully',
        book: newBook
    });
});

// 4. PUT - Update a book
app.put('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: 'Title and author are required'
        });
    }

    book.title = title;
    book.author = author;

    res.status(200).json({
        message: 'Book updated successfully',
        book
    });
});

// 5. DELETE - Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = Number(req.params.id);

    const bookIndex = books.findIndex(
        book => book.id === bookId
    );

    if (bookIndex === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.status(200).json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
