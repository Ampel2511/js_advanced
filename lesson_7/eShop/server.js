const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

app.listen(3000, function () {
    console.log('port 3000')
})

app.use(express.static('.'))
app.use(bodyParser.json())

app.get('/showItemsInCart', function (req, res) {
    fs.readFile('cart.json', 'utf-8', function (err, data) {
        if (err) {
            throw Error(err)
        } else {
            res.send(data)
        }
    })
})

app.get('/catalog', function (req, res) {
    fs.readFile('catalog.json', 'utf-8', function (err, data) {
        if (err) {
            throw Error(err)
        } else {
            res.send(data)
        }

    })
})

app.post('/addToCart', function (req, res) {
    fs.readFile('cart.json', 'utf-8', function (err, data) {
        const cart = JSON.parse(data)
        const item = req.body
        cart.push(item)
        fs.writeFile('cart.json', JSON.stringify(cart), function (err) {
            if (err) {
                res.send('{"result": 0}')
            } else {
                res.send('{"result": 1}')
            }
        })
    })
})


