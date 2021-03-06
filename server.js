const express = require('express');
const server = express();

server.use(express.json())
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!  MVP met and stretch for the posts route done also so you can use /users , /users/:id
   /posts, and /posts/:id </h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()}  ${req.ip} ${req.method}  ${req.url}`);

  next()
};

module.exports = server;
