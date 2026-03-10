import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message: "title, content and category are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      category,
      tags,
    });

    return res.status(201).json(post);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};