const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Portfolio extends Model {
    static init(sequelize) {
        return super.init({
            // id가 기본적으로 들어있다.
            title : {
                type : DataTypes.STRING(100),
                allowNull: false, // 필수
            },
            link : {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            modelName: 'Portfolio',
            tableName: 'portfolios',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 이모티콘 저장
            sequelize,
        });
    }
    static associate(db) {
        db.Portfolio.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        db.Portfolio.hasMany(db.Image); // post.addImages, post.getImages
    }
};