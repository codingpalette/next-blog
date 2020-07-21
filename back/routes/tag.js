const express = require('express');
const {Op} = require('sequelize');
const {Post, Tag} = require('../models');
const router = express.Router();


router.get('/', async (req, res, next) => { // 태그들 불러오기
   try {
       const tags = await Tag.findAll({
           order: [['createdAt', 'DESC']],
       });
       res.status(200).json(tags);
   } catch (e) {
       console.error(e);
       next(e)
   }
});

router.get('/:tags', async (req, res, next) => {  // 포스트 태그 불러오기
    try {
        const where = {};
        console.log(req.query.lastId)
        if ( parseInt(req.query.lastId, 10) ) {  // 초기 로딩이 아닐 때
            where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
        }
        const posts = await Post.findAll({
            where,
            limit: 20,
            order: [['createdAt', 'DESC']],
            attributes: { // 제외하고 가져오기
                exclude: ['content']
            },
            include: [{
                model: Tag,
                where: {name: decodeURIComponent(req.params.tags) }

            }]
        });
        res.status(200).json(posts);
    } catch(e) {
        console.error(e)
        next(e)
    }
})

module.exports = router