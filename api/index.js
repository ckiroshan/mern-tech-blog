import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/test", (req, res) => {
  res.json("test ok2");
});

app.listen(8021);
