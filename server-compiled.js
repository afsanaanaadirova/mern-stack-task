(()=>{var e={860:e=>{"use strict";e.exports=require("express")},13:e=>{"use strict";e.exports=require("mongodb")},738:e=>{"use strict";e.exports=require("multer")},109:e=>{"use strict";e.exports=require("sanitize-html")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,o),r.exports}(()=>{const{MongoClient:e,ObjectId:t}=o(13),s=o(860),n=o(738)(),r=o(109);let i;const a=s();a.set("view engine","ejs"),a.set("views","./views"),a.use(s.static("public")),a.use(s.json()),a.use(s.urlencoded({extended:!1})),a.use((function(e,t,o){t.set("WWW-Authenticate","Basic realm='Our MERN App'"),"Basic YWRtaW46YWRtaW4="==e.headers.authorization?o():(console.log(e.headers.authorization),t.status(401).send("Try again"))})),a.get("/",(async(e,t)=>{t.render("home")})),a.get("/admin",((e,t)=>{t.render("admin")})),a.get("/api/audience",(async(e,t)=>{const o=await i.collection("audience").find().toArray();t.json(o)})),a.post("/create-audience",n.single("photo"),(function(e,t,o){"string"!=typeof e.body.name&&(e.body.name=""),"string"!=typeof e.body.requirements&&(e.body.requirements=""),"string"!=typeof e.body.customerType&&(e.body.customerType=""),"string"!=typeof e.body.prospects&&(e.body.prospects=""),"string"!=typeof e.body._id&&(e.body._id=""),e.cleanData={name:r(e.body.name.trim(),{allowedTags:[],allowedAttributes:{}}),requirements:r(e.body.requirements.trim(),{allowedTags:[],allowedAttributes:{}}),customerType:r(e.body.customerType.trim(),{allowedTags:[],allowedAttributes:{}}),prospects:r(e.body.prospects.trim(),{allowedTags:[],allowedAttributes:{}})},o()}),(async(e,o)=>{const s=await i.collection("audience").insertOne(e.cleanData),n=await i.collection("audience").findOne({_id:new t(s.insertedId)});o.send(n)})),async function(){const t=new e("mongodb://root:root@localhost:27017/FindAudience?&authSource=admin");await t.connect(),i=t.db(),a.listen(3e3)}()})()})();