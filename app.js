const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

const productRoute = require("./api/routes/product");
const studentRoute = require("./api/routes/student");
const facultyRoute = require("./api/routes/faculty");
const userRoute = require("./api/routes/user");

mongoose.connect("mongodb://127.0.0.1:27017/myapp");
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.on("connected", (con) => {
  console.log("Local database connected ");
});

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/product", productRoute);
app.use("/student", studentRoute);
app.use("/faculty", facultyRoute);
app.use("/user", userRoute);

/*app.use((req, res, next) => {
  res.status(200).json({
    message: "Iam responding from the application",
  });
});
*/
app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad request",
  });
});

module.exports = app;
