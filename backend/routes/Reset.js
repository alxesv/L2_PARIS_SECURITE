const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const router = express.Router()

router.patch('/', async (req, res, next) => {
	try {
		const {username} = req.auth
		const {password} = req.body
		const user = await User.findOne({username,  resetPasswordExpires: 
            {$gte:Date.now()}
		})
		if(!user) return  res.status(403).json({message:'L\'utilisateur n\'existe pas !'})
		const hashedPassword = await bcrypt.hash(password, 10)

		await User.updateOne({username},{
			password: hashedPassword,
			resetPasswordExpires: null,
		})
             
		console.log('Mot de passe mis à jour')
		res.status(200).send({ message: 'Mot de passe mis à jour' })
              

		
	} catch (error) {
		console.log("Error : " , error)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
