import Button from "./Button";

export default function CourseCard({course}) {
    console.log(course)
    return (
        <div className="rounded-lg border-2 p-2">
            <div className="w-72 overflow-hidden rounded-lg">
                <img className="w-full" src={course.image} alt="course platform banner" />
            </div>
            <div className="w-72">
                <h2 className="text-lg text-medium text-gray-800">{course.title}</h2>
                <ul className="flex gap-8 text-gray-500">
                    <li className="font-normal text-sm">{course.platform.name}</li>
                    <li className="font-normal list-disc text-sm">{course.instructor}</li>
                </ul>
                <div className="flex items-center">
                    <i className='bx bxs-star text-gray-600'></i>
                    <p className="text-md text-bold text-gray-600">4.7 <span className="text-md text-black font-thin">(500)</span></p>
                </div>
                <Button className="py-1 px-2 rounded-lg mt-4 bg-yellow-100 text-sm">FREE</Button>
            </div>
        </div>
    )
}