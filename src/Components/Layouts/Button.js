import Loader from "./Loader";
export default function Button(props) {
    return (
        <button {...props}>{props.children}</button>
    );
};