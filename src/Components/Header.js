import headerBanner from '../Utils/header-banner.png';
import Button from './Layouts/Button';

export default function Header() {
    return (
        <div className="bg-no-repeat w-5/6 m-auto bg-right" style={{ backgroundImage: `url(${headerBanner})` }}>
            <div className='py-48 backdrop-filter'>
                <h2 className="text-5xl font-bold p-2">Your only <span className='text-cyan-700'>learning</span> partner</h2>
                <p className="text-2xl text p-2">Get the best resources for learning</p>
                <Button className="my-4 mx-3 text-xl px-3 py-2 rounded-lg border-2 border-cyan-700">
                    Explore
                    <i className='bx bx-chevron-right'></i>
                </Button>
            </div>
        </div>
    );
}