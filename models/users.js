const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false, // 카카오 로그인은 비번 필요없으니,,
      },
      provider: {
        // 뭐로 로그인 했는지 : 카카오, 로컬,,
        type: Sequelize.STRING(10),
        allowNull: false,
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
