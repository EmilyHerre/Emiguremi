import cors from "cors";
import express from "express";
import { PORT } from "./config";

const app = express();

app.use(cors());

app.use(express.json());

app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
