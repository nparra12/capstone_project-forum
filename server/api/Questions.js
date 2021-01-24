import Router from 'express-promise-router';
import { getConnection } from '../data/db.js'

// Question router
const questionRouter = Router();

// get all questions
const getQuestions = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        console.log('Attemping to fetch questions...')
        const sqlSelect =
            'SELECT q.id AS id, q.title AS title, q.body AS body, q.votes AS votes, q.createdate AS createdate, DATE_FORMAT(q.createdate, "%a %b %e %Y") AS formatdate, ' +
            'q.categoryid AS categoryid, c.category as category, u.id AS userid, u.username AS username ' +
            'FROM questions q LEFT JOIN users u ON u.id = q.userid LEFT JOIN categories c ON c.id = q.categoryid ' +
            'ORDER BY votes DESC;';
        dbconn.query(sqlSelect, (err, result) => {
            if (err) {
                console.log('Database error in getQuestions: ' + err);
                resp.status(404).send('Database error occurred while tyring to fetch questions. Please try again.')
            }
            console.log('Questions Fetched');
            resp.status(200).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in getQuestions: ' + err);
        resp.status(500).send('An error occured while trying to fetch questions: ' + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// get all questions by category
const getQuestionsByCategory = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id
        console.log(`Attemping to fetch question by category id:${id}...`)
        const sqlSelect =
            'SELECT q.id AS id, q.title AS title, q.body AS body, q.votes AS votes, q.createdate AS createdate, DATE_FORMAT(q.createdate, "%a %b %e %Y") AS formatdate, ' +
            'q.categoryid AS categoryid, c.category as category, u.id AS userid, u.username AS username ' +
            'FROM questions q LEFT JOIN users u ON u.id = q.userid LEFT JOIN categories c ON c.id = q.categoryid ' +
            'WHERE categoryid = ? ORDER BY votes DESC;';
        dbconn.query(sqlSelect, id, (err, result) => {
            if (err) {
                console.log('Database error in getQuestions: ' + err);
                resp.status(404).send(`Database error occurred while tyring to fetch questions by category id:${id}. Please try again.`)
            }
            console.log(`Questions for category id:${id} fetched`);
            resp.status(200).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in getQuestions: ' + err);
        resp.status(500).send(`An error occured while trying to fetch questions for category id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// find question by id
const findQuestion = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id
        console.log(`Attemping to fetch question id:${id}...`)
        const sqlSelect =
            'SELECT q.id AS id, q.title AS title, q.body AS body, q.votes AS votes, q.createdate AS createdate, DATE_FORMAT(q.createdate, "%a %b %e %Y") AS formatdate, ' +
            'q.categoryid AS categoryid, c.category as category, u.id AS userid, u.username AS username ' +
            'FROM questions q LEFT JOIN users u ON u.id = q.userid LEFT JOIN categories c ON c.id = q.categoryid ' +
            'WHERE q.id = ?';
        dbconn.query(sqlSelect, id, (err, result) => {
            if (err) {
                console.log('Database error in findQuestion: ' + err);
                resp.status(404).send(`Database error occurred while trying to fetch question id:${id}. Please try again.`)
            }
            console.log(`Question id:${id} Found`);
            resp.status(200).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in findQuestion: ' + err);
        resp.status(500).send(`An error occured while trying to fetch question id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// create new question
const addQuestion = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        console.log('Attemping to create question...')
        const title = req.body.title;
        const body = req.body.body;
        const userid = req.body.userid
        const categoryid = req.body.categoryid
        console.log('title:', title, 'body:', body, 'userid:', userid, 'categoryid', categoryid)
        const sqlInsert = 'INSERT INTO questions (title, body, userid, categoryid) VALUES (?, ?, ?, ?)';
        dbconn.query(sqlInsert, [title, body, userid, categoryid], (err, result) => {
            if (err) {
                console.log('Database error in addQuestion: ' + err);
                resp.status(404).send('Database error occurred while trying to add question. Please try again.')
            }
            console.log('Question created: ' + result);
            resp.status(201).send(result);
        });
    }
    catch (err) {
        console.log('Exception error caught in addQuestion: ' + err);
        resp.status(500).send('An error occured while trying to create question: ' + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// delete question
const deleteQuestion = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id
        console.log(`Attemping to delete question id:${id}...`)
        const sqlDelete = 'DELETE FROM questions WHERE id = ?';
        dbconn.query(sqlDelete, id, (err, result) => {
            if (err) {
                console.log('Database error in deleteQuestion: ' + err);
                resp.status(404).send('Database error occurred while deleting question. Please try again.')
            }
            console.log('Question Deleted:', result);
            resp.status(200).send(`Question id:${id} Deleted`);
        });
    }
    catch (err) {
        console.log('Exception error caught in deleteQuestion: ' + err);
        resp.status(500).send(`An error occured while trying to delete question id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};


// update question
const updateQuestion = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.body.id;
        const body = req.body.body
        console.log(`Attemping to delete update question id:${id}...`)
        const sqlUpdate = 'UPDATE questions SET body = ? WHERE id = ?';
        dbconn.query(sqlUpdate, [body, id], (err, result) => {
            if (err) {
                console.log('Database error in updateQuestion: ' + err);
                resp.status(404).send('Database error occurred while updating question. Please try again.')
            }
            console.log('Question updated: ' + result);
            resp.status(200).send(`Question id:${id} updated`);
        });
    }
    catch (err) {
        console.log('Exception error caught in updateQuestion: ' + err);
        resp.status(500).send(`An error occured while trying to update question id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// vote question
const voteQuestion = async (req, resp) => {
    const dbconn = await getConnection();
    try {
        const id = req.params.id;
        console.log(`Attemping to vote for question id:${id}...`)
        const sqlUpdate = 'UPDATE questions SET votes = votes + 1 WHERE id = ?';
        dbconn.query(sqlUpdate, id, (err, result) => {
            if (err) {
                console.log('Database error in voteQuestion: ' + err);
                resp.status(404).send('Database error occurred while applying vote. Please try again.')
            }
            console.log(result)
            resp.status(201).send(`Question id:${id} vote applied.`);
        });
    }
    catch (err) {
        console.log('Exception error caught in voteQuestion: ' + err);
        resp.status(500).send(`An error occured while trying to vote for question id:${id}: ` + err)
    }
    finally {
        if (dbconn) {
            dbconn.end();
        }
    };
};

// question routes
questionRouter.get('/get', getQuestions);
questionRouter.get('/get/:id', findQuestion);
questionRouter.get('/get/cat/:id', getQuestionsByCategory);
questionRouter.post('/add', addQuestion);
questionRouter.delete('/delete/:id', deleteQuestion);
questionRouter.post('/edit', updateQuestion);
questionRouter.put('/vote/:id', voteQuestion);

export default questionRouter;