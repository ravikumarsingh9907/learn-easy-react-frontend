import logo from "../../Utils/learneasy.png";
import {Link} from "react-router-dom";
export default function Logo({size}) {
    return (
        <div className="logo">
            <Link to='/'>
                <img className={size} src={logo} alt='learn-easy' />
            </Link>
        </div>
    )
}