
const express = require("express");
const { SqlError } = require("mariadb");
const router = express.Router();
const Application = require("../models/ApplicationModal");
const Advertisement = require("../models/adModel");
const User = require("../models/userModel")
const {findAll} = require("helper-js");
const { QueryTypes } = require('sequelize');


router.get("/", async (req, res) => {
    Application.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving advertisements"
            });
        });
});

router.get("/mod/:id", (req, res) => {
    const id_mod = req.params.id;

        Application.findAll({
            where:{
                ID_Mod:id_mod
            }
        })
        .then(data => {
            if (data) {
                res.send(data);

            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
});

router.get("/user/:id", (req, res) => {
    const id_user = req.params.id;

    Application.findAll({
        where:{
            ID_User:id_user
        }
    })
        .then(data => {
            if (data) {
                res.send(data);

            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
});



router.post("/", async (req, res) => {
    // console.log("req-body", req.body)
    await Application.create({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message,
        ID_Mod:req.body.ID_people,
        ID_User:req.body.ID_user,
        ID_Ad:req.body.ID_ad,
        job:req.body.job
    })
        .then(() => {
            res.redirect("/applications");
        });
});

module.exports = router;
