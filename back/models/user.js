module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL 에는 users 테이블 생성
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            // allowNull: false, // 필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, // 필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post); // 내가 작성한 포스트들
        db.User.hasMany(db.Comment);

    };
    return User
}