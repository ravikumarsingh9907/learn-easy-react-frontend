import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import OtpVerify from "./Components/OtpVerify";
import {useEffect} from "react";
import {showAlert, setAlertMessage} from "./Redux/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import NewPassword from "./Components/NewPassword";
import Admin from "./Components/Admin/AdminHome";
import AdminCategories from "./Components/Admin/Categories";
import AddCategory from "./Components/Admin/AddCategory";
import AdminCourses from "./Components/Admin/Courses";
import AddCourse from "./Components/Admin/AddCourse";
import AdminPlatform from './Components/Admin/Platforms';
import Courses from "./Components/Courses";
import CourseDetails from "./Components/CourseDetails";
import AboutCourse from "./Components/Admin/AboutCourse";
import {getData} from "./ApiCalls/apis";
import {setIsLoggedIn} from "./Redux/userSlice";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path:'/forgot-password/verify-user/:token',
    element: <OtpVerify />
  },
  {
    path:'/forgot-password/verify-user/:token/new-password',
    element: <NewPassword />
  },
  {
    path: '/categories/:categoryId/courses',
    element: <Courses />
  },
  {
    path: '/courses/:courseId',
    element: <CourseDetails />
  },
  {
    path:'/admin',
    element: <Admin />
  },
  {
    path:'/admin/categories',
    element: <AdminCategories />
  },
  {
    path:'/admin/categories/:id',
    element: <AddCategory action='Update Category' />
  },
  {
    path:'/admin/categories/add',
    element: <AddCategory action='Add Category' />
  },
  {
    path:'/admin/courses',
    element: <AdminCourses />
  },
  {
    path:'/admin/courses/add',
    element: <AddCourse />
  },
  {
    path:'/admin/courses/:courseId/about-course',
    element: <AboutCourse />
  },
  {
    path:'/admin/platforms',
    element: <AdminPlatform />
  },
]);

function App() {
  const dispatch = useDispatch();
  const { isVisible } = useSelector(state => state.alert);

  useEffect(() => {
    (async () => {
      const result = await getData('/users/me');
      result?.success && dispatch(setIsLoggedIn(true));
    })();

    const timeOut = setTimeout(() => {
      dispatch(showAlert(false));
      dispatch(setAlertMessage(null));
    }, 5000);

    return () => clearTimeout(timeOut);
  }, [isVisible]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;