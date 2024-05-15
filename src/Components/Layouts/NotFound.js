import {Link} from "react-router-dom";

export default function NotFound({message, redirectUrl}) {
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='p-16 rounded-md bg-blue-100 text-center'>
                <h2 className='text-3xl font-medium'>{message}</h2>
                <Link to={redirectUrl} className='underline text-xl'>Back</Link>
            </div>
        </div>
    )
}