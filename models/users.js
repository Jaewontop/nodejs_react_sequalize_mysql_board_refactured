const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      user_nickname: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      user_password: {
        type: Sequelize.STRING(100),
        allowNull: false, // 카카오 로그인은 비번 필요없으니,,
      },
      provider: {
        // 뭐로 로그인 했는지 : 카카오, 로컬,,
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue: "local",
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true, // 삭제일 (복구용)
      userscored: true, //_를 허용할 건지
      tableName: "users",
    }
  );
};
