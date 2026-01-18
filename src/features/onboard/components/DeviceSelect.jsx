import { useEffect, useRef, useState } from 'react'
import ChevronIcon from "../../../assets/icons/icon-chevron.svg?react"

const DeviceSelect = ({
  selectedOption,
  options,
  className = '',
  onOptionSelected
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (options.length === 1) {
      setIsOpen(false)
    }
  }, [options])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* TRIGGER the pill */}
      <div 
        onClick={() => options.length > 1 && setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-[#FAF6F2] px-6 py-4 border border-[#58240E33] cursor-pointer ${isOpen ? 'rounded-t-[18px] rounded-b-none' : 'rounded-[18px]'}`}
      >
        <div className="flex gap-6">
          {selectedOption.icon}
          <span className="font-hanken text-[16px] font-medium leading-[22.4px] select-none">
            {selectedOption.label}
          </span>
        </div>
        {options.length > 1 && (
          <ChevronIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </div>

      {/* MENU the popup */}
      {isOpen && (
        <div className="absolute top-full bg-[#FAF6F2CC] border border-[#58240E33] rounded-b-[18px] w-full z-10 border-t-0 backdrop-blur-[10px]" 
        // style={{ backdropFilter: 'blur(10px)' }}
        >
          {options
            .filter(option => option.label !== selectedOption.label)
            .map((option, index) => (
              <div 
                key={index}
                onClick={() => {
                  onOptionSelected(option)
                  setIsOpen(false)
                }}
                className="px-6 py-3 hover:bg-[#EFDFD3] cursor-pointer last:rounded-b-[18px] border-b border-[#58240E33] last:border-b-0"
              >
                <div className="flex gap-6">
                  {option.icon}
                  <span className="font-hanken text-[16px] font-medium leading-[22.4px] select-none">
                    {option.label}
                  </span>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

export default DeviceSelect