import { useDispatch, useSelector } from 'react-redux';
import { toggleForm, toggleProfileOptions } from '../Redux/formSlice';
import Button from './Layouts/Button';
import {useEffect, useState} from "react";
import {getData} from "../ApiCalls/apis";
import {setUser} from "../Redux/userSlice";
import SearchBar from "./Layouts/SearchBar";
import Logo from "./Layouts/Logo";

export default function Navbar() {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isProfileOptions, toggle } = useSelector(state => state.form);

    useEffect(() => {
        (async () => {
            const user = await getData('/users/me');
            if(!user.error) {
                setIsLoggedIn(true);
            } else {
                dispatch(setUser(user));
            }
        })();
    }, [isLoggedIn]);

    const handleForm = () => {
        dispatch(toggleForm(true));
    }

    const handleProfileOptions = () => {
        dispatch(toggleProfileOptions(!isProfileOptions))
    }

    return (
        <div className='bg-gray-100'>
            <div className="nav-wrapper flex items-center justify-between p-4 w-5/6 m-auto">
                <Logo size='w-32'/>
                <SearchBar className="max-[768px]:hidden search xl:mr-96 flex items-center gap-2" placeholder='Search Courses...'/>
                <div className="profile relative">
                    {!isLoggedIn && <div className='login flex items-center gap-4'>
                        <Button type='submit' className='min-[768px]:hidden'>
                            <i className='bx bx-search text-3xl bg-cyan-700 text-white py-3 px-4 rounded-full pt-4'></i>
                        </Button>
                        {!toggle ? <Button className='text-xl px-4 py-2 border-2 rounded-lg' onClick={handleForm}>Sign
                                In</Button>
                            : <Button className='text-xl px-4 py-2 border-2 rounded-lg opacity-40' onClick={handleForm}>Sign
                                In</Button>}
                    </div>}
                    { isLoggedIn && <div className='porfile-icon flex items-center gap-4'>
                        <Button type='submit' className='min-[768px]:hidden'><i
                            className='bx bx-search text-2xl bg-cyan-700 text-white py-3 px-4 rounded-full pt-4'></i></Button>
                        <Button onClick={handleProfileOptions}><i
                            className='bx bx-user-circle text-6xl text-cyan-700'></i></Button>
                    </div>}
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