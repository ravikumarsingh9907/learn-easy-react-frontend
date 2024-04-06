import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ForgotPassword from "./Components/ForgotPassword";
import OtpVerify from "./Components/OtpVerify";
import {useEffect} from "react";
import {showAlert, setAlertMessage} from "./Redux/alertSlice";
import {useDispatch, useSelector} from "react-redux";
import NewPassword from "./Components/NewPassword";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path:'/forgot-password',
    element: <ForgotPassword />
  },
  {
    path:'/forgot-password/verify-user/:token',
    element: <OtpVerify />
  },
  {
    path:'/forgot-password/verify-user/:token/new-password',
    element: <NewPassword />
  }
]);

function App() {
  const dispatch = useDispatch();
  const { isVisible } = useSelector(state => state.alert);

  useEffect(() => {
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