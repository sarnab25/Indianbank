# IndiaBank
Used Node.js for the server side programming (Javascript run time environment)
Used Node.js framework- express.js
Database handling - MongoDB
Used mongoose library to connect server with database
---------------------------------------
Used dependences-
Express.js
Embedded javasript template(EJS)
EJS- mate for styling
mongoose
-------------------------------------------
I have cretaed Init, Model , public and views folder
-------------------------------------------
Init folder-  contains two files  
data.js - it contains   all the data related to the banks in from of (array of objects) which is imported using the module object
index.js - In this file I have intialized the data in the database named IndiaBank
------------------------------------------------
Model folder - contains one file
bank.js - Contains the schema associated with the database IndiaBank
using Model class I have made the collection named Bank in the database IndiaBank
----------------------------------------------------------
Views - Contains two folder
Layout folder- contains one file named boilerplate.ejs which has common boilerplate code that is used in the three files in the Views folders named index.ejs, show.ejs, IndiaBank.ejs
Banks folder - contains three files
Index.ejs- contains the page layout which will be rendered when request is sent to the API ('/banks')    //List of unique banks
IndiaBanks.ejs- contains the page layout which will be rendered when request is sent to the API ('/')     // List of all the banks 
show.ejs - contains the page layout which will be rendered when request is sent to the API ('/banks/:id')  // Branch details
---------------------------------------------------------------------------
public folder - Containes the styling associated with templates
-----------------------------------------------------------
I have used the REST API method to solve the problem
I have created three routes as mentioned below


/Home Route

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
