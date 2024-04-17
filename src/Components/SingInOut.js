import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, toggleSignInSignOut } from "../Redux/formSlice";
import { useRef, useState } from "react";
import { showAlert, setAlertMessage } from "../Redux/alertSlice";
import {Link} from "react-router-dom";
import Loader from "./Layouts/Loader";
import {postData} from "../ApiCalls/apis";
import Alert from "./Layouts/Alert";

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
            const result = await postData('/signup', {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            });
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
            setLoader(false);
        } else {
            const result = await postData('/login', {
                email: email.current.value,
                password: password.current.value,
            });
            result.token && Cookies.set('token', result.token, {expires: 7});
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
            setLoader(false);
            dispatch(toggleForm(false));
        }
    }

    return (
        <>
            {isVisible && <Alert message={message}/>}
            {toggle && <div className='absolute top-0 bottom-0 right-0 left-0 bg-black z-10 opacity-70'></div>}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-700 p-8 rounded-md z-50">
                <div className="absolute right-0 top-0 p-2">
                    <i className='bx bx-x text-3xl text-white' onClick={handleCloseForm}></i>
                </div>
                <div className="text-center text-white">
                    {!isSignup ? <p className="text-2xl font-medium p-2">Sign In</p>
                        : <p className="text-2xl font-medium p-2">Create Account</p>}
                </div>
                <ul className="p-2 text-white">
                    {isSignup && <div className="m-4  flex flex-col gap-2">
                        <label htmlFor='name' className="text-lg font-medium">Name</label>
                        <input ref={name} type="text" id="name" className="text-xl bg-cyan-900 outline-none p-3 rounded-md max-w-96" />
                    </div>}
                    <li className="m-4 flex flex-col gap-2">
                        <label htmlFor='email' className="text-lg font-medium">Email</label>
                        <input ref={email} type="email" id="email" className="text-xl  bg-cyan-900 outline-none p-3 rounded-md max-w-96" />
                    </li>
                    <li className="m-4 flex flex-col gap-2">
                        <label htmlFor='password' className="text-lg font-medium">Password</label>
                        <input ref={password} type="password" id="password" className="text-xl bg-cyan-900 outline-none p-3 rounded-md max-w-96" />
                    </li>
                    <li className="m-4 flex flex-col gap-2">
                        {isSignup ? <button className="bg-cyan-900 text-white outline-none p-4 rounded-md mt-4 text-lg font-semibold flex items-center justify-center gap-2" type="submit" onClick={handleOnSubmit}>{loader && <Loader />} Sign Up</button>
                            : <button className="bg-cyan-900 text-white outline-none p-4 rounded-md mt-4 text-lg font-semibold flex items-center justify-center gap-2" type="submit" onClick={handleOnSubmit}>{loader && <Loader />} Sign In</button>}
                        <button className="text-lg text-right px-4"><Link to='/forgot-password'>Forgot password?</Link></button>
                    </li>
                </ul>
                <div className="p-2 ml-5">
                    {!isSignup && <p className="text-lg">Don't have account? <button className="font-semibold text-white" onClick={handleSignInSignUp}>Create Account</button></p>}
                    {isSignup && <p className="text-lg">Already have account? <button className="font-semibold text-white" onClick={handleSignInSignUp}>Sign In</button></p>}
                </div>
            </div>
        </>
    );
}