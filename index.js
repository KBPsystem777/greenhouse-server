const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 1993

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  morgan(
    ":date[web] :method :url :status :res[content-length] - :response-time ms"
  )
)

const dataRouter = require("./route")

// Call Route
app.use("/scan", dataRouter)

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`)
})
