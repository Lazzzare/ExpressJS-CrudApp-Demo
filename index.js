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
  const newBook = req.body;
  const result = books.filter((book) => newBook.isbn === book.isbn);
  console.log(result);

  if (result.length === 0) {
    books.push(req.body);
    fs.writeFileSync("./db/books.json", JSON.stringify(books));
    res.send("Request recieved");
  } else {
    res.status(409).send("dublicate isbn found. error!");
  }
});

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});
