const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,{
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
)

const User = require('./userModel')(sequelize, Sequelize.DataTypes);
const Song = require('./songModel')(sequelize, Sequelize.DataTypes);
const Todo = require('./todoModel')(sequelize, Sequelize.DataTypes);

User.associate({ Todo });
Song.associate({ Todo });
Todo.associate({ User, Song });

module.exports = sequelize;