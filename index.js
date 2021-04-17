const express = require("express")

const bodyParser = require("body-parser")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())

app.post("/admin/url", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening at PORT: ${port}`))