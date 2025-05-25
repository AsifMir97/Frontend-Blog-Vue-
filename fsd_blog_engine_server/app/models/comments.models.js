const db = require("../../database");



//gets a single comment from an article

const getSingleCommentofArticle = (comment_id, done) => {
    db.get(
        "SELECT * FROM comments WHERE comment_id=?",
        [comment_id],
        (err, row) => {
            
            if(err) console.log("Something went wrong: " + err);
            if(!row) return done(404);
            return done(null, {
                comment_id: row.comment_id,
            });
        }
    )
}


//gets all the coemnst for an article
const getAllCommentsOfArticle = (article_id,done) => { 
    const results = [];

    db.each(

        "SELECT * FROM comments WHERE article_id=?",
        [article_id],
        
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
                comment_id: row.comment_id,
                comment_text : row.comment_text,
                date_published: new Date(row.date_published).toLocaleDateString(),
               
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )

}


const addNewComment = (comment_text,article_id, done) => {

    let date = Date.now();
    const sql = 'INSERT INTO comments (comment_text, date_published, article_id) VALUES (?,?,?)';
    let values = [comment_text, date, article_id];

    db.run(
        sql,
        values,
        function(err){
           if(err) return done(err, null);

           return done(null, this.lastID);
        }
    )

}

const deleteComment =(comment_id,done) =>{

    getSingleCommentofArticle(comment_id,(err,results)=>{
        if(err===404) {
            
            return done(err)
        }
        else{
            const sql = 'DELETE FROM comments WHERE comment_id=?'
            db.run(sql,[comment_id],(err)=>{
                if (err) return done(err)
        
                return done(null);
            })

        }
    })

    }




module.exports={
    getAllCommentsOfArticle:getAllCommentsOfArticle,
    deleteComment:deleteComment,
    addNewComment:addNewComment
}