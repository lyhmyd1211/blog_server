/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('type', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'type',
    underscored: false,
  });

  Model.associate = function() {
    app.model.Type.belongsToMany(app.model.Article, {
      foreignKey: 'typeId',
      otherKey: 'articleId',
      through: app.model.ArticleType,
    });
  };

  return Model;
};
