const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Enter something in the URL');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.get('/now', (request,response) =>{
    let zeit = new Date
    if (zeit.getMinutes() >= 10){
    response.send(`Aktuelle Zeit: ${zeit.getHours()}:${zeit.getMinutes()}`)}
    else {response.send(`Aktuelle Zeit: ${zeit.getHours()}:0${zeit.getMinutes()}`)}})


app.get('/zli', (request,response) =>{
    response.redirect("https://www.zli.ch")
})


app.get('/name', (request,response) =>{
    const names = ["John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Alexander", "Isabella", "Daniel", "Mia", "Matthew", "Charlotte", "David", "Amelia", "Joseph", "Harper", "Benjamin", "Evelyn"]
    let random = Math.floor(Math.random() * names.length);
    response.send(`Zufälliger Name: ${names[random]}`)
})


app.get('/html',(request,response) =>{
    response.sendFile(`${__dirname}/index.html`)})


app.get('/image', (request, response) => {
    response.sendFile(`${__dirname}/image.jpg`)})

app.get('/teapot', (request, response) => {
    response.sendStatus(418)})


app.get('/user-agent', (request, response) => {
    const userAgent = request.headers['user-agent'];
    response.send(`User-Agent: ${userAgent}`);})


app.get('/secret', (request, response) => {
    response.sendStatus(403)})


app.get('/xml', (request, response) => {
    response.sendFile(`${__dirname}/test.xml`)})

app.get('/me', (request, response) => {
    const json = {
        "firstName": "Nico",
        "lastName": "Studer",
        "age": 17,
        "place": "Samstagern",
        "eyeColor": "Blau"
    }
    response.send(`${json.firstName}, ${json.lastName}, ${json.age}, ${json.place}, ${json.eyeColor}`)})







