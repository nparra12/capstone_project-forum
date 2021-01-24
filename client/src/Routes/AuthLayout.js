import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import FrontPage from '../pages/FrontPage';


export const AuthLayout = () => (
    <div>
        <Switch>
            <Route path="/auth/front" component={FrontPage} />
            <Route path="/auth/login" component={LoginPage} />
            <Route path="/auth/register" component={Register} />
            <Redirect to="/auth/front" />
        </Switch>
    </div>
)