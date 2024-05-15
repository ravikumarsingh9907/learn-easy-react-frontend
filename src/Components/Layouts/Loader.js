export default function Loader(props) {
    return (
        <button {...props}>
            <i className='bx bx-loader-alt animate-spin text-lg'></i>
        </button>
    );
}