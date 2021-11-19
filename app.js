const express = require('express');

const books = require('./book.json');

const app = express();

app.use(express.json());

// get 

app.get('/books',( req , res) => {

    res.send( {books});
});

// post

app.post('/',( req,res) => {
    const newBook = [ ...books,req.body];

    res.send(newBook)
})

// get single book 

app.get('/:id',(req,res) => {
    const newBook = books.filter((book) => book.id === req.params.id);
    res.send(newBook)
})

app.listen(2345, function(){
    console.log('Listenning on port 2345')
})