import Navbar from "./Navbar";
import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../ApiCalls/apis";
import CourseDetailsHeader from "./Layouts/CourseDetails/CourseDetailsHeader";
import Details from "./Layouts/CourseDetails/Details";
import Button from "./Layouts/Button";
import {Link} from "react-router-dom";
import Review from "./Layouts/Review";
import NotFound from "./Layouts/NotFound";
import Footer from "./Footer";

function averageRating(reviews) {
    let total = 0;
    reviews && reviews.length > 0 && reviews.forEach(review => {
        total += review.rating;
    });

    let average = 0;
    if(reviews && reviews.length > 0) {
        average = (total / reviews.length).toFixed(1);
    }

    let stars = [];
    for (let i = 0; i < Math.floor(average); i++) {
        stars.push(i);
    }

    return {average, stars};
}

export default function CourseDetails() {
    const {courseId} = useParams();
    const [course, setCourse] = useState();
    const [reviews, setReviews] = useState();

    const averageReview = useMemo(() => averageRating(reviews),[reviews]);

    useEffect(() => {
        (async () => {
            const courseDetails = await getData('/courses/'+courseId);
            !courseDetails.error && setCourse(courseDetails);

            const reviewsList = await getData('/courses/'+courseId+'/reviews');
            !reviewsList.error && setReviews(reviewsList);
        })();
    }, []);


    return (
        <>
            <Navbar />
            <CourseDetailsHeader course={course} averageReview={averageReview} reviews={reviews}/>
            <div className='w-4/5 m-auto px-8 flex mt-4 justify-between'>
                <div>
                    <Details />
                    <div className='mt-8 mb-32'>
                        <div className='mb-4'>
                            <h2 className='text-2xl text-bold'>Reviews</h2>
                        </div>
                        <div className='flex flex-col gap-8 p-2 rounded border-2 relative'>
                            {reviews && reviews?.length > 0 && reviews?.map(review => {
                                return <Review review={review} key={review._id}/>
                            })}
                            {!reviews?.length && <div className='flex justify-center items-center'>
                                <NotFound message='No Review Found.'/>
                            </div>}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <Button className='py-2 px-4 rounded bg-cyan-700 flex items-center gap-1 text-center'>
                        <Link to={course && course.url} className='text-lg text-white'>Go to course</Link>
                        <i className='bx bx-link-external text-white text-lg' ></i>
                    </Button>
                    <Button className='py-2 px-4 rounded border-2 flex items-center gap-2'>
                        <i className='bx bx-heart text-xl text-cyan-700' ></i>
                        <Link to='' className='text-lg text-cyan-700'>Bookmark</Link>
                    </Button>
                </div>
            </div>
            <Footer />
        </>
    );
}