const {S3Client} =  require("@aws-sdk/client-s3")
const express = require("express")
const massive = require("massive")
const path = require("path")
const multer = require("multer")
const multerS3 = require("multer-s3")

const s3Config = {
    bucketName: process.env.bucket_name,
    region: process.env.region,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
}

const s3 = new S3Client(s3Config)

const app = express();

(async () => {
  const upload = await multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.bucket_name,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.' + file.originalname.split('.').pop())
      }
      
  }) })
  const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }

  const db = await massive(connectionString,
    { documentPkType: "uuid" }
  );

  app.use(express.static(path.join(__dirname, "../build")));
  app.use(express.json());
  app.set("db", db);

  app.get("/api/recipes/:id", async (req, res) => {
    const items = await req.app
      .get("db")
      .recipes.findDoc({ author_id: req.params.id });

    res.json(items);
  });

  app.post("/api/recipe", async (req, res) => {
    const recipe = await req.app.get("db").saveDoc("recipes", req.body.recipe);
    console.log(req.body);
    res.json(recipe);
  });

  app.get("/api/delete/:id", async (req, res) => {
    const item = await req.app.get("db").recipes.destroy(req.params.id);

    res.json(item);
  });

  app.post("/api/recipe/imageUpload", upload.single('image'), async (req, res) => {
    console.log(req.file)
    let fileLink = await req.file.location
    res.json(fileLink)
  })

  app.post("/api/user/signUp", async (req, res) => {
    console.log(req.body)
    res.json("test")
  })

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../build/index.html"));
  });

  

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log("App is listening on port " + port);
})();
