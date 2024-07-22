const express = require('express')
const app = express()
const fs = require('fs')

const {readMyFileFunc} = require('./middleware/filesOperations')
const files_routes = require('./routes/files_routes')

app.listen(3000,()=>{
    console.log('<h1>Hello Express</h1>')
})

// tell express that we're using ejs views
app.set('view engine','ejs')

app.use(express.static('public'))
// use express.urlencoded() to accept body input
app.use(express.urlencoded({extended:true}))

app.use(files_routes)

// Handle Page Not Found
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'})
})

