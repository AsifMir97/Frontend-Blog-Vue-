const Joi = require('joi');

const comments = require("../models/comments.models");
const articleModels=require("../models/articles.models");
const { getSingleArticle } = require('../models/articles.models');



const getAllFromArticle = (req, res) => {
    let article_id = parseInt(req.params.article_id)
    comments.getAllCommentsOfArticle(article_id,(err, num_rows, results) =>{

   if(err) return res.sendStatus(500);

   return  res.status(200).send(results);
})

}

const create = (req, res) => {
    
    const schema = Joi.object({
       "comment_text": Joi.string().required(),
       
       })
       
       const {error}  = schema.validate(req.body);
       if (error) return res.status(400).send(error.details[0].message);
       if (error===401) return res.status(401)
       let article_id = parseInt(req.params.article_id)
       articleModels.getSingleArticle(article_id,(err)=>{
        if (err==404){
            return res.sendStatus(404)

        }
        else{
            comments.addNewComment (req.body.comment_text,article_id, (err) => {
                if(err) return res.sendStatus(500);
           
                return res.sendStatus(201)
            
         })

        }
       })

}

const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

        comments.deleteComment(comment_id,(err)=>{
            
            if(err===500) return res.sendStatus(500)
            if(err===404) return res.sendStatus(404)
            if(err===401) return res.sendStatus(401)

            return res.sendStatus(200)
        })

    }

   





module.exports ={
    getAllFromArticle:getAllFromArticle,
    deleteComment:deleteComment,
    create:create
}