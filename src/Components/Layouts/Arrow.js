export default function Arrow({direction, classProp}) {
    return (
        <div className={classProp}>
            <button className="py-4 px-5 border-2 border-gray-700 rounded-full bg-white opacity-40 hover:opacity-100 hover:border-cyan-600 hover:text-cyan-700">
                {direction === 'right' && <i className='bx bx-chevron-right text-2xl'></i>}
                {direction === 'left' && <i className='bx bx-chevron-left text-2xl'></i>}
            </button>
        </div>
    );
}