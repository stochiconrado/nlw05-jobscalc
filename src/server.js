const express = require("express") 
const server = express()
const routes = require("./routes")

//setando view engine
server.set('view engine','ejs')

//habilitar statics archive
server.use(express.static("public"))

//habilitar req.body
server.use(express.urlencoded({extended:true}))

//routes
server.use(routes)

server.listen(3000, () => console.log("RUNNING"))