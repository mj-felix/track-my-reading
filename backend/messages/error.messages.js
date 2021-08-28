module.exports = {
    auth: {
        INVALID_TOKEN: 'Authorization token invalid'
    },
    app: {
        NOT_FOUND: 'Resource not found',
        NO_HTTPS_USED: 'Please use HTTPS',
    },
    user: {
        NOT_FOUND: 'User not found',
        INVALID_EMAIL: 'Email invalid'
    },
    book: {
        NOT_FOUND: 'Book not found',
        TITLE_REQUIRED: 'Title must be provided',
        TOTAL_PAGES_POSITIVE_INTEGER: 'Total pages must be a positive Integer',
        TARGET_DATE_INVALID_FORMAT: 'Target date, if provided, must be a valid date in RRRR-MM-DD format',
        IS_ABANDONED_INVALID_FORMAT: 'Is Abandoned must be either true or false'
    },
    session: {
        NOT_FOUND: 'Session not found',
        MINUTES_POSITIVE_INTEGER: 'Minutes must be a positive Integer',
        PAGE_POSITIVE_INTEGER: 'Page must be a positive Integer',
        PAGE_MORE_THAN_TOTAL_PAGES: 'Page cannot be more than total pages',
        DATE_INVALID_FORMAT: 'Date must be a valid date in RRRR-MM-DD format'
    }
}