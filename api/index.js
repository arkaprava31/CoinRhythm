const express = require("express");
const app = express();
const cors = require('cors');
const Transaction = require('./model/transaction.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const port = 4040;
const path = "/api/transaction";

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.get("/", (req, res)=>{
    res.json({body:"test ok"});
});

app.get("/api/transaction", (req, res)=>{
    res.json({body:"transaction ok"});
});

const MONGO_URL = "mongodb+srv://money:JtmYCXXlCQYQvVCv@cluster0.ufvfcoz.mongodb.net/?retryWrites=true&w=majority";

const mongo = process.env.MONGO_URL;

app.post(path, async (req, res)=>{

    await mongoose.connect(MONGO_URL);
    const {price, name, description, date} = req.body;
    const transaction = await Transaction.create({price, name, description, date});
    res.json(transaction);

    res.json(req.body);
});

app.get("/api/transactions", async(req, res)=>{
    await mongoose.connect(MONGO_URL);
    // await mongoose.connect(mongo);
    const transactions = await Transaction.find();

    res.json(transactions);
});


app.listen(port, ()=>{
    console.log("Starting at port 4040")
});


//JtmYCXXlCQYQvVCv