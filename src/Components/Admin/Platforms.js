import {useEffect, useState} from "react";
import {getData} from "../../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../../Redux/alertSlice";
import {useDispatch} from "react-redux";
import PageNotFound from "../Layouts/PageNotFound";
import useCheckIsAdmin from "../../Hooks/useCheckIsAdmin";

export default function Platforms() {
    const dispatch = useDispatch();
    const [platforms, setPlatforms] = useState();
    const { isAdmin } = useCheckIsAdmin();

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
        <>
            {isAdmin ? <div className=''>
                <h2 className=''>Platforms</h2>
            </div> : <PageNotFound />}
        </>
    );
}