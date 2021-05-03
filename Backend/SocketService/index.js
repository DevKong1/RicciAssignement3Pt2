const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const http = require("http")
const socket = require("./socket")

// Load .env
dotenv.config()

// Initialize express const
const app = express()

// Initialize cors               
app.use(cors())

// SocketIO
const server = http.createServer(app)
socket.socket(server)

const PORT = process.env.PORT
server.listen(PORT, function () {
	console.log('SocketService started on port ' + PORT)
})