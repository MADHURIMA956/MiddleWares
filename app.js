const express = require('express');

const books = require('./book.json');

const app = express();

app.use(express.json());

const auth = (name) =>{
    return (req,res,next) => {
        const originalSendFunc = res.send.bind(res);
        res.send = function(body){
            body.name = "Nrupul Dev"
            console.log(body);
            return originalSendFunc(body)
        };
        next();
    };
};

// get 

app.get('/books',( req , res) => {

    res.send( {books});
});

// post / middle ware

app.post('/',auth("name"),( req,res) => {
    const newBook = [ ...books,req.body];

    res.send(({name : "DHAVAL CHEDDA"}))
})




// get single book 

app.get('/books/:id',(req,res) => {
    const newBook = books.filter((book) => book.id == req.params.id);
    res.send(newBook)
})

// patch

app.patch('/books/:id' , (req,res) => {

    const newBook = books.map((book) => {
         
        if(req.params.id == book.id){
            if( req?.body?.id )book.id = req.body.id;
            if( req?.body?.book_name )book.book_name = req.body.book_name;
            if( req?.body?.page_no )book.page_no = req.body.page_no;
            if( req?.body?.published_year )book.published_year = req.body.published_year;
        }
        return book;
    });
      res.send(newBook);
})

// delete

app.delete('/books/:id',(res,req) => {

    const newBook = books.filter((book) => book.id != req.params.id );
    res.send(newBook);

});

app.listen(2345, function(){
    console.log('Listenning on port 2345')
})