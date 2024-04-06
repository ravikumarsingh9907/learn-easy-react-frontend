import {showAlert, setAlertMessage} from "../Redux/alertSlice";
import {useDispatch} from "react-redux";

export default function useFetchAuth({url, body, method}) {
    const dispatch = useDispatch();

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => {
        return response.json();
    }).then(data => {
        dispatch(setAlertMessage(data));
        dispatch(showAlert(true));
    }).catch(e => {
        console.log(e)
        dispatch(setAlertMessage(e));
        dispatch(showAlert(true));
    });
}