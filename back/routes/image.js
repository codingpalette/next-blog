const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const cors = require('cors')

cors({
    origin: 'https://codingpalette.com/write',
    credentials: true
})

const { Image } = require('../models');
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

router.post('/', cors(), isLoggedIn, upload.array('image'), (req, res, next) => { // 이미지 업로드
    // console.log(req.files);
    res.status(200).json(req.files.map((v) => v.location));
})

router.post('/test', (req, res, next) => {
   res. status(200).json({aa : 'ok'})
});


module.exports = router;