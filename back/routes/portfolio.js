const express = require('express');
const {Op} = require('sequelize');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();





module.exports = router;