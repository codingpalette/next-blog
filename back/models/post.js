const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init({
            // id가 기본적으로 들어있다.
            title : {
                type : DataTypes.STRING(100),
                allowNull: false, // 필수
            },
            description : {
                type: DataTypes.STRING(140), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // RetweetId
        }, {
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 이모티콘 저장
            sequelize,
        });
    }
    static associate(db) {
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        db.Post.belongsToMany(db.Tag, { through: 'PostTag' }); // post.addTags
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
    }
};