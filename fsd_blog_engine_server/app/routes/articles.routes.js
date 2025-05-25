const articles = require("../controllers/articles.controllers");
const authorization = require ("../Middleware/Middlware");

module.exports = function(app){

    app.route("/articles") 
    .get(articles.getAll)
    .post(authorization.isAuthaenticated,articles.create);

    app.route("/articles/:article_id")
    .get(articles.getOne)
    .patch(authorization.isAuthaenticated,articles.updateArticle)
    .delete(authorization.isAuthaenticated,articles.deleteArticle);
}