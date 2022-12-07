const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Advertisement = require("../models/adModel");


router.get('/',async (req,res)=>{
    User.findAll()
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
    const id = req.query.id;
    User.findByPk(id)
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

router.post('/signin', (req, res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }
            function MdpValid(){
                if(user.mdp === req.body.password){
                    return true
                }
            }
            if (!MdpValid) {
                return res.status(401).send({
                    message: "Invalid Password!"
                });
            }
            res.status(200).send({
                id: user.id,
                name: user.last_name,
                email: user.email,
                is_mod:user.is_mod,
                Is_admin:user.Is_admin,

            });
        })
})
router.post('/signup',async(req,res)=>{
    console.log("req-body", req.body)
    await User.create({
        last_name:req.body.name,
        email:req.body.email,
        mdp:req.body.password,
        is_mod:req.body.is_mod,
        Is_admin:req.body.Is_admin
    });
    res.redirect('/users')

})

module.exports = router;
