import parse from 'html-react-parser';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {useFormik} from "formik";
import { setFilterData } from "../../Redux/filterSlice";

function printStars(num) {
    let jsxData = '';
    while(num > 0) {
        jsxData += '<i className=\'bx bxs-star\'></i>';
        num--;
    }

    return jsxData;
}
export default function Filters() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            sort: '',
            rating: [],
            price: [],
            limit: 5,
            skip: 0
        }
    });

    useEffect(() => {
        dispatch(setFilterData(formik.values));
    }, [formik.values, dispatch]);

    return (
        <div className='ml-20 mt-8'>
            <form className=''>
                <div className='mb-4'>
                    <p className='text-lg mb-2 font-medium'>Sort by</p>
                    <ul className='pl-4'>
                        <li className='flex gap-2'>
                            <input id='name' name='sort' type='radio' value='title' onChange={formik.handleChange}/>
                            <label htmlFor='name' className='text-lg'>Name</label>
                        </li>
                        <li className='flex gap-2'>
                            <input id='createdAt' name='sort' type='radio' value='createdAt' onChange={formik.handleChange}/>
                            <label htmlFor='createdAt' className='text-lg'>Latest</label>
                        </li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='text-lg mb-2 font-medium'>Rating</p>
                    <ul className='pl-4'>
                        <li className='mb-2'>
                            <label htmlFor='star5' className='text-lg flex gap-2'>
                                <input id='star5' name='rating' type='checkbox' value='5' onChange={formik.handleChange}/>
                                <div>
                                    {parse(printStars(5))}
                                </div>
                            </label>
                        </li>
                        <li className='mb-2'>
                            <label htmlFor='star4' className='text-lg flex gap-2'>
                                <input id='star4' name='rating' type='checkbox' value='4' onChange={formik.handleChange}/>
                                <div>
                                    {parse(printStars(4))}
                                </div>
                            </label>
                        </li>
                        <li className='mb-2'>
                            <label htmlFor='star3' className='text-lg flex gap-2'>
                                <input id='star3' name='rating' type='checkbox' value='3' onChange={formik.handleChange}/>
                                <div>
                                    {parse(printStars(3))}
                                </div>
                            </label>
                        </li>
                        <li className='mb-2'>
                            <label htmlFor='star2' className='text-lg flex gap-2'>
                                <input id='star2' name='rating' type='checkbox' value='2' onChange={formik.handleChange}/>
                                <div>
                                    {parse(printStars(2))}
                                </div>
                            </label>
                        </li>
                        <li className='mb-2'>
                            <label htmlFor='star1' className='text-lg flex gap-2'>
                                <input id='star1' name='rating' type='checkbox' value='1' onChange={formik.handleChange}/>
                                <div>
                                    {parse(printStars(1))}
                                </div>
                            </label>
                        </li>
                    </ul>
                </div>
                <div className='mb-4'>
                    <p className='text-lg mb-2 font-medium'>Price</p>
                    <ul className='pl-4'>
                        <li className='mb-2'>
                            <label htmlFor='free' className='text-lg flex gap-2'>
                                <input id='free' name='price' type='checkbox' value='Free' onChange={formik.handleChange}/>
                                Free
                            </label>
                        </li>
                        <li className='mb-2'>
                            <label htmlFor='paid' className='text-lg flex gap-2'>
                                <input id='paid' name='price' type='checkbox' value='Paid' onChange={formik.handleChange}/>
                                Paid
                            </label>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    );
}