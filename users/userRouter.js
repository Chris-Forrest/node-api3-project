const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');
//const { checkUserID } = require('../middleware/validation');
//const { checkUser } = require('../middleware/validation');
//const { checkPost } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  userDB.insert(req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch(err => {
    console.log(err.stack)
    res.status(500).json({ message: "Problem posting user to the database."})
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
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

router.get('/:id', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: "Cannot get user"})
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDB.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: "Cannot get users posts."})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDB.remove(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: " Cannot remove user."})
    })
});

router.put('/:id', validateUserId , (req, res) => {
  userDB.update(req.params.id , req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: " Cannot update user."})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  userDB.getById(req.params.id)
    .then(user => {
      if(user){
        req.user = user
        next()
      }else{
        res.status(404).json({ message: "User not found"})
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({ message: "Missing required name field."});
}
  if(!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Missing user data."})
}
  next();
}

function validatePost(req, res, next) {
  if(!Object.keys(req.body).length){
    return res.status(400).json({ message: "Missing post data."})
}
  if(!req.body.text){
    return res.status(400).json({ message: "Missing required text field"})
}
  next();
}

module.exports = router;
