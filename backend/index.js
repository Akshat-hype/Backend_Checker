// create a basic express server for get requests of hello world
const express = require('express');
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/api/data', (req, res) => {
    res.json({ message: 'This is some data from the backend!' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);
