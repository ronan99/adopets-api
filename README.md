# adopets-api
API for Adopets challenge.

# Before Running the project

For the App start, is necessary a relational Database. I've been used MySql, so the preference is a MySql Database.

There's some variables on .env file, located in the root directory. you can change then to the configs that you want or need. 

# ATTENTION
For some reasons, my MySql server is running on **PORT 3380**, for change that, you can add an variable in .env file called DB_PORT. The default port for MySql is 3360.

# Commands for Start the project

Run **'npm install'** for install all dependencies

Run **'npx' or 'yarn' sequelize db:create** for create the database

Run **'npx' or 'yarn' sequelize db:migrate** for create all tables on the database

Run **'npx' or 'yarn' sequelize-cli db:seed:all** for start with an user. 

For access to the API , it's seeded on the command with the user: {"email": "adopets@email.com", "password" : "adopets"}. So you can use this login.

# Tests

The test were been made in Jest. They are not fully complete, still rest a lot to do. For reasons of my actually work, i couldn't finish it.

For run all the tests made untill today. 
Run **'npm test'**

The test runs in a MySqlite database in memory. And it revert everything at the end.
