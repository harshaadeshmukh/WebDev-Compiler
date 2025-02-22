import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Okay"));

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
