const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/adminLoginSchema')
const { reset } = require('nodemon')


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
app.get('/src/dashboard', (req, res) => {
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
        res.send({"Success":"Success!"});
    // return res.redirect('/src/dashboard.html')

        // return res.sendFile(path.resolve(__dirname, 'src/dashboard.html'))
        // return res.json({status:'ok',data:'loggedin'})
    }
    res.json({ status: 'error',error:"invalid username/password" })
})

