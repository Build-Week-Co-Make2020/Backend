const router = require("express").Router();
const Posts = require("../models/post-models");

router.get("/", (req, res) => {
  Posts.getAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/:id", (req, res) => {
  const newPost = { ...req.body, user_id: req.params.id };

  Posts.addPost(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Posts.getById(id)
    .then((post) => {
      if (post) {
        return Posts.update(id, changes);
      } else {
        res.status(404).json({ message: "could not find post with given id" });
      }
    })
    .then((updatedPost) => {
      res.status(200).json(updatedPost);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((count) => {
      res.status(200).json({ message: "the post has been deleted" });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
