import { useState } from 'react';
import logo from '../../assets/logo.svg';
import ArrowIcon from '../../assets/icons/icon-arrow-forward.svg?react';
import RatingBar from '../component/RatingBar';

const Feedback = () => {

  const [rating, setRating] = useState(0); // Default to 3 stars

  return (
    <div className='h-screen w-full bg-(--color-bg) flex flex-col items-center justify-evenly p-18'>
        <div className='flex-1 flex flex-col items-center justify-center w-full'>
          <div className='flex flex-col items-center justify-center gap-11'>
            <img src={logo} alt="hireright" />
            <p className='text-[rgb(88,36,14)] font-hanken text-[48px] font-light leading-[57.6px] tracking-[-1px] text-center'>
                {'Loved '}
                <span className="heading-serif">
                    Interviewing
                </span> you!
            </p>
            <button className="rounded-2xl flex items-center justify-center gap-4 py-[18.5px] px-6 text-(--color-primary) active:scale-95 hover:bg-(--color-primary) hover:text-white transition">
              Know more about us <ArrowIcon />
            </button>
          </div>
        </div>
      
        <div className='flex flex-col items-center justify-between gap-6'>
          <span className='font-hanken text-[20px] font-medium'>
            How was you experience? Let us know
          </span>

          <RatingBar />
        </div>
    </div>
  )
}

export default Feedback