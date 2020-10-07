const express = require('express');
const db=require("./postDb")
const router = express.Router();
const {validatePostId} = require("../middleware/postMidW")

router.get('/', (req, res, next) => {
  // do your magic!
  db.get()
  .then((post)=>{
    res.status(200).json(post)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id',validatePostId, (req, res, next) => {
  // do your magic!
db.getById(req.params.id)
.then((post)=>{
  res.status(200).json(post)
})
.catch((error) => {
  next(error)
})

});

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!
  db.remove(req.params.id)
  .then((removed)=>{
    if (removed){
      return res.status(200).json({message:"Post has been deleted"})
    }

  })
  .catch((error) => {
    next(error)
  })
});

router.put('/:id',validatePostId, (req, res) => {
  // do your magic!
  db.update(req.body.id, req.body)
  .then((updated)=>{
if(updated){
 return  res.status(200).json({message:"I am updated"})
}
  })
});





module.exports = router;
