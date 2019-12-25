let { sequelize } = require("./models");
sequelize.sync();

const express = require("express");
const app = express();

const routes = require("./routes");
require("dotenv").config();

app.set("port", process.env.PORT || 3001);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/", routes);

app.listen(app.get("port"), function () {
  console.log("listening on " + app.get("port"));
});
