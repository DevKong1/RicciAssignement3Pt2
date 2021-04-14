const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Load .env
dotenv.config()

// Initialize express const
const app = express()

// Connect to DB
const db = process.env.DB_URL
mongoose.connect(db, {useNewUrlParser: true, 
                      useFindAndModify: false, 
                      useUnifiedTopology: true})

// Initialize cors               
app.use(cors())

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/playerRoutes"))

const PORT = process.env.PORT
app.listen(PORT, function () {
	console.log('PlayerService started on port ' + PORT);
});