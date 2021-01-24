import Router from 'express-promise-router';
import { getConnection } from '../data/db.js'

// answer router
const answerRouter = Router();

// get all answers for question
const getAnswers = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const questionid = req.params.id
        console.log('Attemping to fetch answers...')
        const sqlSelect = 'SELECT a.id AS id, a.body AS body, a.createdate AS createdate, DATE_FORMAT(a.createdate, "%a %b %e, %Y") AS formatdate, ' +
            'a.questionid AS questionid, u.id AS userid, u.username AS username FROM answers a LEFT JOIN users u ON u.id = a.userid ' + 
            'WHERE questionid = ? ORDER BY a.createdate ASC';
        dbconn.query(sqlSelect, questionid, (err, result) => {
            if (err) {
                console.log('Database error in getAnswers: ' + err);
                resp.status(404).send('Database error occurred while tyring to fetch answers. Please try again.')
            }
            console.log('Answers Fetched');
            resp.status(200).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in getAnswers: ' + err);
        resp.status(500).send('An error occured while trying to fetch answers: ' + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// find answer by id
const findAnswer = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id
        console.log(`Attemping to fetch answer id:${id}...`)
        const sqlSelect = 'SELECT * FROM answers WHERE id = ?';
        dbconn.query(sqlSelect, id, (err, result) => {
            if (err) {
                console.log('Database error in findAnswer: ' + err);
                resp.status(404).send(`Database error occurred while trying to fetch answer id:${id}. Please try again.`)
            }
            console.log(`Answer id:${id} Found`);
            resp.status(200).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in findAnswer:' + err);
        resp.status(500).send(`An error occured while trying to fetch answer id:${id}:` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// create new answer
const addAnswer = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        console.log('Attemping to create answer...')
        const body = req.body.body;
        const userid = req.body.userid
        const questionid = req.body.questionid
        console.log('body:', body, 'userid:', userid, 'questionid', questionid)
        const sqlInsert = 'INSERT INTO answers (body, userid, questionid) VALUES (?, ?, ?)';
        dbconn.query(sqlInsert, [body, userid, questionid], (err, result) => {
            if (err) {
                console.log('Database error in addAnswer: ' + err);
                resp.status(404).send('Database error occurred while trying to add answer. Please try again.')
            }
            console.log('Answer created: ' + result);
            resp.status(201).send(result)
        });
    }
    catch (err) {
        console.log('Exception error caught in addAnswer: ' + err);
        resp.status(500).send('An error occured while trying to add answer:' + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// delete answer
const deleteAnswer = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id
        console.log(`Attemping to delete answer id:${id}...`)
        const sqlDelete = 'DELETE FROM answers WHERE id = ?';
        dbconn.query(sqlDelete, id, (err, result) => {
            if (err) {
                console.log('Database error in deleteAnswer: ' + err);
                resp.status(404).send('Database error occurred while deleting answer. Please try again.')
            }
            console.log('Answer Deleted: ' + result);
            resp.status(200).send(`Answer id:${id} Deleted`);
        });
    }
    catch (err) {
        console.log('Exception error caught in deleteAnswer: ' + err);
        resp.status(500).send(`An error occured while trying to delete answer id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};


// update answer
const updateAnswer = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.body.id;
        const body = req.body.body;
        console.log(`Attemping to update answer id:${id}...`)
        const sqlUpdate = 'UPDATE answers SET body = ? WHERE id = ?';
        dbconn.query(sqlUpdate, [body, id], (err, result) => {
            if (err) {
                console.log('Database error in updateAnswer: ' + err);
                resp.status(404).send('Database error occurred while updating answer. Please try again.')
            }
            console.log('Answer updated: ' + result);
            resp.status(200).send(`Answer id:${id} updated`);
        });
    }
    catch (err) {
        console.log('Exception error caught in updateAnswer: ' + err);
        resp.status(500).send(`An error occured while trying to update answer id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// vote answer
const voteAnswer = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id;
        console.log(`Attemping to vote for answer id:${id}...`)
        const sqlUpdate = 'UPDATE answers SET votes = votes + 1 WHERE id = ?';
        dbconn.query(sqlUpdate, id, (err, result) => {
            if (err) {
                console.log('Database error in voteAnswer: ' + err);
                resp.status(404).send('Database error occurred while applying vote. Please try again.')
            }
            console.log(result)
            resp.status(201).send(`Question id:${id} vote applied.`);
        });
    }
    catch (err) {
        console.log('Exception error caught in updateAnswer: ' + err);
        resp.status(500).send(`An error occured while trying to vote for answer id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// answer routes
answerRouter.get('/get/:id', getAnswers);
answerRouter.get('/find/:id', findAnswer);
answerRouter.post('/add', addAnswer);
answerRouter.delete('/delete/:id', deleteAnswer);
answerRouter.put('/edit', updateAnswer);
answerRouter.put('/vote/:id', voteAnswer);

export default answerRouter;