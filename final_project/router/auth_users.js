const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
    let userValid = users.filter((user) => {
        return user.username === username;
    });
    
    return userValid.length > 0;
}

const authenticatedUser = (username,password) => {
    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
    });

    return validusers.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const { username, password } = req.body
  
    if (!username || !password) {
        res.status(404).json({ message: "Error logging in" });
    }
  
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
    
        req.session.authorization = {
            accessToken, username
        };
      
        res.status(200).send("User successfully logged in");

    } else {
        res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
