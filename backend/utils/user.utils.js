const asyncHandler = require('express-async-handler');
const { QueryTypes } = require('sequelize');

const sequelize = require('../database/connection');
// const User = require('../models/user.model');

module.exports.updateUserStats = asyncHandler(async (userId) => {
    //TODO: rewrite as db trigger
    const selectQuerySumAndCount = `SELECT SUM(minutes), COUNT(*) FROM "session" WHERE book_id IN (SELECT id FROM "book" WHERE user_id = '${userId}')`;
    const [{ sum: minutesSpent, count: readingsCompleted }] = await sequelize.query(selectQuerySumAndCount, { type: QueryTypes.SELECT });
    const selectQuerySumOfMaxes = `SELECT SUM(x.max) FROM (SELECT MAX(page) as max FROM "session" WHERE book_id IN (SELECT id FROM "book" WHERE user_id = '${userId}') GROUP BY book_id) x`;
    const [{ sum: pagesRead }] = await sequelize.query(selectQuerySumOfMaxes, { type: QueryTypes.SELECT });
    // const readingsCompleted = sessions.length;
    // const pagesRead = sessions.reduce((accumulator, session) => accumulator + session.minutes, 0);
    // const minutesSpent = 
    const updateQuery = `UPDATE "user" SET minutes_spent=${minutesSpent}, readings_completed=${readingsCompleted}, pages_read=${pagesRead} WHERE id = '${userId}'`;
    await sequelize.query(updateQuery, { type: QueryTypes.UPDATE });
});