import {useMemo} from "react";

function printName(user) {
    const userSplit = user.split(' ');
    let name ='';
    for (let i = 0; i < userSplit.length; i++) {
        const splitWord = userSplit[i].split('');
        name += splitWord[0];
    }

    return name.charAt(0) + name.charAt(name.length -1);
}

function ratingArray(rating) {
    let stars = [];
    for (let i = 0; i < rating; i++) {
        stars.push(i);
    }

    return stars;
}
export default function ReviewContainer({review}) {
    const name = useMemo(() => review?.user?.name && printName(review.user.name), [review]);
    const rating = useMemo(() => ratingArray(review.rating), [review]);

    return (
        <div className='border-b-2 pb-4'>
            <div className='flex gap-2'>
                <div className='py-4 px-[18px] bg-gray-700 rounded-full text-center'>
                    <p className='text-white text-bold'>{name ? name : 'DU'}</p>
                </div>
                <div className=''>
                    <h2 className='text-bold'>{review && review.user ? review.user.name : 'User'}</h2>
                    <p className='text-sm text-thin'>Software Developer</p>
                </div>
            </div>
            <div className='mt-2'>
                <ul className='flex'>
                    {
                        rating && rating.length > 0 && rating.map(() => {
                            return <li className=''>
                                <i className='bx bxs-star text-xl text-orange-400'></i>
                            </li>
                        })
                    }
                </ul>
                <p>{review && review?.review}</p>
            </div>
        </div>
    );
}