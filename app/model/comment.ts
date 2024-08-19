/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('comment', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'parent_id',
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_time',
    },
  }, {
    timestamps: false,
    tableName: 'comment',
    underscored: false,
  });

  Model.associate = function() {
    app.model.Comment.belongsToMany(app.model.Article, {
      foreignKey: 'commentId',
      otherKey: 'articleId',
      through: app.model.ArticleComment,
    });
  };

  return Model;
};
