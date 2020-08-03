const express = require('express');
const {Op} = require('sequelize');
const { Portfolio, Image } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        console.log(req.query.lastId)
        if ( parseInt(req.query.lastId, 10) ) {  // 초기 로딩이 아닐 때
            where.id = {[Op.lt]: parseInt(req.query.lastId, 10)}
        }
        const portfolios = await Portfolio.findAll({
            where,
            limit: 10,
            order: [['createdAt', 'DESC']],
            include: [{
                model: Image
            }]
        });
        res.status(200).json(portfolios);
    } catch(e) {
        console.error(e)
        next(e)
    }
})

module.exports = router
