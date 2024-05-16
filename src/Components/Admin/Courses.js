import Alert from "../Layouts/Alert";
import Logo from "../Layouts/Logo";
import SearchBar from "../Layouts/SearchBar";
import Button from "../Layouts/Button";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteData, getData} from "../../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../../Redux/alertSlice";
import CourseCard from "../Layouts/CourseCard";

export default function Courses() {
    const{ message, isVisible} = useSelector(state => state.alert);
    const [courses, setCourses] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const result = await getData('/courses');
            if(result.error) {
                dispatch(showAlert(true));
                dispatch(setAlertMessage(result));
            } else {
                setCourses(result);
            }
        })();
    }, []);

    const handleDeleteCourse = async (e) => {
        showAlert(true);
        setAlertMessage({error: 'Deleting course...'});
        const course = await deleteData('/courses/'+ e.target.value);
        showAlert(true);
        setAlertMessage(course);
    }

    return(
        <>
            {isVisible && <Alert message={message}/>}
            <div className=''>
                <div className='bg-gray-100'>
                    <div className="nav-wrapper flex items-center justify-between p-4 w-11/12 m-auto">
                        <Logo size='w-32'/>
                        <SearchBar className='flex gap-2 items-center' placeholder='Search Categories...'/>
                    </div>
                </div>
                <div className='w-11/12 m-auto mt-4 flex gap-4'>
                    <Button className='px-4 py-2 rounded-md bg-cyan-700 text-white'>
                        <Link to='/admin/courses/add' className='text-lg'>Add Course</Link>
                    </Button>
                    <Button className='px-4 py-2 rounded-md border-2'>
                        <Link to='/admin' className='text-lg'>Back</Link>
                    </Button>
                </div>
                <div className='w-11/12 m-auto'>
                    <div className='mt-8 text-2xl font-medium'>
                        <h2 className=''>Courses</h2>
                    </div>
                    <div className='flex gap-4 flex-wrap mt-2'>
                        {courses?.items?.length && courses.items.map(course => {
                            return (
                                <div className='relative border-2 rounded-lg p-2 text-right' key={course._id}>
                                    <CourseCard course={course}/>
                                    <Button className='border-2 py-2 px-4 rounded-md mt-2'>
                                        <Link to={'/admin/courses/' + course._id}>Update</Link>
                                    </Button>
                                    <Button className='py-2 px-4 rounded-md mt-2 ml-2 bg-red-500 text-white' value={course._id} onClick={handleDeleteCourse} >Delete</Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}