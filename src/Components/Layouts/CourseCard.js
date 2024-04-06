import Button from "./Button";

export default function CourseCard() {
    return (
        <div className="flex items-center gap-4 rounded-lg border-2 p-2">
            <div className="w-52 overflow-hidden rounded-lg">
                <img className="w-full" src="https://res.cloudinary.com/dupvoqioo/image/upload/v1652802197/Courses/fp6apismikjsl99o7epx.png" alt="course platform banner" />
            </div>
            <div className="w-80">
                <h2 className="text-xl text-bold text-gray-800">The Web Developer Bootcamp 2022</h2>
                <ul className="flex gap-8 text-gray-500">
                    <li className="font-medium">Udemy</li>
                    <li className="font-medium list-disc">Colt steele</li>
                </ul>
                <div className="flex items-center">
                    <i className='bx bxs-star text-gray-600'></i>
                    <p className="text-lg text-bold text-gray-600">4.7 <span className="text-lg text-black font-thin">(500)</span></p>
                </div>
                <Button className="py-1 px-2 rounded-lg mt-4 bg-yellow-100">FREE</Button>
            </div>
        </div>
    )
}