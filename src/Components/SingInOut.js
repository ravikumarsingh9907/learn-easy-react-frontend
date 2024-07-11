import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, toggleSignInSignOut, toggleProfileOptions } from "../Redux/formSlice";
import { useRef, useState } from "react";
import { showAlert, setAlertMessage } from "../Redux/alertSlice";
import {Link} from "react-router-dom";
import Loader from "./Layouts/Loader";
import {getData, postData} from "../ApiCalls/apis";
import Alert from "./Layouts/Alert";
import {setIsAdmin, setIsLoggedIn} from "../Redux/userSlice";

export default function Authenticate() {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { isSignup, toggle } = useSelector(state => state.form);
    const { isVisible, message } = useSelector(state => state.alert);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleCloseForm = () => {
        dispatch(toggleForm(false));
    }

    const handleSignInSignUp = () => {
        dispatch(toggleSignInSignOut(!isSignup));
    }

    const handleOnSubmit = async () => {
        setLoader(true);
        if (isSignup) {
            const result = await postData('/signup', JSON.stringify({
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            }));
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
            setLoader(false);
            result?.success && dispatch(toggleForm(false));
        } else {
            const result = await postData('/login', JSON.stringify({
                email: email.current.value,
                password: password.current.value,
            }));
            if (result?.token) {
                Cookies.set('token', result.token, {expires: 7});
                const isAdmin  = await getData('/users/me/is-admin');
                isAdmin?.success && dispatch(setIsAdmin(true));
                dispatch(toggleForm(false));
                dispatch(setIsLoggedIn(true));
            } else {
                dispatch(setAlertMessage(result));
                dispatch(showAlert(true));
            }
            setLoader(false);
        }
    }

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 p-8 rounded-md z-50">
                <div className="absolute -right-3 -top-3 px-2 py-1 bg-white rounded-full border-2">
                    <i className='bx bx-x text-3xl text-black z-40' onClick={handleCloseForm}></i>
                </div>
                <div className="bg-cyan-700 rounded-md p-8">
                    <div className="text-center text-white">
                        {!isSignup ? <p className="text-2xl font-medium p-2">Sign In</p>
                            : <p className="text-2xl font-medium p-2">Create Account</p>}
                    </div>
                    <ul className="p-2 text-white">
                        {isSignup && <div className="m-4  flex flex-col gap-2">
                            <label htmlFor='name' className="text-lg font-medium">Name</label>
                            <input ref={name} type="text" id="name"
                                   className="text-xl bg-cyan-900 outline-none p-3 rounded-md max-w-96"/>
                        </div>}
                        <li className="m-4 flex flex-col gap-2">
                            <label htmlFor='email' className="text-lg font-medium">Email</label>
                            <input ref={email} type="email" id="email"
                                   className="text-xl  bg-cyan-900 outline-none p-3 rounded-md max-w-96"/>
                        </li>
                        <li className="m-4 flex flex-col gap-2">
                            <label htmlFor='password' className="text-lg font-medium">Password</label>
                            <input ref={password} type="password" id="password"
                                   className="text-xl bg-cyan-900 outline-none p-3 rounded-md max-w-96"/>
                        </li>
                        <li className="m-4 flex flex-col gap-2">
                            {isSignup ? <button
                                    className="bg-cyan-900 text-white outline-none p-4 rounded-md mt-4 text-lg font-semibold flex items-center justify-center gap-2"
                                    type="submit" onClick={handleOnSubmit}>{loader && <Loader/>} Sign Up</button>
                                : <button
                                    className="bg-cyan-900 text-white outline-none p-4 rounded-md mt-4 text-lg font-semibold flex items-center justify-center gap-2"
                                    type="submit" onClick={handleOnSubmit}>{loader && <Loader/>} Sign In</button>}
                            <button className="text-lg text-right px-4"><Link to='/forgot-password'>Forgot
                                password?</Link></button>
                        </li>
                    </ul>
                    <div className="p-2 ml-5">
                        {!isSignup && <p className="text-lg">Don't have account? <button className="font-semibold text-white" onClick={handleSignInSignUp}>Create Account</button></p>}
                        {isSignup && <p className="text-lg">Already have account? <button className="font-semibold text-white" onClick={handleSignInSignUp}>Sign In</button></p>}
                    </div>
                </div>
            </div>
        </>
    );
}