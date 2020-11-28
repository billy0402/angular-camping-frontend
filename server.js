const express = require("express");

const app = express();

const projectName = "angular-camping-frontend";

app.use(express.static(`./dist/${projectName}`));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: `dist/${projectName}/` });
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`);
