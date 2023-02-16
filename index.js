import express from "express";
import bodyParser from "body-parser";
import fs, { readFileSync } from "fs";

const books = JSON.parse(fs.readFileSync("./db/books.json").toString());

const app = express();
app.use(bodyParser.json());
const port = 4001;

app.get("/", (req, res) => {
  res.send("Books API");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  console.log(req.body);

  books.push(req.body);

  fs.writeFileSync("./db/books.json", JSON.stringify(books));

  res.send("Request recieved");
});

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});
