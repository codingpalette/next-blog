const express = require('express');
const {Op} = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
// const cors = require('cors')

const { Post, User, Tag } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

try {
    fs.accessSync('uploads')
} catch (e) {
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads')
}

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'codingpalette',
        key(req, file, cb) {
            cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
        }

    }),
    limits: {fileSize: 20 * 1024 * 1024}, // 20MB

});



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


router.post('/images',  isLoggedIn, upload.array('image'), (req, res, next) => { // 이미지 업로드
    // console.log(req.files);
    res.status(200).json(req.files.map((v) => v.location));
})


router.get('/:postId', async (req, res, next) => {
   try {
       const post = await Post.findOne({
           where: { id: req.params.postId },
       });
       if (!post) {
           return res.status(404).send('존재하지 않는 게시글입니다.');
       }
       const nowPost = await Post.findOne({
           where: { id: post.id },
           include: [{
               model: Tag,
               attributes: ['name']
           }]
       });
       const nextPost = await Post.findOne({
           where: { id: {[Op.gt]:post.id} },
           limit: 1,
           order: [['id', 'ASC']],
           attributes: { // 제외하고 가져오기
               exclude: ['content']
           }
       });
       const prevPost = await Post.findOne({
           where: { id: {[Op.lt]:post.id} },
           limit: 1,
           order: [['id', 'DESC']],
           attributes: { // 제외하고 가져오기
               exclude: ['content']
           }
       })
       // console.log('nextPost ==' , nextPost)
       // console.log('prevPost ==' , prevPost)
       res.status(200).json({
           prev: prevPost,
           now: nowPost,
           next: nextPost
       });
   } catch (e) {
       console.error(e);
       next(e)
   }
});

router.patch('/', isLoggedIn, async (req, res, next) => { // 포스트 수정
    try {
        const user = await User.findOne({
            where: {id: req.user.id},
        });
        const data = user.toJSON();
        if (parseInt(data.level, 10) !== 0) {
            res.status(404).json('관리자가 아닙니다.');
        } else {
            await Post.update({
                title : req.body.title,
                description : req.body.description,
                content: req.body.content,
            }, {
                where: {id: req.body.id}
            });
            const post = await Post.findOne({
                where: { id: req.body.id },
            });
            if (req.body.tags.length >= 1) {
                const res = await Promise.all(req.body.tags.map((tag) => Tag.findOrCreate({
                    where: {name: tag.name}
                })))
                await post.setTags(res.map((v) => v[0]));
            }

            res.status(201).json(req.body)
        }

    } catch (e) {
        console.error(e);
        next(e)
    }
});

router.delete('/:postId', isLoggedIn, async (req, res, next) => { // DELETE /post/1
    try {
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id
            }
        });
        res.status(200).json({ PostId: parseInt(req.params.postId , 10) })
    } catch (e) {
        console.error(e);
        next(e)
    }
});


module.exports = router;