const model = require("../models/index");

module.exports = app => {
    var route = require("express").Router();
    var insurance = require("../models/insurance");
    var user = require("../models/credential");
    //  route.get("/getUser", user.findAll);

    route.post('/login',user.Login);
    route.post('/signup',user.Register);




    //to get all the data
    route.get("/getdata", insurance.findAll);
    //to get insert the data
    route.post("/insertEmp", insurance.insertEmployee);
    //to find the only one data
    route.get("/getDataByid/:id", insurance.findOne);
    //to bulk insertion
    route.post("/insertEmployeeData", insurance.bulkCreate);
    //update the data
    route.put("/UpdateEmp/:id", insurance.updation);
    //delete the particular data
    route.delete("/deleteEmp/:id", insurance.DeleteEmp);
    app.use("/api", route);
}