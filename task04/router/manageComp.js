const express = require("express");
const { SqlError } = require("mariadb");
const router = express.Router();
const Companie = require("../models/compModel");




router.get("/", async (req, res) => {
    const nameComp = req.query.name_companie;
    var condition = {name_companie: nameComp};
    Companie.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving companie"
        });
    });
});

router.get("/test-id", async (req, res) => {
  const idComp = req.query.ID_companie;
  var condition = {ID_companie: idComp};
  Companie.findAll({ where: condition })
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving companie"
      });
  });
});

router.post("/", async (req, res) => {
  // console.log("req-body", req.body)
  await Companie.create({
   name_companie:req.body.company
  })
  .then(() => {
    res.redirect("/companie");
  });
});

router.delete("/:id", async (req, res) => {
  const idComp = req.params.ID_companie;
  await Companie.destroy({
    where: { id: idComp },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Companies was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Companie with id=${id}. Maybe Companie was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Companie with id=" + id,
      });
    })
    
});

router.put("/update/:id", async (req, res) => {
  const idComp = req.params.ID_companie;
  await Companie.update(req.body, {
    where: { id: idComp }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Companie was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Companie with id=${id}. Maybe Companie was not found or req.body is empty !",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Companie with id)" + id,
      });
    })
});

router.get("/", async (req, res) => {
    const companie = await Companie.findAll();
    /*
          console.log('users', users);
      */
    res.render("companie", {
      companie: companie,
    });
  });


module.exports = router;