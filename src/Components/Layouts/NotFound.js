import {Link} from "react-router-dom";

export default function NotFound({message, redirectUrl}) {
    return (
        <div className='w-96'>
            <div className='p-16 rounded-md text-center'>
                <h2 className='text-3xl font-medium'>{message}</h2>
                {redirectUrl && <Link to={redirectUrl} className='underline text-xl'>Back</Link>}
            </div>
        </div>
    )
}