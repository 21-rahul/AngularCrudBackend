//var db = require('../connections/connection');
//var UserModal = db.UserModal;
const sequelize = require('./index').sequelize;
var Sequelize = require("sequelize");

let UserTable = sequelize.define(
    "credientials",
    {
        user: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        password: Sequelize.STRING,
        Role: Sequelize.STRING,
    },
    {
        timestamps: false,
        freezeTableName: true,
    }

)

//  UserTable.sync({force:true}).then(()=>{
//       console.log("Table created successfully");
//   }).catch((err)=>{
//       console.error("Error"+err);
//   });


//Authincate user
exports.Login = (req,res) => {
    
    //Getting data from Body
    var user = req.body.user;
    var password = req.body.password;

    //Check if User Provide Data
    if(user==undefined || password==undefined){
        res.status(400).send("Provide valid data");
        throw "Invaid Body recived";
    }

    //Get Data from Db where user=user and password=password
    UserTable.findAll({where:{user:user,password,password}})
    .then(data=>{
        if(data.length>0){
            res.status(200).send("Login Sucessfull");
        }
        else{
            res.status(400).send("Invalid Credential");
        }
    })
    .catch(err=>{
        console.error("Error : ",err);
        res.status(400).send("Something went wrong");
    })
}


//Add New User
exports.Register = (req,res) => {

    //Check for valid body structure
    if(req.body.user==undefined || req.body.password==undefined || req.body.Role==undefined){
        res.status(400).send("Please provide vaild Structure");
        throw "Not Valid Structure";
    }

    var created_object = {
        user : req.body.user,
        password : req.body.password,
        Role : req.body.Role
    }

    var User_obj = UserTable.build(created_object);
    User_obj.save()
    .then(data=>{
        res.status(201).send("Created Sucessfully");
    })
    .catch(err=>{
        console.error("Error",err);
        res.status(400).send("Something went wrong");
    })
}