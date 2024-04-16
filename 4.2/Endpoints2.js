const express = require('express');
const app = express();
const port = 3000;
let names = [
    "Nico Studer",
    "Raul meili",
    "Jan Atzgi",
    "Luca Schönenebergerererrer"
]

app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.send('Enter something in the URL');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.get('/now', (request,response) => {
    const tz = request.query.tz
    response.send(new Date().toLocaleTimeString('de-CH',{timeZone:tz}))
})
app.post('/names', (request,response) => {
    console.log(request.body)
    names.push(request.body.name)
    response.send(names)
})

app.delete('/names',(request,response) =>{
    names.pop()
    response.status(201).send(names)
})

app.get('/secret2',(req,res)=>{
    const auth = req.get("Authorization")
    if (auth === "Basic aGFja2VyOjEyMzQ=") {res.status(200)}
    else {res.status(401)}
    res.send(auth)
    })


app.get("/chuck", async (req,res)=> {
    let new_name = req.query.name
    const chucknorrisdata = await fetch("https://api.chucknorris.io/jokes/random")
    let joke = await chucknorrisdata.json()
    res.send(`${joke.value.replace("Chuck Norris",new_name)}`)
})

const about = {
    first_name: "Nico",
    name: "Studer",
    age: 17,
    place: "Samstagern",
    eyeColor: "Blau"
}

app.get('/me', (req, res) => {
    res.send(about);
});

app.patch('/me', (req, res) => {
    res.send({...about, ...req.body});
})

