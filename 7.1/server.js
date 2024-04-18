const express = require('express');
const app = express();
const port = 3000;
const auth = require('basic-auth');
app.use(express.json())

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get("/public", (req,res) => {
    res.send("This is the Public Site")
})

const login = {
    username: "zli",
    password: "zli1234"
}

function authenticate(req, res, next) {
    const user = auth(req);

    if (!user || user.name !== login.username || user.pass !== login.password) {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.status(401).send('Authentication required.');
    }
    next();
}
app.get("/private", authenticate, (req, res) => {
    res.send("This is the Private Site");
});