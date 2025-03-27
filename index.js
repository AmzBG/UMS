//Import required modules
var express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//! Import EJS
// require('ejs');

// Import route modules
const studentRoute = require('./routes/student.route');
const courseRoute = require('./routes/course.route');
const enrollmentRoute = require('./routes/enrollment.route');
const examRoute = require('./routes/exam.route');
const authRoute = require('./routes/auth.route');
const authenticateToken = require('./routes/middleware');


// Load environment variables
require('dotenv').config();

// Create an Express app
const app = express();
const port = process.env.PORT;

// MiddleWare setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.use(express.static('public'));

app.use(cookieParser());

// Middleware to set Cache-Control headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });  

//! setup EJS engine
// app.set('view engine', 'ejs');


app.get('/', (req, res)=>{

    const message = req.query.message || '';
    //! Render page here
    // res.render('loginPage', {message: message});
    res.status(200).json({
        message: 'Login page successfully reached',
    });

});


// Define routes
const routes = [
    {path: '/api/student', module: studentRoute},
    {path: '/api/course', module: courseRoute},
    {path: '/api/enrollment', module: enrollmentRoute},
    {path: '/api/exam', module: examRoute},
];

app.use('/', authRoute);

// Let the app use the defined routes
routes.forEach(({ path, module }) => {
    app.use(path, authenticateToken, module);
});

// Start the server and listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



