import SearchBar from "../Layouts/SearchBar";
import {Link} from "react-router-dom";
import Button from "../Layouts/Button";
import {useEffect, useState} from "react";
import {deleteData, getData} from "../../ApiCalls/apis";
import {useDispatch, useSelector} from "react-redux";
import {setAlertMessage, showAlert} from "../../Redux/alertSlice";
import CategoryCard from '../Layouts/Card';
import Alert from "../Layouts/Alert";
import Logo from "../Layouts/Logo";
import PageNotFound from "../Layouts/PageNotFound";
import useCheckIsAdmin from "../../Hooks/useCheckIsAdmin";

export default function Categories() {
    const [categories, setCategories] = useState(null);
    const dispatch = useDispatch();
    const {message, isVisible} = useSelector(state => state.alert);
    const { isAdmin } = useCheckIsAdmin();

    useEffect(() => {
        (async () => {
            const result = await getData('/categories');
            if(result.error) {
                dispatch(showAlert(true));
                dispatch(setAlertMessage(result));
            } else {
                setCategories(result);
            }
        })();
    }, []);

    const deleteCategory = async (e) => {
        dispatch(showAlert(true));
        dispatch(setAlertMessage({error: 'Category deleting...'}));
        const result = await deleteData('/categories/'+e.target.value);
        dispatch(showAlert(true));
        dispatch(setAlertMessage(result));

        const filterCategory = categories.filter((category) => {
            return category._id !== result.id;
        });

        setCategories(filterCategory);
    }

    return(
        <>
            {isVisible && <Alert message={message}/>}
            {isAdmin && <div className=''>
                <div className='bg-gray-100'>
                    <div className="nav-wrapper flex items-center justify-between p-4 w-11/12 m-auto">
                        <Logo size='w-32'/>
                        <SearchBar className='flex gap-2 items-center' placeholder='Search Categories...'/>
                    </div>
                </div>
                <div className='w-11/12 m-auto mt-4 flex gap-4'>
                    <Button className='px-4 py-2 rounded-md bg-cyan-700 text-white'>
                        <Link to='/admin/categories/add' className='text-lg'>Add Category</Link>
                    </Button>
                    <Button className='px-4 py-2 rounded-md border-2'>
                        <Link to='/admin' className='text-lg'>Back</Link>
                    </Button>
                </div>
                <div className='w-11/12 m-auto'>
                    <div className='mt-8 text-2xl font-medium'>
                        <h2 className=''>Categories</h2>
                    </div>
                    <div className='flex gap-4 flex-wrap mt-2'>
                        {categories && categories.length && categories.map(category => {
                            return (
                                <div className='relative border-2 rounded-lg p-2 text-right' key={category._id}>
                                    <CategoryCard category={category}/>
                                    <Button className='border-2 py-2 px-4 rounded-md mt-2'>
                                        <Link to={'/admin/categories/' + category._id}>Update</Link>
                                    </Button>
                                    <Button className='py-2 px-4 rounded-md mt-2 ml-2 bg-red-500 text-white'
                                            value={category._id} onClick={deleteCategory}>Delete</Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>}
            {!isAdmin && <PageNotFound />}
        </>
    )
}