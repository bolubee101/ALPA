const express = require("express");
const mongoose = require("mongoose");

const configuration=require("./config/configuration")

// connect to database
mongoose.connect(configuration.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("mongodb connection established");
});

// initialize app
const app = express();

app.use(express.json({ limit: "10mb" }));

let authentication= require("./components/authentication/routes/userAuthentication");
app.use(authentication);

const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("I work");
})

app.get('*', (req, res) => {
    res.status(404);
    return res.json({
        errorMessage: "endpoint not found"
    });
});


let server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});