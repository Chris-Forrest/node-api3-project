const express = require('express');
const userDB = require('./userDb');
const postDB = require('../posts/postDb');
const { checkUserId } = require('../middleware/validation');
const { checkUser } = require('../middleware/validation');
const { checkPost } = require('../middleware/validation');

const router = express.Router();

router.post('/', checkUser(), (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
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
