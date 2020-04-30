const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
=======
mongoose.connect("mongodb://localhost/budget", {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes here
<<<<<<< HEAD
app.use(require("./routes/API.js"));
=======
app.use(require("./routes/api.js"));
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});