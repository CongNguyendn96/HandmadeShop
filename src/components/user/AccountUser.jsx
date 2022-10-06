import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ICONUSER } from '../../Icon';


function AccountUser(props) {
    const [account, setAccount] = useState(false);
    const navi = useNavigate()
    const logOut = () => {
        console.log("ads");
        window.localStorage.removeItem("infoAccount")
        navi("/login", { replace: true })

    }
    return (
        <div className="header__login">
            <p>{props.namee}</p>
            <span onClick={() => setAccount(!account)}>
                <i className={ICONUSER}></i>
            </span>
            {account && (<ul className="header__account">
                <li><Link to="/profileUser" >My Account</Link></li>

                <li><span onClick={() => logOut()} >Log Out</span></li>
            </ul>)}
        </div>
    );
}

export default AccountUser;