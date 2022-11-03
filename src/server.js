const express = require('express');
const bodyParser = require('body-parser');
const crypto = require("crypto"); 

const app = express();

let products = [];
let cart = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
  
// parse application/json
app.use(bodyParser.json());

// PRODUCT API
// Create a new product
app.post('/api/products', (req, res) => {
    const id = crypto.randomUUID();
    let product = {
        id: id,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.send(product);
});

// Get all products
app.get('/api/products', (req, res) => {
    res.send(products);
});

// Get a product from its id
app.get('/api/products/:id', (req, res) => {
    let id = req.params.id;
    let getIndex = products.map(product => {
        return product.id;
        })
        .indexOf(id);
    res.send(products[getIndex]);
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    let id = req.params.id;
    let removeIndex = products.map(product => {
        return product.id;
        })
        .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
        .send("Sorry, that product doesn't exist");
        return;
    }
    products.splice(removeIndex, 1);
    res.sendStatus(200);
});

// CART API

const findItemID = (id) => {
    let cartMap = cart.map(item => {
        return item.id;
    });
    return cartMap.indexOf(id);
}

// Get all items in the cart
app.get('/api/cart', (req, res) => {
    res.send(cart);
});

// Add a product to the cart
app.post('/api/cart/:id', (req, res) => {
    let id = req.params.id
    let item;
    index = findItemID(id);
    if (index == -1) {
        item = {
            id: id,
            quantity: 1
        };
        cart.push(item);
    } else {
        item = cart[index];
        item.quantity += 1;
    }
    res.send(item);
});

// Update an item in the cart
app.put('/api/cart/:id/:quantity', (req, res) => {
    let index = findItemID(req.params.id);
    if (index === -1) {
        res.status(404)
        .send("Sorry, that item doesn't exist");
        return;
    }
    let item = cart[index];
    item.quantity = parseInt(req.params.quantity);
    res.send(item);
});

// Delete a product
app.delete('/api/cart/:id', (req, res) => {
    let id = req.params.id;
    let removeIndex = cart.map(product => {
        return product.id;
        })
        .indexOf(id);
    if (removeIndex === -1) {
        res.status(404)
        .send("Sorry, that product doesn't exist");
        return;
    }
    cart.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));