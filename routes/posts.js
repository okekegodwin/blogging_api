const express = require("express");
const passport = require("passport");
const controllers = require("../controllers/postController");
const router = express.Router();

require("../authentication/auth");


router.get("/", controllers.getAllPosts);
router.get("/:id", controllers.getPostById);
router.post("/", passport.authenticate("jwt", { session: false }), controllers.addPost);
router.put("/:id", controllers.updatePost);
router.delete("/:id", controllers.deletePost);

module.exports = router;