import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Application } from "express";

const app: Application = express();

app.use(express.json());

import MainRoute from "./src/routes/index";
app.use("/api", MainRoute);

const port = process.env.PORT || 7001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
