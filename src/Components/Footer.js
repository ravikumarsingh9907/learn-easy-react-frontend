import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <div className='p-8 bg-gray-100 absolute bottom-0 w-full'>
            <div className='flex justify-center gap-2 items-center'>
                <h2 className='text-lg font-medium'>Made with love by</h2>
                <Link to='https://www.linkedin.com/in/ravi-kumar-b21592175/' target='_blank' className='underline text-cyan-700 font-bold text-lg'>Ravi Kumar</Link>
            </div>
        </div>
    )
}