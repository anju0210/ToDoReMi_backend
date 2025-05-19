module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    tableName: 'user',
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Todo, { foreignKey: 'user_id' });
  };

  return User;
};