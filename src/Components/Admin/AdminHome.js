import Logo from "../Layouts/Logo";
import AdminCard from "./AdminCard";
import PageNotFound from "../Layouts/PageNotFound";
import useCheckIsAdmin from "../../Hooks/useCheckIsAdmin";

export default function Admin() {
    const list = ['categories', 'courses', 'platforms', 'users'];
    const {isAdmin } = useCheckIsAdmin();

    return (
        <>
            <div className='bg-gray-100'>
                <div className="nav-wrapper flex items-center justify-between p-4 w-5/6 m-auto">
                    <Logo size='w-32'/>
                </div>
            </div>
            { isAdmin ? <div className='w-4/5 m-auto mt-8'>
                <div className='flex gap-4'>
                    {list.map((item) => {
                        return <AdminCard name={item}/>
                    })}
                </div>
            </div> : <PageNotFound />}
        </>
    );
}