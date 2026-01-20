const Avatar = ({ companion, size = '82px', className = '' }) => {
  return (
    <img
      src={companion?.avatar}
      alt={companion?.name}
      style={{ width: size, height: size }}
      className={`object-contain rounded-full bg-[#D5621B66] select-none ${className}`}
      onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
    />
  )
}

export default Avatar