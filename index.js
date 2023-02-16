import express from "express";
import bodyParser from "body-parser";

const books = [
  {
    isbn: "213123",
    title: "ქარავანი",
    author: "ჯემალ ქარჩხაძე",
  },
  {
    isbn: "53231",
    title: "გზაზე ერთი კაცი მიდიოდა",
    author: "ოთარ ჭილაძე",
  },
  {
    isbn: "09987",
    title: "სამოსელი პირველი",
    author: "გურამ დოჩანაშვილი",
  },
];

const app = express();
const port = 4001;

app.get("/", (req, res) => {
  res.send("Books API");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  console.log("POST Request received");

  res.send("POST Request Response");
});

app.listen(port, () => {
  console.log(`Started server on port: ${port}`);
});
