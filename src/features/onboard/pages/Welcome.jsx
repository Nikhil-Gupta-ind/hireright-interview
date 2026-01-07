import logo from '../../../assets/logo.svg'
import ArrowIcon from '../../../assets/icons/icon-arrow-forward.svg?react'

const Welcome = ({title, onClick}) => {
  
  return (
    <div className='h-screen w-full bg-[#F8F2ED] flex flex-col items-center justify-center gap-11'>
      <img src={logo} alt="hireright" />
      <p className='text-[rgb(88,36,14)] font-hanken text-[48px] font-light leading-[57.6px] tracking-[-1px] text-center'>
          Welcomes you to your
          <br />
          <span className="heading-serif">
              {title}
          </span> Interview
      </p>
      <button onClick={onClick} className="px-3 py-4 rounded-full border border-[#D5621B] flex items-center justify-center text-[#D5621B] hover:bg-[#D5621B] hover:text-white transition">
        <ArrowIcon />
      </button>
    </div>
  )
}

export default Welcome