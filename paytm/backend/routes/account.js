const express = require('express');
const { User, Account, Transaction } = require('../db')
const {authMiddleware} = require('../middleware')
const mongoose = require('mongoose')

const router = express.Router();

router.get('/balance', authMiddleware, async function(req, res){
    const user = await User.findById(req.userId)
    if(!user) return res.status(404).json({ message: 'User not found' })
    const account = await Account.findOne({ userId: user._id })
    if(!account) return res.status(404).json({ message: 'Account not found' })
    res.json({ balance: account.balance })
})

router.post('/deposit', authMiddleware, async function(req, res){
    const session = await mongoose.startSession();

    
    try {
        session.startTransaction();
        const { amount, from, to } = req.body;

        // Fetch the user and their account within the transaction
        const user = await User.findById(from).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'User not found' });
        }

        const account = await Account.findOne({ userId: user._id }).session(session);
        if (!account) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Account not found' });
        }

        if (account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Update the accounts' balances
        await Account.updateOne({ userId: from }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Create the transaction record
        await Transaction.create([{ to: to, from: from, amount: amount }], { session });

        await session.commitTransaction();
        session.endSession();

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "Transfer failed",
            error: error.message
        });
    }
})

module.exports = router;