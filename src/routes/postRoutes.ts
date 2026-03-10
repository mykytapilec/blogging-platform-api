import { Router } from "express";
import { createPost } from "../controllers/postController";

const router = Router();

router.post("/", createPost);

router.get("/", (req, res) => {
  res.json({ message: "Get all posts" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Get post" });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Update post" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete post" });
});

export default router;