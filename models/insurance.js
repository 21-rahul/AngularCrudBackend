var Sequelize = require("sequelize");
const sequelize = require('./index').sequelize;


let EmployeeTable = sequelize.define(
    "Employee",
    {
        Emp_id: {
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        EmpName: Sequelize.STRING,
        Dept: Sequelize.STRING,
        Designation: Sequelize.STRING
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

//   EmployeeTable.sync({force:true}).then(()=>{
//       console.log("Table created successfully");
//   }).catch((err)=>{
//       console.error("Error"+err);
//   });


//to get all the data
exports.findAll = (req, res) => {
    EmployeeTable.findAll({ raw: true }).then((data) => {
        console.log(data);
        res.status(200).send(data);
    })
        .catch((err) => {
            console.error("There is an error getting data from db: " + err);
            res.status(400).send(err);
        });
}

exports.insertEmployee = (req, res) => {
    var Emp_id = req.body.Emp_id;
    var EmpName = req.body.EmpName;
    var Dept = req.body.Dept;
    var Designation = req.body.Designation;

    var Empobj = EmployeeTable.build({
        Emp_id: Emp_id,
        EmpName: EmpName,
        Dept: Dept,
        Designation, Designation
    });

    Empobj.save().then((data) => {
        console.log(data);
        var message = "Record is inserted successfully";
        res.status(201).send(message);
    }).catch((err) => {
        console.error("error is" + err);
        res.status(400).send(err);
    });
}

//to find by id

exports.findOne = (req, res) => {
    var id = req.params.id;
    console.log("given id is:" + id);

    EmployeeTable.findByPk(id, { raw: true })
        .then((data) => {
            console.log(data);
            res.status(200).send(data);
        })
        .catch((err) => {
            console.error("there is an error getting data from db" + err);
            res.status(400).send(err);
        });
};

//for bulkinsertion
exports.bulkCreate = (req, res) => {
    EmployeeTable.bulkCreate(req.body)
        .then((data) => {
            console.log(data);
            var strMsg = "Record inserted successfully";
            res.status(201).send(strMsg);
        })
        .catch((err) => {
            console.error("error is:" + err);
            res.status(400).send(err);
        });
};

  //update the record
  exports.updation = (req, res) =>{
    var Emp_id = req.params.id;
    var EmpName = req.body.EmpName;
    var Dept = req.body.Dept;
    var Designation = req.body.Designation;

    EmployeeTable.update(
      {
        EmpName:EmpName,
        Dept:Dept,
        Designation:Designation
      },
      { where: { Emp_id: Emp_id }}
        )
      .then((data) => {
        console.log(data);
        var strMsg = "Record updated successfully";
        res.status(201).send(strMsg);
      })
      .catch((err) => {
        console.error("error is" + err);
        res.status(400).send(err);
      });
  };


    //for deletion
    exports.DeleteEmp = (req, res) =>{
       
        var Id = req.params.id;
        console.log("Given id is" + Id);

        EmployeeTable.destroy({ where: { Emp_id:Id } })
          .then((data) => {
            console.log(data);
            var strMsg = "Record deleted successfully";
            res.status(200).send(strMsg);
          })
          .catch((err) => {
            console.log("there is an error" + err);
            err.status(400).send(err);
          });
      };

