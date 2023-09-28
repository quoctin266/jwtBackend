import express from "express";
import router from "./routes/api";
import getConnection from "./config/connectDB";
import configCORS from "./config/configCORS";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configCORS(app);
getConnection();

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
