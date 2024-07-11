export default function SearchSuggestionCard({course}) {
    return (
      <div className="p-2 border-b-2 text-white">
          {course && <div className="flex gap-2">
              <div className='h-16 overflow-hidden rounded'>
                  <img src={course.image} alt='course banner' className="w-full h-full"/>
              </div>
              <div className="">
                  <h2 className="font-bold">{course.title}</h2>
                  <p>{course.instructor}</p>
              </div>
          </div>}
      </div>
    );
}