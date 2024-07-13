const express = require("express");
const router = require("./routes/index");
const connectdb = require("./config/connection")

const cwd = process.cwd();

const PORT = 3001;
const app = express();

const appDir = cwd.includes("bootcamp") ? cwd.split("bootcamp")[1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

connectdb.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server API routes for [~${appDir}>] listening on port: http://127.0.0.1:${PORT}`);
    });
});