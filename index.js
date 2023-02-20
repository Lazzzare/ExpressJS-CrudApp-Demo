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

app.delete("/books/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  for (let i = 0; i < books.length; i++) {
    let book = books[i];

    if (book.isbn === isbn) {
      const deleted = books.splice(i, 1);
      console.log(books);

      fs.writeFileSync("./db/books.json", JSON.stringify(books));

      res.json(deleted);
    }
  }
  res.status(404).send(`Book with isbn: ${isbn} not found`);
});

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});
