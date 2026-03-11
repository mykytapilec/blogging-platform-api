import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
} from "../controllers/postController";

const router = Router();

router.post("/", createPost);

router.get("/", getPosts);
router.get("/:id", getPostById);

router.put("/:id", (req, res) => {
  res.json({ message: "Update post" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete post" });
});

export default router;