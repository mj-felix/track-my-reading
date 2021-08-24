import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';

// import routes
import bookRoutes from './routes/book.routes.js';

// const connectToDB = require('./database/connect.js');
// const { notFoundError, errorHandler } = require('./middleware/error.middleware.js');
// const errors = require('./messages/error.messages.js');

const app = express();
app.use(express.json());

// Use .env configuration and Morgan logging in dev
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
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
                throw new Error('Use https');
                // throw new Error(errors.app.NO_HTTPS_USED);
            } else {
                res.redirect(301, `https://${req.header('host')}${req.url}`);
            }
        }
        else
            next();
    });
}

// Use imported routes
app.use('/api/v1/books', bookRoutes);
// app.use('/api/v1/auth', require('./routes/auth.routes.js'));
// app.use('/api/v1/users', require('./routes/user.routes.js'));
// app.use('/api/v1/tags', require('./routes/tag.routes.js'));
// app.use('/api/v1/notes', require('./routes/note.routes.js'));
// app.use('/api/v1/notes', require('./routes/file.routes.js'));
// app.use('/api/v1/public', require('./routes/public.routes.js'));

// Conntect to  MongoDB
// connectToDB();

// Serve React app in Prod
const __dirname = path.resolve();
console.log(__dirname);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res, next) => {
        if (req.url.includes('/api/v')) {
            next();
        } else {
            res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
        }
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running ...');
    });
}

// Error handling
// app.use(notFoundError);
// app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(
    port,
    () => {
        console.log(`${new Date().toString()}: Server started on port ${port}`);
    }
);