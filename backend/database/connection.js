if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const Sequelize = require('sequelize');

module.exports = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: process.env.NODE_ENV === "production" && {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
);

