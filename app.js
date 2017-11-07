const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = 9000
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')




app.get('/', (req, res) => {
    db.collection('entries').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', { entries: result })
    })
})

app.post('/entries', (req, res) => {
    db.collection('entries').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})

app.get('/watchlist', function (req, res) {
    res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `)
})

app.get('/entry/:name?', function (req, res) {
    let name = req.params.name
    res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    `)
})

app.get('/entry/:name?/:link?', function (req, res) {
    let name = req.params.name
    let hashlink = `#${req.params.link}`
    res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${hashlink}
    `)
})

app.get('*', function (req, res) {
    res.send(`
    <h1>Page not found</h1>
    `)
})

MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(port, () => {
        console.log(`Listening on port ${port}!`)
    })
})



