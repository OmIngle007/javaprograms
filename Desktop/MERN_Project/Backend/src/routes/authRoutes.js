import express from 'express'
import bcrypt from 'bcryptjs'
import users from '../models/users.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password, name, email, phone } = req.body
    try {
        const existingUser = await users.findOne({username: username})
        if(existingUser) { 
            return res.status(409).json({message: "user already exists"})
        } 

        const hashedPassword = bcrypt.hashSync(password, 8)
        const newUser = new users({username, name, email, phone,  password: hashedPassword})

        await newUser.save()
        res.status(201).json({message: "User registered successfully"})
    }
    catch(err) {
        res.status(500).json({message: "Server Error"})
        console.error('error:', err)
    }

})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await users.findOne({username: username})
        
        if(!user) {
            return res.status(404).json({message: "User Not Found"})
        }
    
        const isMatched = bcrypt.compareSync(password, user.password)
        if(!isMatched) {
            return res.status(401).json({message: "Invalid Password"})
        }
    
        res.status(200).json({message: "Login Successful", id: user.id})

    }
    catch(err) {
        res.status(500).json({message:"Server Error"})
        console.error("error:", err)
    }
    
})


export default router