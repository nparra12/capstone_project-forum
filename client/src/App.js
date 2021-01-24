import React, { useEffect } from 'react';
import './style/App.css'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Axios from 'axios'
import Header from './components/Header';
import QuestionEdit from './pages/QuestionEdit';
import QuestionList from './pages/QuestionList';
import ExplorePage from './pages/ExplorePage';
import QuestionPage from './pages/QuestionPage';
import AskQuestion from './pages/AskQuestion';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/RegisterPage';
import FrontPage from './pages/FrontPage';
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {

  // session state from server
  Axios.defaults.withCredentials = true;

  // states
  const userState = useSelector(state => state);
  const loginStatus = userState.logged;

  // check session state
  useEffect(() => {
    Axios.get('/user/login').then((resp) => {
      console.log('LoggedIn: ' + resp.data.loggedIn);
      if (resp.data.loggedIn === true) {
        console.log(resp.data.user[0].username + ': Session Logged')
      }
    });
  }, [loginStatus])


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <ProtectedRoute path='/home' exact component={HomePage} isAuth={loginStatus} />
          <ProtectedRoute path='/explore' exact component={ExplorePage} isAuth={loginStatus} />
          <ProtectedRoute path='/ask' exact component={AskQuestion} isAuth={loginStatus} />
          <ProtectedRoute path='/category/:catid' component={QuestionList} isAuth={loginStatus} />
          <ProtectedRoute path='/question/:id/answer' component={QuestionPage} isAuth={loginStatus} />
          <ProtectedRoute path='/question/:id' component={QuestionPage} isAuth={loginStatus} />
          <ProtectedRoute path='/edit/:id' component={QuestionEdit} isAuth={loginStatus} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={Register} />
          <Route path="/" component={FrontPage} />
          {loginStatus ?
            <Redirect to="/home" /> :
            <Redirect to="/" />
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
};
