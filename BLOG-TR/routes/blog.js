const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");
const Blog = require("../models/blog");

const router = Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
   const fileName = `${Date.now()}-${file.originalname}`;
   cb(null, fileName);
  },
});
const upload = multer({ storage: storage });



router.get('/add-new',(req,res)=>{
    return res.render('addBlog',{
        user: req.user
    });
})

router.get('/:id', async(req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
  // console.log('comments',comments);
  
  if (!blog) {
    // If blog not found, render a simple message or redirect
    return res.status(404).render("blog", {
      user: req.user,
      blog: null, // pass null to avoid EJS crash
      comments: [],
    });
  }

   return res.render("blog", {
     user: req.user,
     blog,
     comments,
   });
})


// comment route
router.post('/comment/:blogId', async(req,res)=>{
      await Comment.create({
      content: req.body.content,
      blogId: req.params.blogId,
      createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`);
})










router.post("/", upload.single("coverImage"), async (req, res) => {
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);
    const {title, body}=req.body;
  const blog = await Blog.create({
       title,
       body,
       createdBy: req.user._id,
       coverImageURL:`/uploads/${req.file.filename}`
  })
  return res.redirect(`/blog/${blog._id}`);
});


module.exports = router;