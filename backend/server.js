const express = require('express');
const path = require('path');

const { notFoundError, errorHandler } = require('./middleware/error.middleware');
const errors = require('./messages/error.messages');

const app = express();
app.use(express.json());

// Use .env configuration and Morgan logging in dev
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
    const morgan = require('morgan');
    app.use(morgan(':user-agent :date[iso] :method :url :status :response-time ms - :res[content-length]'));
}

// herokuapp.com subdomain permanent redirection
if (process.env.PROVIDER === 'heroku' && process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.hostname.includes('track-my-reading')) {
            res.redirect(301, 'https://trackmyreading.mjfelix.dev');
        }
        else
            next();
    });
}

// redirection to https - heroku way
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            if (req.url.includes('/api/v')) {
                res.status(400);
                throw new Error(errors.app.NO_HTTPS_USED);
            } else {
                res.redirect(301, `https://${req.header('host')}${req.url}`);
            }
        }
        else
            next();
    });
}

// Routes
app.use('/', require('./routes/index.routes'));

// Serve React app in Prod
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res, next) => {
        if (req.url.includes('/api/v')) {
            next();
        } else {
            res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
        }
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running ...');
    });
}

// Error handling
app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
    port,
    async () => {
        console.log(`${new Date().toString()}: Server started on port ${port}`);
        console.log(process.env.DATABASE_URL);
        try {
            // db connection instance
            const dbConnection = require('./database/connection');
            await dbConnection.sync({ force: true });
            // await dbConnection.sync();
            console.log(`${new Date().toString()}: Connected to ${dbConnection.options.dialect} '${dbConnection.config.database}' database on port ${dbConnection.config.port}`);
        } catch (err) { console.log(err); }
    }
);