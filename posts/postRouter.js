const express = require('express');
const dbConfig = require('../data/dbConfig');
const postDB = require('../posts/postDb')
const router = express.Router();

router.get('/', async (req, res) => {
  try{
    const posts = await postDB.get();
    res.status(200).json(posts)
  }catch(err){
    res.status(500).json({ message: " Problem getting posts."})
  }
});

router.get('/:id',validatePostId, async (req, res) => {
  try {
    const post = await postDB.getById(req.post)
    res.status(200).json(post)
  }catch(err){
    res.status(500).json({ message: "Problem getting post."})
  }
});

router.delete('/:id',validatePostId, async (req, res) => {
  try{
    const post = await postDB.remove(req.post)
    res.status(200).json(post)
  }catch(err){
    res.status(500).json({ message: "Problem deleting post."})
  }
});

router.put('/:id',validatePostId,  async (req, res) => {
  try{
    const post = await postDB.update(req.params.id , req.body)
    res.status(200).json(post)
  }catch(err){
    console.log(err)
    res.status(500).json({ message: "Error editing the post."})
  }
}); 
/*
router.put('/:id', validatePostId ,  (req, res) => {
  postDB.update(req.params.id , req.body)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err.stack)
      res.status(500).json({ message: " Cannot update user."})
    })
}); */

// custom middleware

async function validatePostId(req, res, next) {
  const post = await postDB.getById(req.params.id)
  if(!post){
    return res.status(404).json({ message: " Invalid post ID."})
  }
  req.post = req.params.id
  next();
}

function validatePost(req, res, next ){
  if (!Object.keys(req.body).length){
    return res.stats(400).json({ message: " Missing post data."})
  }
  if(!req.body.text){
    return res.status(400).json({ message: " Missing required text field."})
  }
};


module.exports = router;
