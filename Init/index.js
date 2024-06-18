const mongoose = require("mongoose");
const data = require("./data.js");
const Bank = require("../models/bank.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/IndianBank";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Bank.insertMany(data.data);
  console.log("data Intialized");
};

initDB();
