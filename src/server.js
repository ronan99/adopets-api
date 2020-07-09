const app = require("./app")


app.listen( process.env.PORT || 3000 , console.log("Servidor rodando na porta : " + (process.env.port || 3000) ) );