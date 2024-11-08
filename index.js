const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// servidor
const app = express();

// BD
dbConnection();

// CORS

app.use(cors());

// directorio publico
app.use(express.static("public"));

// lectura y parseo del body

app.use(express.json());

// Rutas

// TODO: auth // crear,login,renew
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// TODO: CRUD: eventos

// levantar el servidor

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
