const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const router = require("./routes/router");
const cors = require("cors");

app.use(express.json());
app.use("/", cors({
    origin: "*"
}), router);
// app.use((req, res, next) => {
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log("Servidor rodando"));
