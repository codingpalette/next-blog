const express = require('express');
const {Op} = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const { User, Portfolio, Image } = require('../models');
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
    // storage: multer.diskStorage({
    //     destination(req, res, done) {
    //         done(null, 'uploads');
    //     },
    //     filename(req, file, done) {
    //         const ext = path.extname(file.originalname); // 확장자 추출(png)
    //         const basename = path.basename(file.originalname, ext);
    //         done(null, basename + '_' + new Date().getTime() + ext); // 이미지12465464.png
    //     }
    // }),
    limits: {fileSize: 20 * 1024 * 1024}, // 20MB

});


router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // 포트폴리오 업로드
   try {
       const user = await User.findOne({
           where: {id: req.user.id},
       });
       if (user) {
           const data = user.toJSON();
           if (parseInt(data.level, 10) !== 0) {
               res.status(404).json('관리자가 아닙니다.');
           } else {
               const portfolio = await Portfolio.create({
                   title: req.body.title,
                   link: req.body.link,
                   UserId: req.user.id
               });

               if (req.body.image) {
                   if (Array.isArray(req.body.image)) { // 이미지를 여러개 올리면 image: [img1.png, img2.png]
                       const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                       await portfolio.addImages(images)
                   } else {  //  이미지를 하나만 올리면 image: img.png
                       const image = await  Image.create({ src: req.body.image });
                       await portfolio.addImages(image)
                   }
               }
               const fullPortfolio = await Portfolio.findOne({
                   where: { id: portfolio.id },
                   include: [{
                       model: Image,
                   }]
               });
               res.status(201).json(fullPortfolio);
           }
       }
   } catch(e) {
       console.error(e);
       next(e);
   }

});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res ,next) => {  // 이미지 업로드
    //  upload.single('image'), upload.none()
    console.log(req.files);
    // res.json(req.files.map((v) => v.filename));
    res.status(200).json(req.files.map((v) => v.location));
});


router.get('/:portfolioId', async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOne({
            where: { id: req.params.portfolioId },
        });
        if (!portfolio) {
            return res.status(404).send('존재하지 않는 게시글입니다.');
        }
        const fullPortfolio = await Portfolio.findOne({
            where: { id : portfolio.id },
            include: [{
                model: Image,
                attributes: ['src']
            }]
        })
        res.status(200).json(fullPortfolio)
    } catch (e) {
        console.error(e);
        next(e);
    }
});


router.patch('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id},
        });
        if (user) {
            const data = user.toJSON();
            if (parseInt(data.level, 10) !== 0) {
                res.status(404).json('관리자가 아닙니다.');
            } else {
                await Portfolio.update({
                    title: req.body.title,
                    link: req.body.link,
                }, {
                    where: {id: req.body.id}
                });

                const portfolio = await Portfolio.findOne({
                    where: {id: req.body.id}
                })

                if (req.body.image) {
                    if (Array.isArray(req.body.image)) { // 이미지를 여러개 올리면 image: [img1.png, img2.png]
                        const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                        await portfolio.setImages(images)
                    } else {  //  이미지를 하나만 올리면 image: img.png
                        const image = await  Image.create({ src: req.body.image });
                        await portfolio.setImages(image)
                    }
                }
                res.status(201).json(req.body)
            }
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
});

router.delete('/:portfolioId', isLoggedIn, async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {id: req.user.id},
        });
        if (user) {
            const data = user.toJSON();
            if (parseInt(data.level, 10) !== 0) {
                res.status(404).json('관리자가 아닙니다.');
            } else {
                await Portfolio.destroy({
                    where: {
                        id: req.params.portfolioId,
                        UserId: req.user.id
                    }
                });
                res.status(200).json({ PortfolioId: parseInt(req.params.portfolioId , 10) })
            }
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
});


module.exports = router;
