import ChevronIcon from "../../../assets/icons/icon-chevron.svg?react"

const DeviceSelect = ({icon, label, className = ''}) => {
  return (
  <div className={`flex items-center justify-between bg-[#FAF6F2] rounded-[18px] px-6 py-4 border border-[#58240E33] ${className}`}>
    <div className="flex gap-6">
      {icon}
      <span className="font-hanken text-[16px] font-medium leading-[22.4px]">{label}</span>
    </div>
    <ChevronIcon />
  </div>
  )
}

export default DeviceSelect