import {getData} from "../ApiCalls/apis";
import {useEffect, useState} from "react";

export default function useCheckIsAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await getData('/users/me/is-admin');
            result?.success ? setIsAdmin(true) : setIsAdmin(false);
        })();
    }, []);

    return { isAdmin };
}