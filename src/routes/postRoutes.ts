import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all posts" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Get post ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.json({ message: "Create post" });
});

router.put("/:id", (req, res) => {
  res.json({ message: `Update post ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ message: `Delete post ${req.params.id}` });
});

export default router;