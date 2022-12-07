const express = require("express");
const { SqlError } = require("mariadb");
const router = express.Router();
const Advertisement = require("../models/adModel");

router.get("/", async (req, res) => {
    const job = req.query.job;
    Advertisement.findAll(
   )
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


router.get("/:id", (req, res) => {
    const id = req.params.id;
    Advertisement.findByPk(id)
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
    await Advertisement.create({
        ID_companie: req.body.ID_companie,
        ID_people: req.body.ID_people,
        job: req.body.job,
        description_adv: req.body.description_adv,
        date_adv: req.body.date_adv,
        place: req.body.place,
        experience: req.body.experience,
        salaire: req.body.salaire,
        company:req.body.company
    })
        .then(() => {
            res.redirect("/advertisements/");
        });
});


router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    await Advertisement.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id,
            });
        })

});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    await Advertisement.update(req.body, {
        where: {id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Advertisement was updated successfully.",
                });
            } else {

                res.send({

                    message:
                        "Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty !",
                });
            }
            console.log(req.body)

        })
        .catch((err) => {
            res.status( 500).send({
                message: "Error updating Tutorial with id)" + id,
            });
        })

});

router.get("/", async (req, res) => {
    const advertisements = await Advertisement.findAll();
    /*
          console.log('users', users);
      */
    res.render("advertisement", {
        advertisements: advertisements,
    });
});


module.exports = router;

