"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLoginHeader = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Basic Authorization Header' });
    }
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [email, password] = credentials.split(':');
    res.locals.email = email;
    res.locals.password = password;
    next();
};
exports.default = get;
