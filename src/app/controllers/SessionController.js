const { User , Session} = require("../models")

class SessionController {
    async login(req,res){
        const { email , password } = req.body;

        if(!email) return res.status(401).json({error : "Email required"})

        const user = await User.findOne( {where : {email}})

        if(!user) return res.status(401).json({error: "User not found"})

        if(!(await user.checkPassword(password))){
            return res.status(401).json({error : "Incorrect password"})
        }
        var userToken = await user.generateToken();
        const session = await Session.findOne({ where :{ user_id : user.id} });

        if(session){
            await Session.update({token : userToken} , 
                { 
                    where : {
                        user_id : user.id
                }
            })
        }else{
            await Session.create({user_id: user.id , token : userToken})
        }

        return res.status(200).json({user , token : userToken})
    }

    async logout (req, res) {
        const {user_id} = req.body;

        if(!user_id) return res.status(401).json({error : "No user provided"})


        const session = await Session.update({token : ""} , {
            where :{
                user_id : user_id
            }
        })

        return res.status(200).json(session)
    }
}

module.exports = new SessionController();