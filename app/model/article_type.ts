/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article_type', {
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
    typeId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'type',
        key: 'id',
      },
      field: 'type_id',
    },
  }, {
    timestamps: false,
    tableName: 'article_type',
    underscored: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  Model.associate = function() {

  };

  return Model;
};
