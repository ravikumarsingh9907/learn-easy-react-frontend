import {useEffect, useState} from "react";
import {getData} from "../../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../../Redux/alertSlice";
import {useDispatch} from "react-redux";

export default function Platforms() {
    const dispatch = useDispatch();
    const [platforms, setPlatforms] = useState();

    useEffect(() => {
        (async () => {
            const platforms = await getData('/platforms');
            if(platforms.error) {
                dispatch(showAlert(true));
                dispatch(setAlertMessage(platforms));
            } else {
                setPlatforms(platforms);
            }
        })();
    }, [platforms]);



    return (
        <div className=''>
            <h2 className=''>Platforms</h2>
        </div>
    );
}