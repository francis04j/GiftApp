const express = require('express');

const app = express();

app.get('/', (_,res) => {
    res.send('Hello World!');
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running on Port", PORT)
})