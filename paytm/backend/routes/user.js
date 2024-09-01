const express = require('express');
const zod = require('zod');
const {User,Account} = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const {authMiddleware} = require('../middleware');

const router = express.Router();

const signupBody = zod.object({
    firstName: zod.string().min(2).max(50),
    lastName: zod.string().min(2).max(50),
    email: zod.string().email(),
    password: zod.string().min(8).max(255)
}).required({
    firstName: true,
    email: true,
    password: true
})

router.post('/signup', async function(req, res){
    console.log(req.body);
    const { success } = signupBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({ error: 'Invalid input' });
    }

    const existingUser = await User.findOne({
        email: req.body.email
    })

    if(existingUser){
        return res.status(400).json({ error: 'Email already registered' });
    }

    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    const userId = user._id;
    
    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })
    console.log(Math.random() * 10000);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET)
    return res.status(200).json({ user: user, token:token})

})

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8).max(255)
}).required()

router.post('/login', async function(req,res){
    const { success } = loginBody.safeParse(req.body)
    if(!success){
        return res.status(400).json({ error: 'Invalid input' });
    }
    
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if(!user){
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.status(200).json({ token: token })
})

const updateBody = zod.object({
	password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})

router.put('/update', authMiddleware, async function(req, res){
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        res.status(400).json({ error: 'Invalid input' });
    }
    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get('/bulk', async function(req,res){
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:  [{
            firstName: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    });
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/me', authMiddleware, (req, res) => {
    // console.log(req.userId)
    res.json({
        id: req.userId
    })
})

module.exports = router;