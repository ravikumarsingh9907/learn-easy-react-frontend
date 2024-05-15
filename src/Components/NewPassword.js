import Button from "./Layouts/Button";
import logo from "../Utils/learneasy.png";
import {useRef, useState} from "react";
import Loader from "./Layouts/Loader";
import {useDispatch, useSelector} from "react-redux";
import Alert from "./Layouts/Alert";
import {postData} from "../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../Redux/alertSlice";
import {useNavigate, useParams} from "react-router";

export default  function NewPassword() {
    const dispatch = useDispatch();
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const [loader, setLoader] = useState(false);
    const { isVisible, message } = useSelector(state => state.alert);
    const navigate = useNavigate();
    const { token } = useParams();

    const handleForgotPassword = async () => {
        setLoader(true);
        const result = await postData(`/forgot-password/verify-user/${token}/new-password`,
            JSON.stringify({password: password.current.value, confirmPassword: confirmPassword.current.value}));
        setLoader(false);
        dispatch(setAlertMessage(result));
        dispatch(showAlert(true));
        if(result.success) {
            navigate(`/`);
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
                    <h2 className='text-2xl font-medium'>Set new password</h2>
                </div>
                <div className='p-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='password' className='text-lg p-1'>Password</label>
                        <input id='password' type='password' ref={password} className='w-96 py-2 px-4 rounded border-2'/>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='confirm-password' className='text-lg p-1'>Confirm Password</label>
                        <input id='confirm-password' type='password' ref={confirmPassword} className='w-96 py-2 px-4 rounded border-2'/>
                    </div>
                    <Button className='bg-cyan-700 text-white py-2 px-4 rounded text-lg mt-4 flex gap-2 items-center' onClick={handleForgotPassword}>{loader && <Loader />}Submit</Button>
                </div>
            </div>
        </>
    );
}