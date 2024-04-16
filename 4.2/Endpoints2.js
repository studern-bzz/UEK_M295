const express = require('express');
const app = express();
const port = 3000;

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