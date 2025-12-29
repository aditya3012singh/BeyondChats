import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/articles", articleRoutes);    

export default app;