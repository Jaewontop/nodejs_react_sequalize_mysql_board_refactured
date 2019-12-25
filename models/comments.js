const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "comments",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // commenter: {
      //   type: Sequelize.STRING(40),
      //   allowNull: true,
      // },
      content: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true, // 삭제일 (복구용)
      userscored: true, //_를 허용할 건지
      tableName: "comments",
    }
  );
};
