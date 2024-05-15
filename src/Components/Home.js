import Header from "./Header";
import Navbar from "./Navbar";
import Authenticate from './SingInOut';
import {useSelector} from "react-redux";
import CategoryCard from './Layouts/Card';
import Arrow from "./Layouts/Arrow";
import CourseCard from "./Layouts/CourseCard";
import Alert from "./Layouts/Alert";
import {useEffect, useRef, useState} from "react";
import {getData} from "../ApiCalls/apis";
import { useDispatch} from "react-redux";
import {setAlertMessage} from "../Redux/alertSlice";
import {Link} from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { toggle } = useSelector(state => state.form);
    const { isVisible, message } = useSelector(state => state.alert);
    const [categories, setCategories] = useState(null);
    const [courses, setCourses ] = useState(null);
    const scrollElement = useRef(null);

    useEffect(() => {
        (async () => {
            const getCategories = await getData('/categories');
            if(getCategories.error) {
                dispatch(isVisible(true));
                dispatch(setAlertMessage(getCategories));
            } else {
                setCategories(getCategories);
            }
        })();

        (async () => {
            const getCourses = await getData('/courses');
            if(getCourses.error) {
                dispatch(isVisible(true));
                dispatch(setAlertMessage(getCourses));
            } else {
                setCourses(getCourses);
            }
        })();
    }, []);

    const handleHorizontalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
        }, speed);
    };

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <Navbar />
            {toggle && <Authenticate />}
            <Header />
            <div className="bg-gray-100 pb-8 pt-8">
                <div className="pb-8 w-4/5 m-auto">
                    <div className="text-center p-4 mb-4">
                        <h2 className="text-3xl text-bold">Explore <span className="text-cyan-700">Categories</span></h2>
                    </div>
                    <div className="relative overflow-hidden">
                        <Arrow direction='left' className='absolute top-1/2 -left-0 -translate-y-1/2 bg-gradient-to-r from-gray-500'
                        onClick={() => {
                            handleHorizontalScroll(scrollElement.current, 10, 320, -10);
                        }}/>
                        <div className="flex justify-start gap-8 flex-nowrap overflow-hidden" ref={scrollElement}>
                            { categories && categories.length && categories.map((category) => {
                                return <CategoryCard  category={category} key={category._id} />
                            })}
                        </div>
                        <Arrow direction='right' className='absolute top-1/2 -right-0 -translate-y-1/2 bg-gradient-to-l from-gray-500' onClick={() => {
                            handleHorizontalScroll(scrollElement.current, 10, 320, 10);
                        }}/>
                    </div>
                </div>
                <div className='text-center mt-4'>
                    <Link to='/'><p className='underline text-lg tracking-wide text-cyan-700'>View all.</p></Link>
                </div>
            </div>
            <div className="pb-8 pt-8 w-4/5 m-auto">
                <div className="text-center p-4 mb-4">
                    <h2 className="text-3xl text-bold">Top <span className="text-cyan-700">Rated</span> Courses</h2>
                </div>
                <div className="relative overflow-hidden">
                    <Arrow direction='left' className='absolute top-1/2 -left-0 -translate-y-1/2 bg-gradient-to-r from-gray-500' />
                    <div className="flex gap-4 justify-start overflow-hidden">
                        {courses && courses.length && courses.map(course => {
                            return (
                                <Link to={'/courses/' + course._id}>
                                    <CourseCard course={course} key={course._id}/>
                                </Link>
                            )
                        })}
                    </div>
                    <Arrow direction='right' className='absolute top-1/2 -right-0 -translate-y-1/2 bg-gradient-to-l from-gray-500' />
                </div>
            </div>
        </>
    );
}