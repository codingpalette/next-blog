const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    "development": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "next-blog",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "next-blog",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": process.env.DB_PASSWORD,
        "database": "next-blog",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
