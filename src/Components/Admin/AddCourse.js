import Alert from "../Layouts/Alert";
import Logo from "../Layouts/Logo";
import Button from "../Layouts/Button";
import Loader from "../Layouts/Loader";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useFormik } from "formik";
import {getData, postDataMultiPartData} from "../../ApiCalls/apis";
import {useEffect, useState} from "react";
import { showAlert, setAlertMessage} from "../../Redux/alertSlice";
import {useNavigate} from "react-router";
import PageNotFound from "../Layouts/PageNotFound";

export default function AddCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, isVisible, } = useSelector(state => state.alert);
    const [platforms, setPlatforms] = useState(null);
    const [categories, setCategories]= useState(null);
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const { isAdmin } = useSelector(state => state.user);

    useEffect(() => {
        (async () => {
            const result = await getData('/platforms');
            if(!result.error) {
                setPlatforms(result);
            }

            const categories = await getData('/categories');

            if(!categories.error) {
                setCategories(categories);
            }
        })();
    }, []);

    const handleImageSubmit = async (event) => {
        const imageData = event.target.files[0];
        setImage(imageData);
    }

    const form = useFormik({
        initialValues: {
            title: '',
            category: '',
            type: '',
            platform: '',
            language: '',
            price: '',
            level: '',
            instructor: '',
            description: '',
            tags: '',
            url: '',
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            setLoader(true);
            formData.append('image', image);
            values && Object.keys(values).forEach(item => {
                formData.append(item, values[item]);
            });

            const course = await postDataMultiPartData('/courses', formData);

            dispatch(setAlertMessage(course));
            dispatch(showAlert(true));
            setLoader(false);
            !course.error && navigate('/admin/courses/'+course?.id+'/about-course');
        }
    });

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <div className='bg-gray-100'>
                <div className="nav-wrapper flex items-center justify-between p-4 w-11/12 m-auto">
                    <Logo size='w-32'/>
                </div>
            </div>
            {isAdmin && <div className='relative'>
                <div className='absolute left-1/2 -translate-x-1/2 grid'>
                    <h2 className='text-center mt-4 text-2xl font-medium'>Add Course</h2>
                    <form className='flex flex-col gap-4 grid grid-rows-6 grid-flow-col gap-4'
                          onSubmit={form.handleSubmit}>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='title'>Name</label>
                            <input id='title'
                                   name='title'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.title}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='category'>Category</label>
                            <select id='category'
                                    name='category'
                                    className='text-lg p-2 border-2 rounded-md outline-none'
                                    onChange={form.handleChange}
                            >
                                {categories && categories.map(category => {
                                    return <option
                                        className='bg-white'
                                        value={category._id}
                                        key={category._id}>{category.name}</option>
                                })}
                            </select>
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='description'>Description</label>
                            <input id='desription'
                                   name='description'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.description}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='type'>Type</label>
                            <input id='type'
                                   name='type'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.type}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='platform'>Language</label>
                            <select id='language'
                                    name='language'
                                    className='text-lg p-2 border-2 rounded-md outline-none'
                                    onChange={form.handleChange}
                            >
                                <option value='English'>English</option>
                                <option value='Hindi'>Hindi</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='platform'>Platform</label>
                            <select id='platform'
                                    name='platform'
                                    className='text-lg p-2 border-2 rounded-md outline-none'
                                    onChange={form.handleChange}
                            >
                                {platforms && platforms.map(platform => {
                                    return <option value={platform._id} key={platform._id}>{platform.name}</option>
                                })}
                            </select>
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='level'>Level</label>
                            <select id='level'
                                    name='level'
                                    className='text-lg p-2 border-2 rounded-md outline-none'
                                    onChange={form.handleChange}
                            >
                                <option value='Beginner'>Beginner</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advanced'>Advanced</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='price'>Price</label>
                            <select id='price'
                                    name='price'
                                    className='text-lg p-2 border-2 rounded-md outline-none'
                                    onChange={form.handleChange}
                            >
                                <option value='Free'>Free</option>
                                <option value='Paid'>Paid</option>
                                <option value='Free/Paid'>Free/Paid</option>
                            </select>
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='instructor'>Instructor</label>
                            <input id='instructor'
                                   name='instructor'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.instructor}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='url'>Course URL</label>
                            <input id='url'
                                   name='url'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.url}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='tags'>Course Tags</label>
                            <input id='tags'
                                   name='tags'
                                   type='text'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={form.handleChange}
                                   value={form.values.tags}
                            />
                        </div>
                        <div className='flex flex-col w-72 gap-1'>
                            <label htmlFor='image'>Course Banner</label>
                            <input id='image'
                                   name='image'
                                   type='file'
                                   className='text-lg p-2 border-2 rounded-md outline-none'
                                   onChange={handleImageSubmit}
                            />
                        </div>
                        <div className='flex gap-4 items-center mt-4'>
                            <Button className='text-lg py-2 px-4 rounded-md bg-cyan-700 text-white'
                                    type='submit'>{loader && <Loader/>} Submit</Button>
                            <Button className='text-lg py-2 px-4 rounded-md border-2'><Link
                                to='/admin/categories'>Cancel</Link></Button>
                        </div>
                    </form>
                </div>
            </div>}
            {!isAdmin && <PageNotFound />}
        </>
    );
}