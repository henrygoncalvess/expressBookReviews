const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });

      res.status(200).json({ message: "User successfully registered. Now you can login" });
        
    } else {

      res.status(404).json({ message: "User already exists!" });
    }
  }

  res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        const allBooks = await books
    
        res.status(200).send(allBooks)
    } catch (error){
        res.status(400)
        throw error
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn

        const bookDetails = await books[isbn]

        res.status(200).json(bookDetails)
    } catch (error) {
        res.status(400)
        throw error
    }
});
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    try {
        const author = req.params.author

        const bookAuthor = await Object.values(books).find(value => 
            value.author === author
        )

        res.status(200).json(bookAuthor)
    } catch (error) {
        res.status(400)
        throw error
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    try {
        const title = req.params.title

        const bookTitle = await Object.values(books).find(value => 
            value.title === title
        )

        res.status(200).json(bookTitle)
    } catch (error) {
        res.status(400)
        throw error
    }
});

//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
    try {
        const isbn = req.params.isbn

        const bookReviews = await books[isbn].reviews

        res.status(200).json(bookReviews)
    } catch (error) {
        res.status(400)
        throw error
    }
});

module.exports.general = public_users;
