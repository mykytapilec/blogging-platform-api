import express from "express";
import postRoutes from "./routes/postRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

app.use("/posts", postRoutes);

app.use(errorHandler);

export default app;