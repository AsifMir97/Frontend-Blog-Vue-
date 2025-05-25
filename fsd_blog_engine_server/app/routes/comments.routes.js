const comments = require("../controllers/comments.controllers");
const authorization = require ("../Middleware/Middlware");

module.exports = function(app){

    app.route("/articles/:article_id/comments") 
    .get(comments.getAllFromArticle)
    .post(comments.create);
    
    app.route("/comments/:comment_id")
    .delete(authorization.isAuthaenticated,comments.deleteComment)


}