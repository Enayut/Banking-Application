const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: String,
    email: String,
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 100
    },
})

const TransactionSchema = new mongoose.Schema({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: Number,
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    balance: Number
})

const User = mongoose.model('User',UserSchema);
const Account = mongoose.model('Account',AccountSchema);
const Transaction = mongoose.model('Transaction',TransactionSchema);

module.exports = {User,Account,Transaction};