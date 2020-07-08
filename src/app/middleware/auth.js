const jwt = require("jsonwebtoken");
const { promisify } = require('util')

module.exports = async (req , res , next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader)  
        return res.status(401).json({error : "Token not provided"})

    const parts = authHeader.split(' ')

    if (!parts.length === 2)
        return res.status(401).json({ error: "Token error!" })

    const [, token] = parts;


    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
        req.userId = decoded.id;
        return next();
    }catch (err){
        return res.status(401).json({error : "Token invalid"})
    }




}