import React, { useState, useEffect, useRef } from 'react';
import '../style/App.css'
import Axios from 'axios'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GradeIcon from '@material-ui/icons/Grade';
import $ from 'jquery'
import { useSelector } from 'react-redux'

export default function QuestionPage() {

    // route atrr
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();

    // states
    const [question, setQuestion] = useState({})
    const [answerList, setAnswerList] = useState([])
    const [body, setBody] = useState('')
    const [hideQuestion, setHideQuestion] = useState(false);
    const [hideAnswers, setHideAnswers] = useState(false);
    const userState = useSelector(state => state);
    const [voteState, setVoteSate] = useState(false);

    // data
    const date = new Date()

    // refs
    const bodyRef = useRef();

    
    useEffect(() => {
        
        // get question from server
        Axios.get(`/question/get/${id}`).then((resp) => {
            if (resp.data.length === 0) {
                setHideQuestion(true);
            } else {
                setQuestion(
                    {
                        id: resp.data[0].id,
                        title: resp.data[0].title,
                        body: resp.data[0].body,
                        votes: resp.data[0].votes,
                        userid: resp.data[0].userid,
                        username: resp.data[0].username,
                        categoryid: resp.data[0].categoryid,
                        category: resp.data[0].category,
                        createdate: resp.data[0].createdate,
                        formatdate: resp.data[0].formatdate,
                    }
                )
            }
        }, []);

        //check path being passed in
        console.log('Route location: ' + location.pathname); 

        // get answers for question
        Axios.get(`/answer/get/${id}`).then((resp) => {
            if (resp.data.length === 0) {
                setHideAnswers(true);
            } else {
                setHideAnswers(false);
                var answers = resp.data.map(answer => (
                    {
                        body: answer.body,
                        username: answer.username,
                        formatdate: answer.formatdate
                    }))
                setAnswerList(answers)
            }
        });

        // open answer input 
        let path = location.pathname.slice(-6);
        if (path === 'answer') {
            $('#answerBtn').click();
        };

    }, [id, location.pathname, voteState]);

    // set answer body focus
    useEffect(() => {
        bodyRef.current.focus();
    }, [bodyRef])

    // add new answer
    const submitAnswer = () => {
        if (body !== '') {

            console.log(date)
            let newAnswer = {
                body: body,
                username: userState.username,
                formatdate: date.toDateString()
            }
            setAnswerList([...answerList, newAnswer])
            setHideAnswers(false);
            Axios.post('/answer/add',
                {
                    body: body,
                    userid: userState.userId,
                    questionid: id
                }
            );
            bodyRef.current.value = '';
            bodyRef.current.focus();
            $('#answerBtn').click();
        };
    };

    // handle enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    }

    // handle question vote
    const voteQuestion = (id) => {
        Axios.put(`/question/vote/${id}`)
        let prevQuestion = question
        console.log('question votes = ' + prevQuestion.votes)
        prevQuestion.votes++;
        setQuestion(prevQuestion)
        setVoteSate(!voteState)
    };

    return (
        <div className="page">
            <div className="container">
                <div className="row ml-2 mb-2">
                    {hideQuestion ?
                        <h3>There is no question asked</h3> :
                        <h1>{question.category} <span>&#62;</span> Question {question.id}</h1>
                    }
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="question-body card-body" onClick={(e) => { history.push(`/edit/${question.id}`) }}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5>{question.username} <span className="mb-1 text-muted">asked </span> </h5>
                                    <small><span>{question.formatdate}</span></small>
                                </div>
                                <h3>{question.title}</h3>
                                <p>{question.body}</p>
                            </div>
                            <div className="card-footer">
                                <div className="card-button left" id="answerBtn" data-toggle="collapse" data-target="#answer-form" aria-expanded="false" aria-controls="collapseExample">
                                    <span> <QuestionAnswerIcon /> Answer</span>
                                </div>
                                <div className="card-button right" onClick={(e) => { voteQuestion(question.id) }}>
                                    <span ><GradeIcon /> {question.votes}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <form id="answer-form" className="collapse">
                            <div className="form-group">
                                <label htmlFor="answer">Answer</label>
                                <textarea className="form-control" id="answer" rows="3" maxLength="500"
                                    placeholder="Provide an answer here..."
                                    onKeyDown={handleKeyDown}
                                    ref={bodyRef} onChange={(e) => {
                                        setBody(e.target.value);
                                    }} required></textarea>
                                {/* <div>{validation.bodyStatus}</div> */}
                            </div>
                            <div className="form-group">
                                <button type="button" className="main-button btn btn-primary btn-lg btn-block" onClick={submitAnswer}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div id="answer-list">
                            <ul className="list-group list-group-flush">
                                {hideAnswers ?
                                    <li className="list-group-item mb-3">
                                        <div className="d-flex w-100 justify-content-center">
                                            <h4>There are no answers for this question</h4>
                                        </div>
                                    </li> :
                                    answerList.map((val, key) => {
                                        return (
                                            <li className="list-group-item mb-3" key={key}>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">{val.username} <span className="mb-1 text-muted">answered</span></h5>
                                                    <small>{val.formatdate}</small>
                                                </div>
                                                <p className="mb-1">{val.body}</p>
                                                <div className="d-flex w-100 justify-content-end">
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
