'use strict';

const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());



// require and use "multer"...

const multer = require("multer");
const storage  = multer.memoryStorage();
const upload = multer({storage:storage});


// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.post("/file-upload", upload.single("fileupload"), (req, res)=>{
  console.log(req.file);
  res.json({
    success:'File submitted.',
    name: req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
  })
});


// listen for requests
const listener = app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + listener.address().port);
});
