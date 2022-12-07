const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Advertisement = require("../models/adModel");



router.get('/',async (req,res)=>{
    const users = await User.findAll();



    res.send(`Page pour Mod`)
});


router.get("/:id", (req, res) => {
    const idtest = req.params.id;
    console.log("get lauunched ")
    Advertisement.findAll({
        where:{ID_people:idtest}
    })
        .then(data => {
            if (data) {
                res.send(data);

            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${idtest}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + idtest
            });
        });
});



module.exports = router;