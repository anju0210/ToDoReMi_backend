module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    todo: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    song_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'todo',
    timestamps: true,
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, { foreignKey: 'user_id' });
    Todo.belongsTo(models.Song, { foreignKey: 'song_id' });
  };

  return Todo;
};