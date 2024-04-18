const express = require('express');
const app = express();
const port = 3000;
app.use(express.json())

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');


app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
    {isbn: "978-0-14-044081-5", title: "Pride and Prejudice", year: 1813,author: "Jane Austen"},
    {isbn: "978-1-59322-022-9", title: "To Kill a Mockingbird", year: 1960, author: "Harper Lee"},
    {isbn: "978-0-8041-7207-8", title: "The Catcher in the Rye", year: 1951, author: "J.D. Salinger"},
    {isbn: "978-0-06-112008-4", title: "1984", year: 1949, author: "George Orwell"},
    {isbn: "978-0-553-21135-3", title: "The Hobbit", year: 1937, author: "J.R.R. Tolkien"}
]

let lends = [
    {
        id: 1,
        customer_id: 101,
        isbn: "978-0-14-044081-5",
        borrowed_at: new Date("2024-04-17T10:00:00"),
        returned_at: null
    },
    {
        id: 2,
        customer_id: 102,
        isbn: "978-1-59322-022-9",
        borrowed_at: new Date("2024-04-16T14:30:00"),
        returned_at: new Date("2024-04-18T09:45:00")
    },

]

app.listen(port, () => {
    console.log(`Swagger Documentation available on: ${port}`);
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

app.get("/lends", (req,res) =>{
    res.send(lends)
})

app.get('/lends/:id', (req, res) => {
    const id = req.params.id
    for (let i = 0; i < lends.length; i++){
        if (lends[i].id === parseInt(id)){
            res.send(lends[i])
        }
    }
})

app.post("/lends", (req,res) => {
        let new_lend = req.body
        let is_borrowed = false
        if (new_lend.id === null)
            if (is_borrowed === false){
                new_lend.borrowed_at = new Date().toLocaleString()
                new_lend.returned_at = null
                lends.push(new_lend)
                res.send(lends)
            } else {res.send("Already borrowed")}
    }
)



app.delete("/lends/:id", (req, res) => {
    const id = req.params.id
    lends.forEach(lend => {
        if (lend.id === parseInt(id)) {
            lend.returned_at = new Date().toLocaleString()
        }
    })
    res.send(lends)
})
