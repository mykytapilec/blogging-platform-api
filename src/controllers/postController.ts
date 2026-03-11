import { Request, Response } from "express";
import Post from "../models/Post";
import { asyncHandler } from "../utils/asyncHandler";

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("title, content and category are required");
  }

  const post = await Post.create({ title, content, category, tags });

  res.status(201).json(post);
});

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const { term } = req.query;

  let filter = {};

  if (term) {
    filter = {
      $or: [
        { title: { $regex: term, $options: "i" } },
        { content: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ],
    };
  }

  const posts = await Post.find(filter);
  res.status(200).json(posts);
});

export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json(post);
});

export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("title, content and category are required");
  }

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { title, content, category, tags },
    { new: true }
  );

  if (!updatedPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(200).json(updatedPost);
});

export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedPost = await Post.findByIdAndDelete(id);

  if (!deletedPost) {
    res.status(404);
    throw new Error("Post not found");
  }

  res.status(204).send();
});