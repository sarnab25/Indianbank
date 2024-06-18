require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");                                        //requiring yhe dependencies
const Bank = require("./models/bank.js");
const path = require("path");
const ejsMate= require("ejs-mate");


//connection with database using mongoose library
// const MONGO_URL = "mongodb://127.0.0.1:27017/IndiaBank";  // for localhost
const dbUrl=process.env.ATLASDB_URL;                 // coonecting the database with MongoDB Atlas to deploy the data online
           
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// listening port                                                                                           // Init folder for data intialization
                                                                                                            //Models folder for database schema
app.listen(9090, () => {                                                                                    // Views folder for Embedded Javascript templates
    console.log("listing to port 9090");                                                                     //public folder for styling 
  });
  
//setting up engine (EJS) to render pages according to request

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//middleware for handling submission and parsing the request into javascript object <---express.urlencoded---->
app.use(express.urlencoded({extended:true}));


// custom template engine - enhance  templating capabilities ejs
app.engine("ejs", ejsMate);

// middleware to serve the static file -CSS <---express.static--->
app.use(express.static(path.join(__dirname, "public")));

//Home Route

app.get("/", async (req, res) => {
    const allBanks= await Bank.find({});
    res.render("Banks/IndiaBanks", {allBanks})
  });

  // Route for unique bank names

app.get("/banks", async (req, res) => {
  const allBanks = await Bank.find({});
  const names = [...new Set(allBanks.map((bank) => bank.bank_name))];
  res.render("Banks/index.ejs", { names, allBanks });
});

// show route for specific branch related details
app.get("/banks/:id", async (req,res)=>
{
    let {id}=req.params;
 const bank= await Bank.findById(id);
 res.render("Banks/show.ejs", {bank});
})


