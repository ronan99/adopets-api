const { User } = require("../models")

class UserController {
    async index(req,res){
        var {offset , limit} = req.params;

        if(!offset) offset = 0
        if(!limit) limit = 20
        
        const users = await User.findAll({
            offset : offset,
            limit : limit
        })
        
        return res.status(200).json(users)
    }
    async store(req, res){
        const {name, email, password} = req.body;

        if(!name) return res.status(401).json({error : "Name required"})
        if(!email) return res.status(401).json({error : "Email required"})
        if(!password) return res.status(401).json({error : "Password required"})

        

        const user = await User.create({name,email,password});
        return res.status(200).json(user);
    }
    
    async remove(req, res) {
        const { id } = req.body;

        if(!id) return res.status(401).json({error : "Id required"})

        const user = await User.destroy({
            where: {
                id: id
            }
        });

        return res.status(200).json(user);
    }
}

module.exports = new UserController();