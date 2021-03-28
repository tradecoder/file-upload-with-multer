# File Upload With Multer

## Server code

```javascript
'use strict';

const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());



// require and use "multer"...

const multer = require("multer");
// const { diskStorage } = require("multer");
// const storage  = multer.memoryStorage();
// multer memory storage keeps file with binary data, not images or other file format

// multer disk storage keeps file in a folder in original
const storage  = multer.diskStorage({
  destination: 'uploads',
  filename:(req, file, cb)=>cb(null, (Date.now()+"-"+file.originalname))})
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
    originalname:req.file.originalname,
    name: req.file.filename,
    type:req.file.mimetype,
    size:req.file.size
  })
});


// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("App is listening on port " + listener.address().port);
});

```
