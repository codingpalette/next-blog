const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', isNotLoggedIn, async (req, res, next) => { // 회원가입
    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (exUser) {
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        if (process.env.ADMIN_EMAIL === req.body.email) {
            await User.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashedPassword,
                level: 0,
            });
        } else {
            await User.create({
                email: req.body.email,
                nickname: req.body.nickname,
                password: hashedPassword,
                level: 1,
            });
        }
        res.status(200).send('ok');
    } catch (e) {
        console.error(e);
        next(e);
    }
})

module.exports = router;