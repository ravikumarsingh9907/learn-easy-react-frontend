import {useEffect, useMemo, useReducer, useState} from "react";
import Button from "../Layouts/Button";
import {getData, postData} from "../../ApiCalls/apis";
import {useNavigate, useParams} from "react-router";
import Logo from "../Layouts/Logo";
import {useFormik} from "formik";
import Alert from "../Layouts/Alert";
import {useDispatch, useSelector} from "react-redux";
import {showAlert, setAlertMessage} from "../../Redux/alertSlice";

const updateInputField = (inputCount) => {
    const totalInput = [];
    for (let i = 0; i < inputCount; i++) {
        totalInput.push(i);
    }

    return totalInput;
}

let initialState = {knowledge: 1, prerequisites: 1};
const reducer = (state, action) => {
    switch (action.type) {
        case 'increment-know':
            return state.knowledge < 9 ? {...state, knowledge: state.knowledge + 1} : state;
        case 'decrement-know':
            return state.knowledge > 1 ? {...state, knowledge: state.knowledge - 1} : state;
        case 'increment-pre':
            return state.prerequisites < 9 ? {...state, prerequisites: state.prerequisites + 1} : state;
        case 'decrement-pre':
            return state.prerequisites > 1 ? {...state, prerequisites: state.prerequisites - 1} : state;
        default:
            return state;
    }
}

const prepareAndAddAboutCourse = (obj) => {
    const knowledge = [];
    const prerequisites = [];
    Object.keys(obj).forEach(item => {
        if(item.startsWith('knowledge')) {
            knowledge.push(obj[item]);
        }

        if(item.startsWith('prerequisites')) {
            prerequisites.push(obj[item]);
        }
    });

    return {knowledge, prerequisites};
}
export default function AboutCourse() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchAction = useDispatch();
    const [course, setCourse] = useState(null);
    const {courseId} = useParams();
    const [initialFormValue, setInitialFormValue] = useState({});
    const {isVisible, message} = useSelector(state => state.alert);
    const navigate = useNavigate();

    const totalKnowInputField = useMemo(() => updateInputField(state.knowledge), [state]);
    const totalPreInputField = useMemo(() => updateInputField(state.prerequisites), [state]);

    const formik = useFormik({
        initialValues: initialFormValue,
        onSubmit: async (values) => {
            const {knowledge, prerequisites} = prepareAndAddAboutCourse(values);
            const res = await postData('/courses/'+courseId+'/about-course', JSON.stringify({knowledge, prerequisites}));
            dispatchAction(showAlert(true));
            dispatchAction(setAlertMessage(res));
            !res.error && navigate('/admin/courses')
        }
    });
    const handleAddInput = (e) => {
        dispatch({type: e.target.value});
        const obj = {...initialFormValue};
        obj[e.target.previousSibling.name] = '';
        setInitialFormValue(obj);
    }
    const handleRemoveInput = (e) => {
        dispatch({type: e.target.value});
        const obj = {...initialFormValue};
        delete obj[e.target.previousSibling.previousSibling?.name];
        setInitialFormValue(obj);
        delete formik.values[e.target.previousSibling.previousSibling?.name]
    }

    useEffect(() => {
        (async () =>{
            const res = await getData('/courses/'+courseId);
            !res.error && setCourse(res);
        })()
    }, []);

    return (
        <>
            {isVisible && <Alert message={message}/>}
            <div className='bg-gray-100 sticky top-0'>
                <div className="nav-wrapper flex items-center justify-between p-4 w-5/6 m-auto">
                    <Logo size='w-32'/>
                </div>
            </div>
            <div className='pb-8'>
                <div className='text-center mt-8 mb-8'><p className='text-2xl text-bold'>{course && course.title}</p></div>
                <form className='absolute left-1/2 -translate-x-1/2 mt-4 pb-8' onSubmit={formik.handleSubmit}>
                    <div className=''>
                        <h2 className='text-bold text-xl mb-2'>What user will learn?</h2>
                        <ul className=''>
                            { totalKnowInputField && totalKnowInputField.map((_, index) => {
                                return (<li className='flex items-center gap-2'>
                                    <input type='text' name={'knowledge-'+ index} className='p-2 mb-2 text-lg border-2 rounded border-cyan-700 outline-none w-96' onChange={formik.handleChange}/>
                                    {index === totalKnowInputField.length - 1 && totalKnowInputField.length < 9 && <Button className='text-3xl pt-2 px-5 pb-3 rounded-full bg-cyan-700 text-white' value='increment-know' onClick={handleAddInput}>+</Button>}
                                    {index === totalKnowInputField.length -1 && totalKnowInputField.length > 1 && <Button className='text-3xl pt-1 px-5 pb-2 rounded-full text-cyan-700 border-2 border-cyan-700' value='decrement-know' onClick={handleRemoveInput}>-</Button>}
                                </li>)
                            })
                            }
                        </ul>
                    </div>
                    <div className='mt-16'>
                        <h2 className='text-bold text-xl mb-2'>Requirements</h2>
                        <ul className=''>
                            { totalPreInputField && totalPreInputField.map((_, index) => {
                                return (<li className='flex items-center gap-2'>
                                    <input type='text' name={'prerequisites-'+ index} className='p-2 mb-2 text-lg border-2 rounded border-cyan-700 outline-none w-96' onChange={formik.handleChange}/>
                                    {index === totalPreInputField.length - 1 && totalPreInputField.length < 9 && <Button className='text-3xl pt-2 px-5 pb-3 rounded-full bg-cyan-700 text-white' value='increment-pre' onClick={handleAddInput}>+</Button>}
                                    {index === totalPreInputField.length - 1 && totalPreInputField.length > 1 && <Button className='text-3xl pt-1 px-5 pb-2 rounded-full text-cyan-700 border-2 border-cyan-700' value='decrement-pre' onClick={handleRemoveInput}>-</Button>}
                                </li>)
                            })
                            }
                        </ul>
                    </div>
                    <button type='submit' className='py-2 px-4 rounded bg-cyan-700 text-white mt-4'>Submit</button>
                </form>
            </div>
        </>
    )
}