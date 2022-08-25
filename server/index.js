const express = require("express");
const massive = require("massive");
const path = require("path");

const app = express();

(async () => {
  const db = await massive(process.env.URI,
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

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../build/index.html"));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log("App is listening on port " + port);
})();
