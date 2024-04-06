import logo from '../Utils/learneasy.png';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm, toggleProfileOptions } from '../Redux/formSlice';
import Button from './Layouts/Button';

export default function Navbar() {
    const dispatch = useDispatch();
    const { isProfileOptions, toggle } = useSelector(state => state.form);

    const handleForm = () => {
        dispatch(toggleForm(true));
    }

    const handleProfileOptions = () => {
        dispatch(toggleProfileOptions(!isProfileOptions))
    }

    return (
        <div className='bg-gray-100'>
            <div className="nav-wrapper flex items-center justify-between p-4 w-5/6 m-auto">
                <div className="logo">
                    <img className='w-32' src={logo} alt='learn-easy' />
                </div>
                <div className="max-[768px]:hidden search xl:mr-96 flex items-center gap-2">
                    <input type='text' placeholder='Search courses...' className='p-2 text-lg w-96 rounded-lg bg-white border-2 border-gray-300 outline-none' />
                    <button type='submit'><i className='bx bx-search text-2xl bg-cyan-700 text-white py-2 px-3 rounded-full'></i></button>
                </div>
                <div className="profile relative">
                    <div className='login flex items-center gap-4'>
                        <Button type='submit' className='min-[768px]:hidden'>
                            <i className='bx bx-search text-3xl bg-cyan-700 text-white py-3 px-4 rounded-full pt-4'></i>
                        </Button>
                        {!toggle ? <Button className='text-xl px-4 py-2 border-2 rounded-lg' onClick={handleForm}>Sign In</Button>
                            : <Button className='text-xl px-4 py-2 border-2 rounded-lg opacity-40' onClick={handleForm}>Sign In</Button>}
                    </div>
                    {/*<div className='porfile-icon flex items-center gap-4'>*/}
                    {/*    <Button type='submit' className='min-[768px]:hidden' ><i className='bx bx-search text-2xl bg-cyan-700 text-white py-3 px-4 rounded-full pt-4'></i></Button>*/}
                    {/*    <Button onClick={handleProfileOptions}><i className='bx bx-user-circle text-6xl text-cyan-700' ></i></Button>*/}
                    {/*</div>*/}
                    {isProfileOptions && <ul className='absolute top-24 right-0 rounded-lg text-white z-50 overflow-hidden'>
                        <li className='text-lg leading-8 bg-cyan-700 hover:bg-slate-600 p-4 pr-16 cursor-pointer'>Profile</li>
                        <li className='text-lg leading-8 bg-cyan-700 hover:bg-slate-600 p-4 pr-16 cursor-pointer'>Bookmarks</li>
                        <li className='text-lg leading-8 bg-cyan-700 hover:bg-slate-600 p-4 pr-16 cursor-pointer'>Suggest</li>
                        <li className='text-lg leading-8 bg-cyan-700 hover:bg-slate-600 p-4 pr-16 cursor-pointer'>Sign out</li>
                    </ul>}
                </div>
            </div>
        </div>
    );
}