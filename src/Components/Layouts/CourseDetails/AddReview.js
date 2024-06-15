import {useState} from "react";

const starsContainer = [1,2,3,4,5];
export default function AddReview() {
    const [stars, setStars] = useState(null);
    const [review, addReview] = useState(null);

    const handleOnStarClick = (e) => {
        setStars(e.target.value);
    }

    return (
        <form className=''>
            <div className=''>
                <h2 className=''>Rate</h2>
                {
                    starsContainer && starsContainer.map((star, index) => {
                        if (star < stars) {
                            return <button value={index} onClick={handleOnStarClick}><i className='bx bx-star bg-yellow-700'></i></button>
                        } else {
                            return <button value={index} onClick={handleOnStarClick}><i className='bx bx-star'></i></button>
                        }
                    })
                }
            </div>
        </form>
    );
}