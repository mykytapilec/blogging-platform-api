# Blogging Platform API

REST API for a simple blogging platform built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

This project was implemented as part of the backend project from roadmap.sh:
https://roadmap.sh/projects/blogging-platform-api

---

## Tech Stack

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Zod (request validation)
* Jest + Supertest (integration testing)

---

## Features

* Create blog posts
* Get all posts
* Get post by ID
* Update post
* Delete post
* Search posts by term
* Request validation using Zod
* Global error handling
* Integration tests with Jest
* MongoDB ObjectId validation

---

## Project Structure

```
src
 ├── controllers
 │   └── postController.ts
 ├── middleware
 │   ├── errorHandler.ts
 │   └── validateRequest.ts
 ├── models
 │   └── Post.ts
 ├── routes
 │   └── postRoutes.ts
 ├── schemas
 │   └── postSchema.ts
 ├── utils
 │   ├── ApiError.ts
 │   └── asyncHandler.ts
 ├── __tests__
 │   └── post.test.ts
 ├── app.ts
 └── server.ts
```

---

## Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/blogging-platform-api.git
cd blogging-platform-api
```

Install dependencies:

```
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blog-api
```

---

## Running the Application

Start the development server:

```
npm run dev
```

Server will run at:

```
http://localhost:3000
```

---

## Running Tests

Run integration tests:

```
npm run test
```

Run tests with coverage:

```
npm run test -- --coverage
```

---

## API Endpoints

### Create Post

POST `/posts`

Request body:

```
{
  "title": "My First Blog Post",
  "content": "This is the content of the post",
  "category": "Technology",
  "tags": ["Node", "Backend"]
}
```

---

### Get All Posts

GET `/posts`

Optional search:

```
/posts?term=node
```

---

### Get Post by ID

GET `/posts/:id`

---

### Update Post

PUT `/posts/:id`

```
{
  "title": "Updated title",
  "content": "Updated content",
  "category": "Programming",
  "tags": ["Node"]
}
```

---

### Delete Post

DELETE `/posts/:id`

---

## Validation

Requests are validated using **Zod**:

* Required fields are enforced
* MongoDB ObjectId is validated
* Invalid requests return `400 Bad Request`

---

## Error Handling

The API uses a centralized error handling middleware.

Common responses:

* `400 Bad Request`
* `404 Not Found`
* `500 Internal Server Error`

---

## Test Coverage

Integration tests cover:

* CRUD operations
* Request validation
* ObjectId validation
* Search functionality

Tests are written using **Jest** and **Supertest**.

---

## License

This project is for educational purposes as part of the roadmap.sh backend projects.
