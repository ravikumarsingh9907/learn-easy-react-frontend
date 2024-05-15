import {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFilterData} from "../../Redux/filterSlice";

function pageNumbers(count, limit) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(count / limit); i++) {
        pageNumbers.push(i);
    }

    return pageNumbers;
}
export default function Pagination({count, limit}) {
    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const pages = useMemo(() => pageNumbers(count, +limit), [count, limit]);

    const handleClickEvent = (e) => {
        const obj = {...filters, limit: +e.target.value * limit}
        dispatch(setFilterData(obj));
    }

    return (
      <div className='flex gap-2'>
          <ul className='flex gap-1'>
              {
                  pages && pages.map((item) => {
                      return <li className='px-4 py-2 border-2 border-cyan-700' key={item} onClick={handleClickEvent}>{item}</li>
                  })
              }
          </ul>
      </div>
    );
}