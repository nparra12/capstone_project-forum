import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import QuestionEdit from '../pages/QuestionEdit';
import QuestionList from '../pages/QuestionList';
import NavMenu from '../components/NavMenu';
import ExplorePage from '../pages/ExplorePage';
import QuestionPage from '../pages/QuestionPage';
import AskQuestion from '../pages/AskQuestion';
import HomePage from '../pages/HomePage';

export const AppLayout = ({ match }) => (
    <div>
        <aside>
            <NavMenu />
        </aside>
        <main>
            <Switch>
                <Route exact path={match.path} exact component={HomePage} />
                <Route path={`${match.path}/explore`} exact component={ExplorePage} />
                <Route path={`${match.path}/ask`} exact component={AskQuestion} />
                <Route path={`${match.path}/category/:catid`} component={QuestionList} />
                <Route path={`${match.path}/question/:id/answer`} component={QuestionPage} />
                <Route path={`${match.path}/question/:id`} component={QuestionPage} />
                <Route path={`${match.path}/edit/:id`} component={QuestionEdit} />
                <Redirect to={`${match.url}`} />
            </Switch>
        </main>
    </div>
)
