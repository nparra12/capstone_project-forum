import { v4 as uuidv4 } from 'uuid';
import Router from 'express-promise-router';
import { getConnection } from '../data/db.js'
import bcrypt from 'bcrypt'

// User router
const userrouter = Router();

// Password salt
const saltRounds = 10

// // Register new user
const createUser = async (req, resp) => {
    const dbconn = await getConnection();
    console.log('Attemping to create user...')
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username
    const password = req.body.password;
    const sqlInsert = 'INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)';
    const sqlSelect = 'SELECT count(*) AS count FROM users WHERE username = ?'
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log('Hash error: ' + err);
        }
        try {
            dbconn.query(sqlSelect, username, (err, result) => {
                if (err) {
                    console.log('Database Error in createUser: ' + err);
                    resp.status(404).send('Database error occurred while trying to create user. Please try again.')
                }
                else if (result[0].count > 0) {
                    console.log(`User ${username} already exists.`);
                    resp.status(200).send({ message: `Username ${username} already exists.` });
                }
                else {
                    dbconn.query(sqlInsert, [firstname, lastname, username, hash], (err, result) => {
                        if (err) {
                            console.log('Database Error in createUser: ' + err);
                            resp.status(404).send('Database error occurred while trying to create user. Please try again.')
                        }
                        console.log(`Created user with id:${result.insertId}`);
                        resp.status(201).send({ message: 'Registration Successful', userId: result.insertId });
                    });
                }
            })
        }
        catch (err) {
            console.log('Exception error caught in createUser: ' + err);
            resp.status(500).send({ message: `An error occured while trying to create user: ${username}`, error: err });
        }
        // finally {
        //     if (dbconn) {
        //         dbconn.end();
        //     };
        //};
    });
};

// Validate user login
const validateUser = async (req, resp) => {
    const dbconn = await getConnection();
    console.log('Attemping to validate user...')
    try {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;
        const sqlSelect = 'SELECT * FROM users WHERE username = ?';
        dbconn.query(sqlSelect, username, (err, result) => {
            if (err) {
                console.log('Database Error in validateUser: ' + err);
                resp.status(404).send({ message: 'Database error occurred while trying to validate user. Please try again.', error: err })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, success) => {
                    if (success) {
                        console.log('User authorized: ' + result[0].username);
                        // Set user session
                        req.session.user = result;
                        resp.status(200).send(result)
                    } else {
                        resp.status(401).send({ message: 'Invalid password.' });
                    }
                });
            } else {
                resp.status(404).send({ message: 'Username does not exist.' });
            }
        });
    }
    catch (err) {
        console.log('Exception error caught in validateUser: ' + err);
        resp.status(500).send({ message: 'An error occured while trying to validate user.', error: err })
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// Set user session
const setSession = (req, resp) => {
    console.log('Attemping to set session...')
    if (req.session.user) {
        resp.status(200).send({ loggedIn: true, user: req.session.user })
    } else {
        resp.status(200).send({ loggedIn: false })
    }
};

// User routes
userrouter.post('/register', createUser);
userrouter.post('/login', validateUser);
userrouter.get('/login', setSession);

export default userrouter;