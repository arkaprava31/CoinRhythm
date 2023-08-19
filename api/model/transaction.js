const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const transactionSchema = new Schema({
    name : {type:String, default:true},
    price : {type:Number, default:true},
    description : {type:String, default:true},
    date : {type:Date, default:true}
});

const TransactionModel = new model('Transaction', transactionSchema);

module.exports = TransactionModel;