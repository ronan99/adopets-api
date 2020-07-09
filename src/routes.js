const routes = require("express").Router()
const bodyParser = require("body-parser")
const authMiddleware = require("./app/middleware/auth")
const SessionController = require("./app/controllers/SessionController")
const UserController = require("./app/controllers/UserController")
const ProductController = require("./app/controllers/ProductController")
routes.use(bodyParser.urlencoded({extended: true}))

routes.post("/login" , SessionController.login);
routes.post("/logout" , SessionController.logout);


routes.use(authMiddleware);


routes.get("/users" , UserController.index);
routes.post("/users" , UserController.store);
routes.delete("/users" , UserController.remove);

routes.get("/products" , ProductController.index);
routes.post("/products" , ProductController.store);
routes.delete("/products" , ProductController.remove);
routes.put("/products" , ProductController.update);

routes.get("/products" , (req,res) =>{
    res.status(200).send()
})
module.exports = routes;