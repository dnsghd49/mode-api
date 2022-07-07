const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/route"));
app.use(require("./routes/users"));
const dbo = require("./db/connection.js");
const path = require('path')

// Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, '../client/public')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '../client/public/index.html'))
// })

app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);

    });
    console.log(`Server is running on port: ${port}`);
});