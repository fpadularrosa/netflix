const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv =  require('dotenv');
const morgan = require('morgan');
const { loginCtrl, registerCtrl } = require('./controllers/auth.js');
const { updateCtrl } = require('./controllers');
const db = require('./database');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminJS = require('adminjs');
const AdminJSSequelize = require('@adminjs/sequelize');
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.get('/', (req, res) => { res.send('Hello World!'); });
app.post('/login', loginCtrl);
app.post('/admin/resources/users/actions/new', registerCtrl);
app.patch('/:id', updateCtrl);

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
            databases: [db],
            rootPath: '/admin'
        });
        //create an express router that will handle all adminJS routes
        const router = AdminBroExpress.buildRouter(adminBro)
        app.use(adminBro.options.rootPath, router)

        app.listen(process.env.PORT || 3000, () => {
            console.log('Listening on port 3000');
        });
    } catch (error) {
        console.error(error)
    }
}

run();