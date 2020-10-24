const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const apiErrorHandler = require("./error/api-error-handler");
const users = require("./routes/users");

app.use(bodyParser.json());
app.get("/", (req, res) => res.send("default route"));
app.use(users);
app.use(apiErrorHandler);

app.listen(port, () => {
  console.log("app is listening on:", port);
});
