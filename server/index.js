// Imports 
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRoutes from './api/Users.js'
import questionRoutes from './api/Questions.js'
import answerRoutes from './api/Answers.js'

// Constants
const app = express();
const port = 3001;

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser("secretcode"));
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(
    session({
        key: "userId",
        secret: "secretcode",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24
        }
    })
);


// Listener
app.listen(port, () => {
    console.log('Listening on port ' + port)
});

// Routes
app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/answer', answerRoutes);