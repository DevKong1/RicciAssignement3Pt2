const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

// Load .env
dotenv.config()

// Initialize express const
const app = express()

// Connect to DB
const db = process.env.DB_URL
mongoose.connect(db, {useNewUrlParser: true, 
                    useFindAndModify: false,
                    useCreateIndex: true,
                    useUnifiedTopology: true})

// Initialize cors               
app.use(cors())

// Allow access to asset files
app.use('/assets', express.static(process.cwd() + '/assets'))

// Body Parser
app.use(express.json());

// Routes
app.use("/", require("./routes/puzzleRoutes"))

const PORT = process.env.PORT
app.listen(PORT, function () {
    console.log('PuzzleService started on port ' + PORT)
})