const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, User } = require('../models');
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
                    content: req.body.content,
                    UserId: req.user.id
                });
            }

        }


        res.status(200).send('test')
    } catch (e) {
        console.error(e);
        next(e)
    }
})


module.exports = router;