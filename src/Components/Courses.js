import {useEffect, useState} from "react";
import {getData} from "../ApiCalls/apis";
import {useParams} from "react-router";
import Navbar from "./Navbar";
import CourseCard from "./Layouts/CourseCard";
import NotFound from "./Layouts/NotFound";
import Filters from "./Layouts/Filters";
import Pagination from "./Layouts/Pagination";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Loader from "./Layouts/Loader";
import Footer from "./Footer";
export default function Courses() {
    const { filters } = useSelector(state => state.filters);
    const {categoryId} = useParams();
    const [courses, setCourses] = useState(null);
    const [category, setCategory] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            const queryParams = filters && new URLSearchParams(filters).toString();
            if(categoryId) {
                setLoader(true);
                const coursesList = filters ? await getData('/categories/'+categoryId+'/courses?'+queryParams)
                    : await getData('/categories/'+categoryId+'/courses');
                !coursesList.error && setCourses(coursesList);

                const categoryDetails = await getData('/categories/'+categoryId);
                !categoryDetails.error && setCategory(categoryDetails);
                setLoader(false);
            } else {
                setLoader(true);
                const coursesList = await getData('/courses?'+queryParams);
                !coursesList.error && setCourses(coursesList);
                setLoader(false);
            }
        })();

        console.log(courses);
    }, [filters]);

    return (
        <>
            <Navbar />
            <div className='flex gap-8'>
                <div className='bg-cyan-700 text-white w-1/5 h-[89vh] fixed'>
                    <Filters />
                </div>
                {!loader ? <div className='ml-[22%]'>
                    <div className='mt-8'>
                        <h2 className='text-3xl text-bold'>{category && category.name} <span className="text-cyan-700">Courses</span></h2>
                    </div>
                    <div className='flex justify-start gap-4 mt-8 m-auto flex-wrap'>
                        {courses && courses.items && courses.items.length > 0 && courses.items.map(item => {
                            return (
                                <Link to={'/courses/'+item._id} key={item._id}>
                                    <CourseCard course={item}/>
                                </Link>
                            )
                        })}
                        {!courses?.items?.length && <div className='absolute top-1/2 left-1/2 -translate-y-1/2'>
                            <NotFound message='No Course Found.' redirectUrl='/' />
                        </div>}
                    </div>
                </div> : <Loader  className='absolute top-1/2 left-[60%] -transform-x-1/2 -transform-y-1/2' /> }
            </div>
            {courses && !loader && <div className='ml-[22%] mt-16 mb-16'>
                <Pagination count={courses ? courses.count : 0} limit='5' />
            </div>}
            <Footer />
        </>
    );
}