import { Router } from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createPostSchema,
  updatePostSchema,
  getPostSchema,
  deletePostSchema,
} from "../schemas/postSchema";

const router = Router();

router.post("/", validateRequest(createPostSchema), createPost);

router.get("/", getPosts);

router.get("/:id", validateRequest(getPostSchema), getPostById);

router.put("/:id", validateRequest(updatePostSchema), updatePost);

router.delete("/:id", validateRequest(deletePostSchema), deletePost);

export default router;