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

export const getPosts = async (req: Request, res: Response) => {
  try {
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

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({
        message: "title, content and category are required",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, category, tags },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};