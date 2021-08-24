const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_URL || 'postgres://mszonline@localhost:5432/track_my_reading',
    {
        dialect: 'postgres'
    }
);
