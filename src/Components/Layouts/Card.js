import Button from "./Button";
import Img from '../../Utils/category.jpg';

export default function CardLayout() {
    return(
        <div className="w-72 flex-none rounded-lg bg-white overflow-hidden p-2 border-2">
            <div className="w-full overflow-hidden">
                <img src={Img} alt="banner" className="w-full rounded-lg"/>
            </div>
            <div className="p-4 pt-0">
                <h2 className="text-cyan-900 text-bold py-2 text-lg tracking-wide">Web Development</h2>
            </div>
        </div>
    );
}