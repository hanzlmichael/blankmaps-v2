const express = require('express')
const app = express()
const port = 4445

app.use("/static", express.static('./static/'));
app.set('view engine', 'ejs')
/* app.set('views', process.cwd() + '/views') */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/create', (req, res) => {
  res.render('create');
})

console.log(__dirname + './views')