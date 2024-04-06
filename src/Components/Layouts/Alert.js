import { showAlert, setAlertMessage } from "../../Redux/alertSlice";
import { useDispatch } from "react-redux";

export default function Alert({message}) {
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        dispatch(showAlert(false));
        dispatch(setAlertMessage(null));
    }
    return (
        <>
            {message && message.error && <div className="fixed z-50 top-10 left-1/2 -translate-x-1/2 rounded-full bg-red-400 flex gap-2 items-center shadow-xl">
                <p className="text-white text-sm font-medium py-2 px-4">{message.error}</p>
                <i className='bx bx-x p-4 rounded-full text-xl text-white' onClick={handleCloseAlert}></i>
            </div>}
            {message && message.success && <div className="fixed z-50 top-10 left-1/2 -translate-x-1/2 rounded-full bg-green-400 flex gap-2 items-center shadow-xl">
                <p className="text-white text-lg font-medium py-2 px-4">{message.success}</p>
                <i className='bx bx-x p-4 rounded-full text-xl text-white' onClick={handleCloseAlert}></i>
            </div>}
        </>
    );
}