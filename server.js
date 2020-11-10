const express = require("express");
const app = express();
const morgan = require("morgan");
const singleWebAudit = require("./routes/get_auditSummary.js");
const path = require("path");

app.use(morgan("combined"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", singleWebAudit);

app.get("/chart", (req, res) => {
    res.sendFile(__dirname + "/client/index.html");
});

app.get("/client/myChart.js", (req, res) => {
    res.sendFile(__dirname + "/client/myChart.js");
});

app.get("/client/chart_data.js", (req, res) => {
    res.sendFile(__dirname + "/client/chart_data.js");
});

// CSS Files

app.get("/client/style/style.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/style/style.css"));
});

app.get("/client/style/style.css.map", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/style/style.css.map"));
});

app.listen(8000, () => console.log("Running on Port 8000"));
