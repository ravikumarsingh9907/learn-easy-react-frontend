import Button from "./Layouts/Button";
import logo from "../Utils/learneasy.png";
import {useRef, useState} from "react";
import Loader from "./Layouts/Loader";
import {useDispatch, useSelector} from "react-redux";
import Alert from "./Layouts/Alert";
import {postData} from "../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../Redux/alertSlice";
import {useNavigate, useParams} from "react-router";

export default  function OtpVerify() {
    const dispatch = useDispatch();
    const otp = useRef(null);
    const [loader, setLoader] = useState(false);
    const { isVisible, message } = useSelector(state => state.alert);
    const navigate = useNavigate();
    const { token } = useParams();
    const handleOtpVerification = async () => {
        setLoader(true);
        const result = await postData(`/forgot-password/verify-user/${token}`,JSON.stringify({otp: otp.current.value}));
        setLoader(false);
        if(result.error) {
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
        } else {
            return navigate(`/forgot-password/verify-user/${token}/new-password`)
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
                    <h2 className='text-2xl font-medium'>Verify your account</h2>
                    <p className='text-gray-500 text-lg w-1/2'>Please enter 6 digit the One Time Password sent to your associated email address.</p>
                </div>
                <div className='p-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='otp' className='text-lg p-1'>Enter OTP</label>
                        <input id='otp' ref={otp} className='w-96 py-2 px-4 rounded border-2'/>
                    </div>
                    <Button className='bg-cyan-700 text-white py-2 px-4 rounded text-lg mt-4 flex gap-2 items-center' onClick={handleOtpVerification}>{loader && <Loader />}Verify</Button>
                </div>
            </div>
        </>
    );
}