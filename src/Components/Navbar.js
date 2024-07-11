import { useDispatch, useSelector } from 'react-redux';
import { toggleForm, toggleProfileOptions } from '../Redux/formSlice';
import Button from './Layouts/Button';
import {useEffect, useState} from "react";
import {getData, postData} from "../ApiCalls/apis";
import {setUser} from "../Redux/userSlice";
import SearchBar from "./Layouts/SearchBar";
import Logo from "./Layouts/Logo";
import Cookies from "js-cookie";
import {setAlertMessage, showAlert} from "../Redux/alertSlice";

export default function Navbar() {
    const dispatch = useDispatch();
    const { isProfileOptions, toggle } = useSelector(state => state.form);
    const { isLoggedIn } = useSelector(state => state.user);

    const handleForm = () => {
        window.scrollTo(0, 0);
        dispatch(toggleForm(true));
    }

    const handleSignOut = async () => {
        const result = await postData('/logout');

        if(result.success) {
            Cookies.remove('token');
            window.location.reload();
        } else {
            dispatch(setAlertMessage(result));
            dispatch(showAlert(true));
        }
    }

    const handleProfileOptions = () => {
        dispatch(toggleProfileOptions(!isProfileOptions))
    }

    return (
        <div className='bg-gray-100 sticky top-0 z-40'>
            <div className="nav-wrapper flex items-center justify-between p-4 w-4/5 m-auto">
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
                        <li className='text-lg leading-8 bg-cyan-700 hover:bg-slate-600 p-4 pr-16 cursor-pointer' onClick={handleSignOut}>Sign out</li>
                    </ul>}
                </div>
            </div>
        </div>
    );
}