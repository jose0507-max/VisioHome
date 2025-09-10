const express = require("express");
const router = require("./routers/router");
const cors = require("cors");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const app = express();

const swaggerDocument = YAML.load("./config/swagger.yaml");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use("/api", router);
app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
