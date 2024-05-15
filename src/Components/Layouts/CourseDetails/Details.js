import {useEffect, useState} from "react";
import {getData} from "../../../ApiCalls/apis";
import {useParams} from "react-router";

export default function Details({course}) {
    const [aboutCourse, setAboutCourse] = useState();
    const {courseId} = useParams();

    useEffect(() => {
        (async () => {
            const aboutCourseData = await getData('/courses/'+courseId+'/about-course');
            !aboutCourseData.error && setAboutCourse(aboutCourseData);
        })();
    }, []);

    return (
      <div className='flex flex-col gap-8'>
          <div className='p-4 rounded-lg border-2 border-gray-300 outline-none'>
              <h2 className='pb-4 text-2xl text-bold'>What you'll learn</h2>
              <ul className='grid grid-cols-2 gap-2'>
                  {aboutCourse && aboutCourse?.knowledge.map(item => {
                      return (
                        <li className='flex gap-1 w-[28rem]' key={item}>
                            <i className='bx bx-check text-2xl text-bold text-gray-400'></i>
                            <p className='text-lg text-gray-700'>{item}</p>
                        </li>
                      );
                  })}
              </ul>
          </div>
          <div className=''>
              <h2 className='pb-2 text-2xl text-bold'>Requirements</h2>
              <ul className='list-disc pl-6'>
                  {aboutCourse && aboutCourse?.prerequisites.map(item => {
                      return (
                          <li className='text-lg text-gray-700' key={item}>{item}</li>
                      );
                  })}
              </ul>
          </div>
      </div>
    );
}