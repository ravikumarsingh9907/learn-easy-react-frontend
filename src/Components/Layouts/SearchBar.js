import Button from "./Button";
export default function SearchBar(props) {
    return (
        <div className={props.className}>
            <input type='text' placeholder={props.placeholder} className='p-2 text-lg w-96 rounded-lg bg-white border-2 border-gray-300 outline-none' />
            <Button type='submit' onClick={props.onClick}><i className='bx bx-search text-2xl bg-cyan-700 text-white py-2 px-3 rounded-full'></i></Button>
        </div>
    )
}