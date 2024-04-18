const express = require('express');
const session = require("express-session");
const app = express();
const port = 3000;
const basicAuth = require('express-basic-auth');
app.use(express.json())

app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


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
    console.log(`Server Running on: ${port}`);
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

app.get("/lends", Auth,(req,res) =>{
    res.json(lends)
})

app.get('/lends/:id',Auth, (req, res) => {
    const id = req.params.id
    for (let i = 0; i < lends.length; i++){
        if (lends[i].id === parseInt(id)){
            res.send(lends[i])
        }
    }
})

app.post("/lends", Auth, (req,res) => {
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



app.delete("/lends/:id", Auth ,(req, res) => {
    const id = req.params.id
    lends.forEach(lend => {
        if (lend.id === parseInt(id)) {
            lend.returned_at = new Date().toLocaleString()
        }
    })
    res.send(lends)
})

function Auth(req, res, next) {
    if (req.session.authenticated) {
        next()
    }
    else {
        res.redirect("/login")
    }


}

app.get("/login", basicAuth({
        users: {"testuser":"1234"},
        challenge: true,
        realm: "My Application",
        unauthorizedResponse: "No Authorization, please authorize!"
    }),
    (req,res)=>{
        req.session.authenticated = true
        res.send("You have been successfully authenticated.")
    }
)

app.get("/verify", (req, res)=>{
    if (req.session.authenticated === true) {
        return res.status(200).send("authenticated")
        }
    else {return res.status(401).send("Session is not authenticated")
    }

})

app.delete("/logout", (req, res)=>{
    req.session.authenticated = false
    return res.status(204).send("Logout successful")
})

app.get("/test", (req,res) => {
    const status = req.session.authenticated
    res.send(`The current authenticated status is: ${status}`)
})