const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User, Tag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id},
        });
        if (user) {
            const data = user.toJSON();
            if (parseInt(data.level, 10) !== 0) {
                res.status(404).json('관리자가 아닙니다.');
            } else {
                const post = await Post.create({
                    title : req.body.title,
                    description : req.body.description,
                    content: req.body.content,
                    UserId: req.user.id
                });
                if (req.body.tags.length >= 1) {
                    const res = await Promise.all(req.body.tags.map((tag) => Tag.findOrCreate({
                        where: {name: tag.name}
                    })))
                    await post.addTags(res.map((v) => v[0]));
                }
                const fullPost = await Post.findOne({
                    where: { id: post.id },
                    include: [{
                        model: Tag,
                    }]
                })
                res.status(201).json(fullPost)
            }

        }
    } catch (e) {
        console.error(e);
        next(e)
    }
});

router.get('/:postId', async (req, res, next) => {
   try {
       const post = await Post.findOne({
           where: { id: req.params.postId },
       });
       if (!post) {
           return res.status(404).send('존재하지 않는 게시글입니다.');
       }
       const fullPost = await Post.findOne({
           where: { id: post.id },
           include: [{
               model: Tag,
               attributes: ['name']
           }]
       });
       res.status(200).json(fullPost);
   } catch (e) {
       console.error(e);
       next(e)
   }
});


module.exports = router;