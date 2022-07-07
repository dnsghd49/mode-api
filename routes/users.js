const express = require("express");
const Router = express.Router();

// connect to the database
const dbo = require("../db/connection");

// convert the id from string to ObjectId for the _id.
// const ObjectId = require("mongodb"). ObjectId;


Router.route("/users").get(function (req, res) {
    let db_connect = dbo.getDb("Fezzane");
    db_connect
        .collection("users")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


// This section will help you create a new record.
Router.route("/users/register").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = Router;