const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/async-get-books',function (req, res) {
    let p=new Promise((resolve,reject)=>{
        resolve(res.send(JSON.stringify(books,null,4)));
    });
    p.then(()=>
    {
        console.log("Promise for Task 10 is resolved.");
    })
});

public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  res.send(books[req.params.isbn]);
 });

 public_users.get('/async-isbn/:isbn',function (req, res) {
    let p=new Promise((resolve,reject)=>{
        resolve(res.send(books[req.params.isbn]));
    });
    p.then(()=>
    {
        console.log("Promise for Task 11 is resolved.");
    })
   });
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  for(let key of Object.keys(books))
  {
      if(books[key].author===req.params.author)
      {
          res.send(books[key]);
      }
  }
});

public_users.get('/async-author/:author',function (req, res) {
    let p=new Promise((resolve,reject)=>{
        for(let key of Object.keys(books))
        {
            if(books[key].author===req.params.author)
            {
                resolve(res.send(books[key]));
            }
        }
    });
    p.then(()=>
    {
        console.log("Promise for Task 12 is resolved.");
    })
   });
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    for(let key of Object.keys(books))
    {
        if(books[key].title===req.params.title)
        {
            res.send(books[key]);
        }
    }
});

public_users.get('/async-title/:title',function (req, res) {
    let p=new Promise((resolve,reject)=>{
        for(let key of Object.keys(books))
        {
            if(books[key].title===req.params.title)
            {
                resolve(res.send(books[key]));
            }
        }
    });
    p.then(()=>
    {
        console.log("Promise for Task 13 is resolved.");
    })
   });
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    res.send(books[req.params.isbn].reviews);
});

module.exports.general = public_users;
