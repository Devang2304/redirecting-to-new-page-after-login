const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/adminLoginSchema')
const { reset } = require('nodemon')
const { resolve } = require('path')
const http = require('http');
var isLoggedIn = false;
mongoose.connect('mongodb+srv://DEVANG23:sGS9G3qDgNVQztE@cluster0.ngb8lfk.mongodb.net/test_project')
app.use(bodyParser.json())
app.use(express.static(__dirname))

app.get(['/', '/index'], (req, res) => {
    console.log(req.url);
    res.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/src/admin', (req, res) => {
    console.log(req.url);
    res.sendFile(path.resolve(__dirname, 'src/admin.html'))
})
app.get('/src/dashboard',auth ,(req, res) => {
    console.log("dashboard appeared in url");
    console.log(req.url);
    res.sendFile(path.resolve(__dirname, 'src/dashboard.html'))
})

app.listen(3000, () => {
    console.log("listening on port 3000...");
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()
    if (!user) {
        return res.json({ status: 'error', error: 'invalid username/password' })
    }
    if (password == user.password) {
        console.log("you are logged in ...");
        isLoggedIn=true;
        if(isLoggedIn==='true'){
            auth();
            // return res.sendFile(path.resolve(__dirname, 'src/dashboard.html'))
            res.redirect('/src/dashboard.html')
        
        }
        // res.send({"Success":"Success!"});
        // res.writeHead(200,{'content-type': 'text/html'});
        // res.write("./src/dashboard.html");
        // res.end();
        // res.sendFile(path.join(__dirname, '/src/dashboard.html'));
        // res.setHeader('Content-Type', '/src/dashboard.html');
        // const headers=res.getHeader('Content-Type');
        // console.log(headers);
        // res.redirect('/src/dashboard.html')
        
        // return res.json({status:'ok',data:'loggedin'})
        
    }
    res.json({ status: 'error',error:"invalid username/password" })
})

function auth() {
    if(isLoggedIn==='true'){
        return
    }
    res.send('User not registered');
}