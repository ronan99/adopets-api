require('dotenv').config({
    path : process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})
module.exports = {
  host : process.env.DB_HOST,
  port : process.env.DB_PORT || "3380",
  username : process.env.DB_USER,
  password : process.env.PASS,
  database : process.env.DB_NAME,
  dialect : process.env.DB_DIALECT || "mysql2",
  storage : './__tests__/database.sql',
  logging :false,
  define :{
    timestamps : true,
    underscored : true,
    underscoredAll : true
  }
}