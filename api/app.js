const express = require('express');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();
const morgan = require('morgan');
const { loginCtrl, registerCtrl } = require('./controllers/auth.js');
const { patchUser, getUsers, getContent, postContent, patchContent } = require('./controllers');
const sequelize = require('./database');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const { verify } = require('./helpers/handleJwt');
const roleAuth = require('./helpers/roleAuth');

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
secret: process.env.SECRET_SESSIONS,
saveUninitialized:true,
cookie: { maxAge: oneDay },
resave: false
}));

//ROUTES
app.get('/users', verify, roleAuth('admin'), getUsers);
app.get('/contents', verify, roleAuth('admin'), getContent);
app.post('/login', loginCtrl);
app.post('/register', registerCtrl);
app.post('/create-content', verify, roleAuth('admin'), postContent);
app.patch('/:id', verify, roleAuth('admin'), patchUser);
app.patch('/contents/:id', verify, roleAuth('admin'), patchContent);

AdminJS.registerAdapter(AdminJSSequelize)
const run = () => {
    try {
        const connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        connection.connect(err => {
            if (err) throw err;
            console.log('Connected to database');
        });
        //Admin Panel
        const adminBro = new AdminBro({
            databases: [sequelize],
            rootPath: '/admin'
        });
        //create an express router that will handle all adminJS routes
        const router = AdminBroExpress.buildRouter(adminBro)
        app.use(adminBro.options.rootPath, router)

        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log('Listening on port 3000');
        });
    } catch (error) {
        console.error(error)
    }
}

run();