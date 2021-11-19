const express = require('express');

const users = require('./book.json');

const app = express();

// const logger = (req,res,next ) => {
//     console.log("before");
//     next();
//     console.log("after");
// };


const authenticate = (req,res,next ) => {
        console.log("authenticate");
        next();
        console.log("after");
};

const authorise = (permission) => {
    return (req, res, next) => {
      const originalSendFunc = res.send.bind(res);
      res.send = function (body) {
        body.name = "Nrupul Dev";
        console.log(body); // do whatever here
        return originalSendFunc(body);
      };
      next();
    };
  };


//   app.use(logger);

// get , does not requre authentication
app.get('/users', (req,res) => {
    console.log("From inside route handlers");
    res.send(users)
})


// post ,  requre authentication
app.post('/', authenticate,authorise("editor"),(req,res) => {
    console.log("From inside Post");
    res.send({ name: "Dhaval Chedda" });
})


// get , does not requre authentication
app.get('/users/:email', (req,res) => {

    const user = users.filter((user) => user.email === req.params.email);
    res.send(users);
})


app.listen(2345,function(){
    console.log("listinning on the port 2345"); 
})