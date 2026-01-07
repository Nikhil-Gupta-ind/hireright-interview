import Logo from "../../../assets/logo-square.svg?react"

const InterviewHeader = () => {
  return (
    <div className="flex gap-6 items-center">
        <Logo />
        <div className="w-px h-5 bg-[#0C0C0E3D]"></div>
        <span>John Doe Interview</span>
    </div>
  )
}

export default InterviewHeader