/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;
  const Model = app.model.define('article', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'create_time',
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'update_time',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    abstract: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    viewTimes: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      field: 'view_times',
    },
    titlePic: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'title_pic',
    },
  }, {
    timestamps: true,
    timezone: '+08:00',
    createdAt: 'createTime',
    updatedAt: 'updateTime',
    tableName: 'article',
    underscored: false,
  });

  Model.associate = function() {
    app.model.Article.belongsToMany(app.model.Type, {
      foreignKey: 'articleId',
      otherKey: 'typeId',
      through: app.model.ArticleType,
    });
    app.model.Article.belongsToMany(app.model.Comment, {
      foreignKey: 'articleId',
      otherKey: 'commentId',
      through: app.model.ArticleComment,
    });
  };

  return Model;
};
