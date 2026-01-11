const CompanionCard = ({ agent, onSelect }) => {

  const { avatar, name, description } = agent;
  
  return (
    <div className="group perspective-1000">
      <div
        style={{ width: '214px', height: '250px' }}
        onClick={() => onSelect(agent)}
        // group-hover:shadow-2xl group-hover:z-10
        className="flex flex-col p-3 rounded-[20px] border border-[rgba(88,36,14,0.40)] bg-[#EFDFD3] transition-all duration-300 ease-out transform-gpu group-hover:transform-[rotate(-2deg)_scale(1.1)]"
      >
        <img
          src={avatar}
          alt={name}
          style={{ width: '190px', height: '144px' }}
          className="object-contain rounded-xl border border-[rgba(88,36,14,0.32)] bg-white"
          onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />
        <div className="flex flex-col p-2 items-start gap-1 self-stretch overflow-hidden">
          <h3 className="text-[#302E2D] font-serif text-[20px] leading-tight tracking-[-0.2px] truncate">
            {name}
          </h3>
          <p className="text-[rgba(0,0,0,0.64)] font-hanken text-[12px] font-semibold leading-tight tracking-[-0.2px] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanionCard