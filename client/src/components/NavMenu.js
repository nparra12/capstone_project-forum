import React from 'react'
import '../style/App.css'
import { NavData } from './NavData'
import { useHistory, withRouter, Link } from 'react-router-dom';
import EmojiPeopleSharpIcon from '@material-ui/icons/EmojiPeopleSharp';

function NavMenu() {
    let history = useHistory();
    return (
        <div className="sidenav sticky-offset">
            <ul className="navlist">
                {
                    NavData.map((val, key) => {
                        return (
                            <Link className="navrow nav-link"
                                key={key}
                                id={window.location.pathname === val.link ? "active" : ""}
                                style={{ textDecoration: 'none' }}
                                to={val.link}>
                                <div id="icon">{val.icon}</div>
                                <div id="category">{val.title}</div>

                            </Link>
                        )
                    })
                }
                <li id="askButton-li" className="navrow">
                    <button
                        id="askButton"
                        type="button"
                        className="main-button btn btn-primary btn-lg btn-block"
                        onClick={() => {
                            history.push('/ask')
                        }}><EmojiPeopleSharpIcon />Submit Question</button>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(NavMenu);
