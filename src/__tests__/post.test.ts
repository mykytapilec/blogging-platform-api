import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import Post from "../models/Post";

beforeAll(async () => {
  // Подключаемся к тестовой базе Mongo
  const url = process.env.MONGO_URI_TEST || "mongodb://127.0.0.1:27017/blog-api-test";
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Post.deleteMany({});
});

describe("Post API", () => {
  it("should create a post", async () => {
    const res = await request(app)
      .post("/posts")
      .send({
        title: "Test Post",
        content: "Test content",
        category: "Test",
        tags: ["test"]
      });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Post");
  });

  it("should fail validation on empty post", async () => {
    const res = await request(app).post("/posts").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBeDefined();
  });

  it("should get all posts", async () => {
    await Post.create({ title: "P1", content: "C1", category: "Cat1" });
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should get post by id", async () => {
    const post = await Post.create({ title: "P2", content: "C2", category: "Cat2" });
    const res = await request(app).get(`/posts/${post._id}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("P2");
  });

  it("should return 404 for non-existing post", async () => {
    const res = await request(app).get(`/posts/${new mongoose.Types.ObjectId()}`);
    expect(res.status).toBe(404);
  });

  it("should return 400 for invalid ObjectId", async () => {
    const res = await request(app).get("/posts/123");
    expect(res.status).toBe(400);
  });

  it("should update a post", async () => {
    const post = await Post.create({ title: "Old", content: "Old", category: "Cat" });
    const res = await request(app)
      .put(`/posts/${post._id}`)
      .send({ title: "New", content: "New", category: "Cat", tags: ["updated"] });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("New");
  });

  it("should delete a post", async () => {
    const post = await Post.create({ title: "Del", content: "Del", category: "Cat" });
    const res = await request(app).delete(`/posts/${post._id}`);
    expect(res.status).toBe(204);

    const check = await Post.findById(post._id);
    expect(check).toBeNull();
  });

  it("should filter posts by term", async () => {
    await Post.create({ title: "NodeJS Guide", content: "Learn Node", category: "Tech" });
    await Post.create({ title: "Python", content: "Learn Python", category: "Programming" });

    const res = await request(app).get("/posts?term=node");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toContain("NodeJS");
  });
});