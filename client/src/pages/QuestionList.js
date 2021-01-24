import React, { useState, useEffect } from 'react';
import '../style/App.css'
import Axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import GradeIcon from '@material-ui/icons/Grade';

export default function QuestionList(props) {

    // states
    const [questionList, setQuestionList] = useState([])
    const [category, setCategory] = useState('')
    const [hideList, setHideList] = useState(false);
    const [voteState, setVoteSate] = useState(false);

    // route params
    const history = useHistory();
    const { catid } = useParams();

    // get question list
    useEffect(() => {
        Axios.get(`/question/get/cat/${catid}`).then((resp) => {
            if (resp.data.length === 0) {
                setHideList(true)
                setQuestionList([])
            } else {
                setHideList(false)
                setCategory(resp.data[0].category);
                setQuestionList(resp.data);
            }
        });
    }, [catid]);

    // handle question vote
    const voteQuestion = (id) => {
        Axios.put(`/question/vote/${id}`)
        let prevList = questionList
        let question = prevList.find(ques => ques.id === id)
        if (question) {
            question.votes++;
        }
        //setQuestionList([...prevList])
        setVoteSate(!voteState)
    };

    return (
        <div className="page">
            <div className="container ">
                {hideList ?
                    <div className="row ml-2 mb-2 justify-content-center">
                        <h3>Please feel free to add a question into this category</h3>
                    </div> :
                    <div className="row ml-2 mb-2">
                        <h1>{category}</h1>
                    </div>
                }
                <div className="row">
                    <div className="col">
                        {questionList.map((val, key) => {
                            return (
                                <div className="row" key={val.id}>
                                    <div className="col">
                                        <div className="card"  >
                                            <div className="question-body card-body" onClick={(e) => { history.push(`/question/${val.id}`) }}>
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5>{val.username} <span className="mb-1 text-muted">asked </span> </h5>
                                                    <small><span>{val.formatdate}</span></small>
                                                </div>
                                                <h3>{val.title}</h3>
                                                <p>{val.body.length > 200 ? val.body.substring(0, 200) + '...' : val.body}</p>
                                                <div className="d-flex w-100 justify-content-end">
                                                    <p><span className="badge ">{val.category}</span></p>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="card-button left" onClick={(e) => { history.push(`/question/${val.id}/answer`) }}>
                                                    <span> <QuestionAnswerIcon /> Answer</span>
                                                </div>
                                                <div className="card-button right" onClick={(e) => { voteQuestion(val.id) }}>
                                                    <span ><GradeIcon /> {val.votes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
