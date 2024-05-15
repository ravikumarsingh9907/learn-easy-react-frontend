import Button from "../Layouts/Button";
import Logo from "../Layouts/Logo";
import {useEffect, useRef, useState} from "react";
import {getData, postDataMultiPartData, updateData} from "../../ApiCalls/apis";
import {setAlertMessage, showAlert} from "../../Redux/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import Alert from "../Layouts/Alert";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import Loader from "../Layouts/Loader";

export default function AddCategory({ action }) {
    const name = useRef(null);
    const dispatch = useDispatch();
    const { message, isVisible } = useSelector(state => state.alert);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            (async () => {
                const result = await getData('/categories/'+id);
                if(!result.error) {
                    setCategory(result);
                }
            })();
        }
    }, [id]);

    const handleImage = (event) => {
        if(event.target.files) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitForm = async () => {
        const formData = new FormData();
        formData.append('categoryName', name.current.value);
        if(image) {
            formData.append('image', image);
        }
        setLoader(true);
        const result = id ? await updateData('/categories/' + id, formData) : await postDataMultiPartData('/categories', formData);

        dispatch(setAlertMessage(result));
        dispatch(showAlert(true));
        setLoader(false);

        !result.error && navigate('/admin/categories');
    }

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <div className='bg-gray-100'>
                <div className="nav-wrapper flex items-center justify-between p-4 w-11/12 m-auto">
                    <Logo size='w-32'/>
                </div>
            </div>
            <div className='relative'>
                <div className='absolute left-1/2 -translate-x-1/2'>
                    <h2 className='text-center mt-4 text-2xl font-medium'>{action}</h2>
                    <ul className='flex flex-col gap-4'>
                        <li className='flex flex-col w-72 gap-1'>
                            <label htmlFor='name'>Name</label>
                            <input id='name' ref={name} type='text' className='text-lg p-2 border-2 rounded-md outline-none' value={category && category.name} readOnly={false} />
                        </li>
                        <li className='flex flex-col w-72 gap-1'>
                            <label htmlFor='image'>Upload Banner</label>
                            <input id='image' type='file' className='border-2 p-2 rounded-md outline-none' onChange={handleImage}/>
                        </li>
                    </ul>
                    <div className='flex gap-4 items-center mt-4'>
                        <Button className='text-lg py-2 px-4 rounded-md bg-cyan-700 text-white' onClick={handleSubmitForm}>{loader && <Loader />} Submit</Button>
                        <Button className='text-lg py-2 px-4 rounded-md border-2'><Link to='/admin/categories'>Cancel</Link></Button>
                    </div>
                </div>
            </div>
        </>
    );
}