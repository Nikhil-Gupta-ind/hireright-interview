import { useState } from 'react'
import ChevronIcon from "../../../assets/icons/icon-chevron.svg?react"

const DeviceSelect = ({icon, label, className = '', options = []}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState(label)

  const handleSelect = (option) => {
    setSelectedLabel(option)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between bg-[#FAF6F2] px-6 py-4 border border-[#58240E33] cursor-pointer ${isOpen ? 'rounded-t-[18px] rounded-b-none' : 'rounded-[18px]'}`}
      >
        <div className="flex gap-6">
          {icon}
          <span className="font-hanken text-[16px] font-medium leading-[22.4px] select-none">{selectedLabel}</span>
        </div>
        <ChevronIcon className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && options.length > 0 && (
        <div className="absolute top-full bg-[#FAF6F2CC] border border-[#58240E33] rounded-b-[18px] w-full z-10 border-t-0" style={{ backdropFilter: 'blur(10px)' }}>
          {options.filter(option => option.label !== selectedLabel).map((option, index) => (
            <div 
              key={index}
              onClick={() => handleSelect(option.label)}
              className="px-6 py-3 hover:bg-[#EFDFD3] cursor-pointer last:rounded-b-[18px] border-b border-[#58240E33] last:border-b-0"
            >
              <div className="flex gap-6">
                {option.icon}
                <span className="font-hanken text-[16px] font-medium leading-[22.4px] select-none">{option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeviceSelect