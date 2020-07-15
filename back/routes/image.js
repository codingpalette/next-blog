const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const { Image } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
    fs.accessSync('uploads')
} catch (e) {
    console.log('uploads 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, res, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자 추출(png)
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' + new Date().getTime() + ext); // 이미지12465464.png
        }
    }),
    limits: {fileSize: 20 * 1024 * 1024}, // 20MB

});

router.post('/', isLoggedIn, upload.array('image'), async (req, res, next) => { // 이미지 업로드
    // console.log(req.files);
    res.json(req.files.map((v) => v.filename));
})


module.exports = router;