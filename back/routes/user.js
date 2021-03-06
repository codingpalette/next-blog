const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {User} = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();



router.get('/', async (req, res, next) => {  // 로그인 유지를 위한 유저 정보
    try{
        if (req.user) {
            const fullUser = await User.findOne({
                where: {id : req.user.id},
                // attributes: ['id', 'nickname', 'email'], // 3개만 가져오기
                attributes: { // 비밀번호 제외하고 가져오기
                    exclude: ['password']
                },
                // include: [{
                //     model: Post,
                //     attributes: ['id']
                // }]
            })
            if (fullUser) {
                const data = fullUser.toJSON();
                data.level = parseInt(data.level, 10)
                return res.status(200).json(data)
            }
        } else {
            res.status(200).json(null)
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});



router.post('/login', isNotLoggedIn, async (req, res, next) => { // 로그인
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            console.log(info)
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                // console.error(loginErr)
                return next(loginErr);
            }
            const fullUser = await User.findOne({
                where: {id: user.id},
                // attributes: ['id', 'nickname', 'email'], // 3개만 가져오기
                attributes: { // 비밀번호 제외하고 가져오기
                    exclude: ['password']
                },
                // include: [{
                //     model: Post,
                //     attributes: ['id']
                // }]
            })
            if (fullUser) {
                const data = fullUser.toJSON();
                data.level = parseInt(data.level, 10)
                return res.status(200).json(data)
            }
        })
    })(req, res, next)
});

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
});

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
});

module.exports = router;