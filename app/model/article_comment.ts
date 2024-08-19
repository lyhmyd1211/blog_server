/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article_comment', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    articleId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'article',
        key: 'id',
      },
      field: 'article_id',
    },
    commentId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'comment',
        key: 'id',
      },
      field: 'comment_id',
    },
  }, {
    timestamps: false,
    tableName: 'article_comment',
    underscored: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Model.associate = function() {

  };

  return Model;
};
