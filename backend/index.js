const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Implementation Sequelize
const db = require("./models");

db.sequelize.sync({ alter: true}).then(() => {
    console.log("Sync and alter table if necessary.");
    console.log("Initializing backend.");
});

// A simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Music Beat"})
});

// Import routes into index.js
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}.`);
});