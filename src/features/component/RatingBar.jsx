import { useRef, useState, useEffect } from 'react'
import StarIcon from '../../assets/icons/icon-star.svg?react'
import StarFilledIcon from '../../assets/icons/icon-star-filled.svg?react'
import StarHalfIcon from '../../assets/icons/icon-star-half.svg?react'

const StarRating = ({ rating, onRatingChange }) => {
  const [visualRating, setVisualRating] = useState(rating)
  const [activeIndex, setActiveIndex] = useState(null)
  const containerRef = useRef(null)
  const debounceTimer = useRef(null)

  useEffect(() => {
    setVisualRating(rating)
  }, [rating])

  const getRatingFromPosition = (clientX) => {
    if (!containerRef.current) return 0
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const width = rect.width
    // 5 stars total
    const percent = Math.max(0, Math.min(1, x / width))
    const score = percent * 5
    // Round to nearest 0.5
    return Math.ceil(score * 2) / 2
  }

  const updateFromEvent = (e) => {
    const newRating = getRatingFromPosition(e.clientX)
    setVisualRating(newRating)

    // For scaling effect, map to index 0-4
    const index = Math.ceil(newRating) - 1
    setActiveIndex(index >= 0 ? index : null)

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      onRatingChange(newRating)
    }, 10)
  }

  const handlePointerMove = (e) => {
    if (e.buttons === 1) {
      updateFromEvent(e)
    } else {
      const r = getRatingFromPosition(e.clientX)
      const index = Math.ceil(r) - 1
      setActiveIndex(index >= 0 ? index : null)
    }
  }

  return (
    <div
      ref={containerRef}
      className="flex gap-1.5 items-center select-none cursor-pointer"
      onPointerDown={updateFromEvent}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActiveIndex(null)}
      onPointerUp={() => setActiveIndex(null)}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center"
        >
          <span
            className={`transition-transform duration-150 ${activeIndex === index ? 'scale-110' : 'scale-100'
              }`}
          >
            {visualRating >= index + 1 ? (
              <StarFilledIcon />
            ) : visualRating >= index + 0.5 ? (
              <StarHalfIcon />
            ) : (
              <StarIcon />
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

export default StarRating
