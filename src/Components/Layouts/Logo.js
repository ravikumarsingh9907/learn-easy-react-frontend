import logo from "../../Utils/learneasy.png";
export default function Logo({size}) {
    return (
        <div className="logo">
            <img className={size} src={logo} alt='learn-easy' />
        </div>
    )
}