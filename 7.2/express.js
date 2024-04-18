const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session')

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Name app listening on port ${port}`);
});


app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: true
}));

app.post("/name/:name", (req,res) => {
    session.new_value = req.params.name
    res.send(session.new_value)
})

app.get("/name", (req,res) =>{
    res.send(session.new_value)
})

app.delete("/name", (req, res) => {
    if (session.new_value) {
        delete session.new_value
        res.send("Succesfully deleted")
    } else {
        res.send("Name not Found")
    }
});

