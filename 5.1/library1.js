const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())

let books = [
    {isbn: "978-0-14-044081-5", title: "Pride and Prejudice", year: 1813,author: "Jane Austen"},
    {isbn: "978-1-59322-022-9", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee"},
    {isbn: "978-0-8041-7207-8", title: "The Catcher in the Rye", year: 1951, author: "J.D. Salinger"},
    {isbn: "978-0-06-112008-4", title: "1984", year: 1949, author: "George Orwell"},
    {isbn: "978-0-553-21135-3", title: "The Hobbit", year: 1937, author: "J.R.R. Tolkien"}
]



app.listen(port, () => {
    console.log(`Library API on port ${port}`);
});
app.get('/', (request, response) => {
    response.send('Enter something in the URL');
});

app.get("/books",(req,res)=>{
    res.send(books)
})
app.get('/books/:isbn', (req, res) => {
    const isbn = req.params.isbn
    for (let i = 0; i < books.length; i++){
        if (books[i].isbn === isbn){
            let book = books[i]
            res.send(book)
        }}
})
app.post("/books",(req,res) => {
    books.push(req.body)
    res.send(books)
})
//Spreadoperator


app.put("/books/:isbn",(req, res) =>{
    const isbn = req.params.isbn
    const rep_book = req.body
    const idx = books.findIndex(x => x.isbn === isbn)
    books[idx] = rep_book
    res.send(books)
    //.map()
})

app.delete("/books/:isbn", (req, res) => {
    books.forEach(book => {
        if (book.isbn === req.params.isbn) {
            books.splice(books.indexOf(book), 1)
            res.json(books)
        }
    })
})

app.patch("/books/:isbn", (req,res) =>{
    books = books.map((book) => {
        if (book.isbn === req.params.isbn) {
            return {...book, ...req.body}}
            else {
                return book
            }

        })
    res.send(books)
})