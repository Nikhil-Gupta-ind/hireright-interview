import { useRef, useState } from 'react'
import StarIcon from '../../assets/icons/icon-star.svg?react'
import StarFilledIcon from '../../assets/icons/icon-star-filled.svg?react'

const StarRating = ({ rating, onRatingChange }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)

  const getIndexFromPosition = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const starWidth = rect.width / 5
    return Math.min(4, Math.max(0, Math.floor(x / starWidth)))
  }

  const updateFromEvent = (e) => {
    const index = getIndexFromPosition(e.clientX)
    setActiveIndex(index)
    onRatingChange(index + 1)
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-1.5 items-center select-none cursor-pointer"
      onPointerDown={updateFromEvent}
      onPointerMove={(e) => {
        if (e.buttons === 1) updateFromEvent(e)
        else setActiveIndex(getIndexFromPosition(e.clientX))
      }}
      onPointerLeave={() => setActiveIndex(null)}
      onPointerUp={() => setActiveIndex(null)}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center"
        >
          <span
            className={`transition-transform duration-150 ${
              activeIndex === index ? 'scale-110' : 'scale-100'
            }`}
          >
            {index < rating ? <StarFilledIcon /> : <StarIcon />}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StarRating
