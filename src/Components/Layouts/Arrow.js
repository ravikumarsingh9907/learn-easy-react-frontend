export default function Arrow(props) {
    return (
        <div {...props}>
            <button className="py-40 text-white">
                {props.direction === 'right' && <i className='bx bx-chevron-right text-5xl bg-black bg-opacity-40 rounded-full'></i>}
                {props.direction === 'left' && <i className='bx bx-chevron-left text-5xl bg-black bg-opacity-40 rounded-full'></i>}
            </button>
        </div>
    );
}