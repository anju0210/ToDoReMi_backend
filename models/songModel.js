module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    singer: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    listening: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'song',
    timestamps: false,
  });

  Song.associate = (models) => {
    Song.hasMany(models.Todo, { foreignKey: 'song_id' });
  };

  return Song;
};