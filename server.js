const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"welcome to Backend"});
});

require("./routes/route")(app);
//require("./routes/credential")(app);

app.listen(8003, function () {
    console.log("server is listening at http://localhost:8003");
  });