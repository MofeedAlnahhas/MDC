const express = require('express');
const bp = require('body-parser');
const fs = require('fs');
const enmap = require('enmap');
const db = new enmap({name: 'db'});

var app=express()


app.use(bp.json());
app.use(express.static('public'));
app.use(bp.urlencoded({
    extended: true
}));

app.post('/sign_up', (req, res) => {
    let name = req.body.name;
    let username = req.body.username;
    let vercode = req.body.vercode;
    let pass = req.body.pass;

    db.set(`${req.ip}`, {
        na: name,
        user: username,
        ver: vercode,
        pa: pass
    });

    console.log(`${name} has been added to the DataBase`);
    return res.redirect('dashboard.html');
});
app.post('/login', (req, res) => {
    let username = req.body.username;
    let pass = req.body.password;
    let ver = req.body.ver;

    if(db.has(`${req.ip}`)) {
        let user = db.get(`${req.ip}`, "user");
        let pas = db.get(`${req.ip}`, 'pa');
        let ve = db.get(`${req.ip}`, "ver");
        if(user == username && pas == pass && ve == ver) {
            res.redirect('dashboard.html')
        } else return;
    } else return;

});

app.post('/search', (req, res) => {
    let prob = req.body.intry;
    let per = db.findKey('na', prob);
    if (per.length > 0) {
        
    } else {};
});

app.get('/', (req, res) => {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000);
console.log('listening at 3000');