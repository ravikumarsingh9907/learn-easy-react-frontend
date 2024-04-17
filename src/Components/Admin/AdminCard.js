import {Link} from "react-router-dom";
import {useState} from "react";

export default function AdminCard({name}) {
    const [isToggle, setIsToggle] = useState(false);

    const handleToggleOptions = () => {
        setIsToggle(!isToggle);
    }

    return (
        <div className='p-24 border-2 rounded-md relative'>
            <button className='absolute top-2 right-2' onClick={handleToggleOptions}><i className='text-xl bx bx-dots-vertical-rounded'></i></button>
            { isToggle && <ul className='text-sm absolute top-3 right-10'>
                <li className='border-2 border-b-0 py-2 px-4'>
                    <Link to='/admin/categories/add'>Add</Link>
                </li>
                <li className='border-2 py-2 px-4'>
                    <Link to='/admin/categories'>Edit</Link>
                </li>
            </ul>}
            <Link to='/admin/categories' className='text-2xl'>{name}</Link>
        </div>
    );
}