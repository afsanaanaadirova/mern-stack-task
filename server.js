const { MongoClient, ObjectId } = require("mongodb")
const express = require("express")
const multer = require("multer")
const upload = multer()
const sanitizeHTML = require("sanitize-html")
let db


const app = express()
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", async (req, res) => {
  res.render("home")
})

function passwordProtected(req, res, next) {
  res.set("WWW-Authenticate", "Basic realm='Our MERN App'")
  if (req.headers.authorization == "Basic YWRtaW46YWRtaW4=") {
    next()
  } else {
    console.log(req.headers.authorization)
    res.status(401).send("Try again")
  }
}
app.use(passwordProtected)

app.get("/admin", (req, res) => {
  res.render("admin")
})

app.get("/api/audience", async (req, res) => {
  const allAudience = await db.collection("audience").find().toArray()
  res.json(allAudience)
})

app.post("/create-audience", upload.single("photo"), ourCleanup, async (req, res) => {
  const info = await db.collection("audience").insertOne(req.cleanData)
  const newAudience = await db.collection("audience").findOne({ _id: new ObjectId(info.insertedId) })
  res.send(newAudience)
})

function ourCleanup(req, res, next) {
  if (typeof req.body.name != "string") req.body.name = ""
  if (typeof req.body.requirements != "string") req.body.requirements = ""
  if (typeof req.body.customerType != "string") req.body.customerType = ""
  if (typeof req.body.prospects!= "string") req.body.prospects= ""
  if (typeof req.body._id != "string") req.body._id = ""

  req.cleanData = {
    name: sanitizeHTML(req.body.name.trim(), { allowedTags: [], allowedAttributes: {} }),
    requirements: sanitizeHTML(req.body.requirements.trim(), { allowedTags: [], allowedAttributes: {} }),
    customerType: sanitizeHTML(req.body.customerType.trim(), { allowedTags: [], allowedAttributes: {} }),
    prospects: sanitizeHTML(req.body.prospects.trim(), { allowedTags: [], allowedAttributes: {} })
  }

  next()
}

async function start() {
  const client = new MongoClient("mongodb://root:root@localhost:27017/FindAudience?&authSource=admin")
  await client.connect()
  db = client.db()
  app.listen(3000)
}
start()