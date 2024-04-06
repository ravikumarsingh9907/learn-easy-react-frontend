import Header from "./Header";
import Navbar from "./Navbar";
import Authenticate from './SingInOut';
import {useSelector} from "react-redux";
import Card from './Layouts/Card';
import Arrow from "./Layouts/Arrow";
import CourseCard from "./Layouts/CourseCard";
import Alert from "./Layouts/Alert";

export default function Home() {
    const { toggle } = useSelector(state => state.form);
    const { isVisible, message } = useSelector(state => state.alert);

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <Navbar />
            {toggle && <Authenticate />}
            <Header />
            <div className="bg-gray-100 pb-4">
                <div className="pb-8 w-4/5 m-auto">
                    <div className="text-center p-4 mb-4">
                        <h2 className="text-3xl text-bold">Explore <span className="text-cyan-700">Categories</span></h2>
                    </div>
                    <div className="relative">
                        <Arrow direction='left' classProp='absolute top-1/2 -left-10 -translate-y-1/2' />
                        <div className="flex justify-start gap-8 flex-nowrap overflow-hidden">
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </div>
                        <Arrow direction='right' classProp='absolute top-1/2 -right-10 -translate-y-1/2' />
                    </div>
                </div>
            </div>
            <div className="pb-8 w-4/5 m-auto">
                <div className="text-center p-4 mb-4">
                    <h2 className="text-4xl text-bold">Top <span className="text-cyan-700">Rated</span> Courses</h2>
                </div>
                <div className="relative">
                    <Arrow direction='left' classProp='absolute top-1/2 -left-10 -translate-y-1/2' />
                    <div className="flex gap-4 justify-start overflow-hidden">
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                    </div>
                    <Arrow direction='right' classProp='absolute top-1/2 -right-10 -translate-y-1/2' />
                </div>
            </div>
        </>
    );
}