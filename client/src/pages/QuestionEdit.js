import React, { useState, useEffect, useRef } from 'react';
import '../style/App.css'
import Axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import $ from 'jquery'

export default function QuestionEdit() {

    // route params
    let { id } = useParams()
    const history = useHistory();

    // states
    const [question, setQuestion] = useState({})
    const [newBody, setQuestionBody] = useState('')
    const [hideQuestion, setHideQuestion] = useState(false);

    // refs
    const bodyRef = useRef();

    // get question from server
    useEffect(() => {
        Axios.get(`/question/get/${id}`).then((resp) => {
            console.log(resp.data)
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
            bodyRef.current.value = resp.data[0].body;
        })

    }, [id]);

    // hooks
    useEffect(() => {
        bodyRef.current.focus();
    }, [bodyRef])


    // delete question
    const deleteQuestion = (id) => {
        Axios.delete(`/question/delete/${id}`);
        history.push(`/category/${question.categoryid}`)
    };

    // edit question
    const submitEdit = (id) => {
        Axios.post('/question/edit',
            {
                id: id,
                body: newBody
            });
        setQuestion(
            {
                title: question.title,
                body: newBody,
            }
        )
        $('#editBtn').click();
    };

    // handle enter key press
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitEdit();
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="row ml-2 mb-2">
                    {hideQuestion ?
                        <h3>There is no question asked</h3> :
                        <h1>{question.category} <span>&#62;</span> Question {question.id} <span>&#62;</span> Edit</h1>
                    }
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5>{question.username} <span className="mb-1 text-muted">asked </span> </h5>
                                    <small><span>{question.formatdate}</span></small>
                                </div>
                                <h3>{question.title}</h3>
                                <p>{question.body}</p>
                            </div>
                            <div className="card-footer">
                                <div className="card-button left" id="editBtn" data-toggle="collapse" data-target="#edit-form" aria-expanded="false">
                                    <span> <EditIcon /> Edit</span>
                                </div>
                                <div className="card-button right" onClick={() => { deleteQuestion(id) }}>
                                    <span> <DeleteIcon /> Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <form id="edit-form" className="collapse">
                            <div className="form-group">
                                <label htmlFor="edit-body">Edit Question</label>
                                <textarea className="form-control" id="edit-body" rows="3" maxLength="2000"
                                    onKeyDown={handleKeyDown}
                                    ref={bodyRef} onChange={(e) => {
                                        setQuestionBody(e.target.value);
                                    }} required></textarea>
                                {/* <div>{validation.bodyStatus}</div> */}
                            </div>
                            <div className="form-group">
                                <button type="button" className="main-button btn btn-primary btn-lg btn-block" onClick={submitEdit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
