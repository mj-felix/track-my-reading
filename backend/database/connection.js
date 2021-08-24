if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.NODE_ENV === "production"
        }
    }
);

