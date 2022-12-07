const express = require('express');
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');
const Port =3001;
const sequelize = require('./config/config')
const cors = require('cors')



// initialisation DB server

const app = express();
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());






const manageUsers = require('./router/manageUsers')
app.use("/users",  manageUsers);

const ManageUser_Comp = require('./router/ManageUser_Comp')
app.use("/mod", ManageUser_Comp)

const manageAd = require('./router/manageAd')
app.use("/advertisements", manageAd);

const manageComp = require('./router/manageComp')
app.use("/companies", manageComp);

const manageApp = require('./router/ManageApp')
app.use("/applications", manageApp)

app.get('/',async (req,res)=>{
    /*
        console.log('users', users);
    */

    res.render('error')
});


app.listen(Port , () =>{
    console.log(`server started on 'http://localhost:${Port}`)
});