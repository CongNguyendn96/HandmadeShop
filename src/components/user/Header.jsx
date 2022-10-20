import React, { memo, useState } from 'react';
import logo from "../../img/logo.png"
import { ICONCART } from '../../Icon';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import SearchUser from './SearchUser';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './../../redux/thunk/actionThunk';
Header.defaultProps = {
    cart: true,
    search: false
}
function Header({ search, children, cart }) {
    const [show, setShow] = useState(false);
    const listItem = useSelector((state) => state.users.cart.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const locale = localStorage.getItem("infoAccount") ? JSON.parse(localStorage.getItem("infoAccount")) : {}
        // dispatch(getCart(locale.cart_id));
    }, [dispatch]);
    return (
        <div className="header">
            <Link to="/">
                <div className='header__img'>
                    <img src={logo} alt="" className="header__image" />
                </div>
            </Link>
            <div className='header__cart' >
                {search && <SearchUser />}
                {cart && <p className="header__cart--icon" style={{ marginLeft: "8px" }}>
                    <input type="text" onBlur={() => {
                        setTimeout(() => {
                            setShow(false)
                        }, 300);
                    }} onFocus={() => setShow(true)} />
                    <i className={ICONCART} ></i>
                </p>}
                {show ? (<ul className='cart-list'>
                    <div className='cart-title'>
                        <p>Your Shopping Cart</p>
                        <p onClick={() => setShow(!show)}>x</p>
                    </div>
                    {listItem && listItem.map((item, i) => (
                        <li className="cart-item" key={i}>
                            <div className='cart-item__info'>
                                <img src={item.img} alt="" />
                                <p>{item.name}</p>
                            </div>
                            <div className='cart-item__detail'>
                                <p>${item.price}</p>
                            </div>
                            <p>Qty:{item.quantity}</p>
                        </li>
                    ))}
                </ul>) : ("")}
            </div>
            {children}
        </div >
    );
}

export default memo(Header);