import CompanionCard from '../../interview/components/card';

const CompanionSelection = ({onSelect}) => {
    const agents = apiResponse.data.availableAgents;

  return (
    <div className="w-full min-h-screen bg-[#F8F2ED] flex flex-col items-center justify-center p-8 box-border">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <header className="mb-16 text-center">
          <h1 className="heading-primary">
            Choose your Interview Companion
          </h1>
          <p className="text-[rgba(12,12,14,0.80)] font-hanken text-[20px] font-normal leading-[140%] tracking-[-0.2px] mt-3">
            Select an AI interviewer that makes you feel most comfortable.
          </p>
        </header>
        
        <div className="flex flex-wrap justify-center gap-20">
          {agents.map((agent) => (
            <CompanionCard key={agent.id} agent={agent} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompanionSelection

// Mock API Data
const apiResponse = {
  "success": true,
  "data": {
    "title": "Backend Engineer Interview",
    "type": "dsa",
    "duration": 25,
    "candidateName": "John Doe",
    "status": "in_progress",
    "availableAgents": [
      {
        "id": "jacob",
        "name": "Jacob",
        "avatar": "https://res.cloudinary.com/djy2jlthj/image/upload/v1765340966/peep-99.png",
        "description": "Professional & direct, clear structured approach"
      },
      {
        "id": "angela",
        "name": "Angela",
        "avatar": "https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png",
        "description": "Warm & encouraging, friendly supportive style"
      },
      {
        "id": "selena",
        "name": "Selena",
        "avatar": "https://res.cloudinary.com/djy2jlthj/image/upload/v1765340966/peep-23_1.png",
        "description": "Tech savvy, relaxed conversational tone"
      }
    ]
  }
};