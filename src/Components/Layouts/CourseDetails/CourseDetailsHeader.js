export default function CourseDetailsHeader({course, averageReview, reviews}) {
    return (
        <div className='bg-cyan-700 px-8 py-16'>
            <div className='w-4/5 m-auto flex justify-between'>
                <div className=''>
                    {course && <div className='flex flex-col gap-4'>
                        <h2 className='font-bold text-4xl text-white'>{course.title}</h2>
                        <p className='text-lg text-gray-100 w-5/6'>{course.description}</p>
                        <div className='flex items-center gap-4'>
                            <img src={course?.platform?.image} alt='course platform logo' className='w-20'/>
                            <div className='flex flex-row items-center gap-2'>
                                <p className='text-2xl text-bold text-orange-400'>{averageReview ? averageReview.average : 0}</p>
                                <div className=''>
                                    { averageReview && averageReview.stars.length > 0 && averageReview.stars.map(() => {
                                        return <i className='bx bxs-star text-xl text-orange-400'></i>
                                    })
                                    }
                                    {
                                        averageReview.average > averageReview.stars.length && <i className='bx bxs-star-half text-xl text-orange-400'></i>
                                    }
                                </div>
                                <p className='text-lg text-white text-thin'>
                                    ({reviews && reviews.length} ratings)
                                </p>
                            </div>
                        </div>
                        <div className=''>
                            <p className='text-white text-lg '>Created by <span className='underline text-orange-400 text-bold'>{course.instructor}</span></p>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <div className='flex items-center gap-1 text-white'>
                                <i className='bx bx-globe text-xl' ></i>
                                <p className='text-lg'>{course?.language}</p>
                            </div>
                            <div className='flex items-center gap-1 text-white'>
                                <i className='bx bx-rupee text-xl' ></i>
                                <p className='text-lg'>{course?.price}</p>
                            </div>
                            <div className='flex items-center gap-1 text-white'>
                                <i className='bx bxs-videos text-xl'></i>
                                <p className='text-lg'>{course?.type}</p>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className=''>
                    { course && <div className='p-2 rounded bg-cyan-900'>
                        <img src={course?.image} alt='course banner' className='w-96 rounded'/>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}