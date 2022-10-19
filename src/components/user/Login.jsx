import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { getAccount } from '../../api/apiMethod';
import { ICONPASS } from '../../Icon';
import icongoogle from "../../img/icongoogle.png";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { pathNameAd } from '../../common/pathName';
const schema = yup.object().shape({
    username: yup.string().required('Please enter your username').min(3),
    password: yup.string().required('Please enter your password').min(3)
})
// const schema = yup.object({
//     firstName: yup.string().required(),
//     age: yup.number().positive().integer().required(),
// }).required();


function Login(props) {
    const navi = useNavigate()

    const [typePass, setTypePass] = useState(true)
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });



    //////////////CHECK LOGIN
    const CheckLogin = () => {
        toast.loading("Loading....")
        getAccount(`?user_name=${getValues("username")}&password=${getValues("password")}`)
            .then(res => res.json()
            ).catch(err => {
                toast.dismiss();
                toast.error("Login fail_server!")
            }).then(res => {
                if (res.length === 0) {
                    toast.dismiss();
                    switch ("") {
                        case getValues("username"):

                            toast.error(`Enter Username again!`)
                            break;
                        case getValues("password"):

                            toast.error(`Enter password again!`)
                            break;
                        default:
                            toast.error(`Enter Username/password again!`)
                            break;
                    }
                } else {
                    setTimeout(() => {
                        res[0].type === "admin" ? navi(pathNameAd.dashboard) : navi("/");
                        toast.dismiss();
                        toast.success("Login Success ", { duration: 2000, })
                    }, 2000);
                    localStorage.setItem("infoAccount", JSON.stringify({ id: res[0].id, cart_id: res[0].cart_id, type: res[0].type, userName: res[0].user_name }))
                }
            })
    }
    /////////////////////////////SUBMIT
    const onSubmit = data => {
        CheckLogin()
    }
    ///////////CHANGE TYPE PASSWROD
    const handleChangeType = () => {
        setTypePass(!typePass)
    }


    return (
        <div className='rolemodal'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <form onSubmit={CheckLogin}> */}
                <div className='login signInanimation'>
                    <h1>Log in</h1>
                    <div className='login__name'>
                        <input type="text" placeholder='Username' autoComplete='off' name="username" {...register("username")} />
                        {errors.username && <p className="error">{errors.username.message}</p>}
                    </div>
                    <div className='login__pass'>
                        <input type={typePass ? "password" : "text"} placeholder='Password' name="password" autoComplete='off' {...register("password")} />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                        <i onClick={handleChangeType} className={ICONPASS}></i>
                        <Link to="/forgotpass">
                            <p>Forgot password?</p>
                        </Link>
                    </div>
                    <div className='login__btn'>
                        <button type="submit">Continue</button>
                        <p><img src={icongoogle} alt="" />Google</p>
                        <label className='d-flex flex-wrap justify-content-center'>
                            <p>First time you come to Handmade Shop?</p>
                            <Link to="/signup">
                                <strong>  Sign up</strong>
                            </Link>
                        </label>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default Login;