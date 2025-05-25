const authorization = require ("../Middleware/Middlware")
const users = require("../controllers/users.controllers");

module.exports = function(app){

    app.route("/login") 
    .post(users.login);
    app.route("/logout")
    .post(authorization.isAuthaenticated,users.logout);
    app.route("/users")
    .post(authorization.isAuthaenticated,users.createUser)
    .get(authorization.isAuthaenticated,users.getAllUsers);
}