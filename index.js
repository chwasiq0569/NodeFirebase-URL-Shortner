const express = require("express")

const bodyParser = require("body-parser")

const app = express()

var admin = require("firebase-admin");

var serviceAccount = require("./urlshortner-f36ad-firebase-adminsdk-jddbw-ba354b40f3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.static("public"))
app.use(bodyParser.json())

const urlsdb = admin.firestore().collection("urlsdb");

app.post("/admin/url", (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.get("/:short", (req, res) => {
    console.log(req.params);
    const short = req.params.short;
    const doc = urlsdb.doc(short);
    doc.get().then(response => {
        const data = response.data();
        if(data && data.url){
            res.redirect(301, data.url);
        } else {
            res.send("<h1>URL Not Exists</h1>");
        }
    })
});

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening at PORT: ${port}`))