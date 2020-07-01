module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글저장, 이모티콘
    });
    Tag.associate = (db) => {
        db.Tag.belongsToMany(db.Post, { through: 'PostTag' });
    };
    return Tag
}