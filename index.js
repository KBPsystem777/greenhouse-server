/**
 *  Initial backend server for Greenhouse extension
 *  @description: Official entry for GreenIT hackaton
 */

const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const dataRouter = require("./route")

const PORT = process.env.PORT || 3000

// Defining middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  morgan(
    ":date[web] :method :url :status :res[content-length] - :response-time ms"
  )
)

// Call Route
app.use("/scan", dataRouter)

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`)
})
