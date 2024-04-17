import Button from "./Layouts/Button";
import logo from "../Utils/learneasy.png";
import {useRef, useState} from "react";
import Loader from "./Layouts/Loader";
import {useDispatch, useSelector} from "react-redux";
import Alert from "./Layouts/Alert";
import {postData} from "../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../Redux/alertSlice";
import { useNavigate } from "react-router";

export default  function ForgotPassword() {
    const dispatch = useDispatch();
    const email = useRef(null);
    const [loader, setLoader] = useState(false);
    const { isVisible, message } = useSelector(state => state.alert);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        setLoader(true);
        const result = await postData('/forgot-password',{email: email.current.value});
        setLoader(false);

        if(result.error) {
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
        } else {
            navigate(`/forgot-password/verify-user/${result.token}`);
        }
    }

    return(
        <>
            {isVisible && <Alert message={message}/>}
            <div className="bg-gray-100 p-8">
                <img className='w-36' src={logo} alt='learn-easy' />
            </div>
            <div className='bg-gray-100 p-8'>
                <div className='p-4'>
                    <h2 className='text-2xl font-medium'>Forgot Password</h2>
                    <p className='text-gray-500 text-lg w-1/2'>In case of forgot password, you need to enter email address associated with that account. please provide email
                        address in below input field.</p>
                </div>
                <div className='p-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='text-lg p-1'>Email</label>
                        <input id='email' ref={email} className='w-96 py-2 px-4 rounded border-2'/>
                    </div>
                    <Button className='bg-cyan-700 text-white py-2 px-4 rounded text-lg mt-4 flex gap-2 items-center' onClick={handleForgotPassword}>{loader && <Loader />}Submit</Button>
                </div>
            </div>
        </>
    );
}