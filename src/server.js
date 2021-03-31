const express = require("express") 
const server = express()
const routes = require("./routes")

//setando view engine
server.set('view engine','ejs')

//habilitar statics archive
server.use(express.static("public"))

//routes
server.use(routes)

server.listen(3333, () => console.log("RUNNING"))