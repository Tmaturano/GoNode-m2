module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
  });

  // Relationship between Category and User. This makes this model understand that exists a
  // property called UserId
  Category.associate = (models) => {
    Category.belongsTo(models.User);
    Category.hasMany(models.Snippet); // 1 Category can have many snippets
  };

  return Category;
};
