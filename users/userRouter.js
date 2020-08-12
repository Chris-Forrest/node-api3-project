const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');
const { checkUserID } = require('../middleware/validation');
const { checkUser } = require('../middleware/validation');
const { checkPost } = require('../middleware/validation');

const router = express.Router();

router.post('/', checkUser(), (req, res) => {
  userDB.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err.stack)
    res.status(500).json({ message: "Problem posting user to the database."})
  })
});

router.post('/:id/posts', checkPost(), checkUserID(), (req, res) => {
  req.body.user_id = req.params.id;
  postDB.insert(req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: "Cannot post message"})
    })
});

router.get('/', (req, res) => {
  userDB.get()
    .then( users => {
      res.status(200).json(users)
    })
    .catch( err => {
      console.log(err.stack)
      res.status(500).json({ message: "Users not found."})
    })
});

router.get('/:id', checkUserID(), (req, res) => {
  userDB.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: "Cannot get user"})
    })
});

router.get('/:id/posts',checkUserID(), (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: "Cannot get users posts."})
    })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
