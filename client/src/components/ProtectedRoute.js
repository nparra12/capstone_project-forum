import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import NavMenu from './NavMenu';

export default function ProtectedRoute({ isAuth, component: Component, ...rest }) {
    return (
        <div>
            <Route {...rest} render={(props) => {
                if (isAuth) {
                    return (
                        <>
                            <NavMenu />
                            <Component />
                        </>
                    )
                } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                }
            }} />
        </div>
    )
}
