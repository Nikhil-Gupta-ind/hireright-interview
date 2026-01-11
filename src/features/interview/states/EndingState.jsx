import { useEffect, useRef, useState } from "react";
import { fetchSessionSummary } from "../../../core/services/session";

const EndingState = ({ className = '', sessionCode }) => {

  const scrollRef = useRef(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const loadSummary = async () => {
      try {
        const data = await fetchSessionSummary(sessionCode);
        if (data && data.analysis && data.analysis.summary) {
          setSummary(data.analysis.summary);
        } else {
          setError("Oops your interview summary is unavailable at the moment!");
        }
      } catch (err) {
        console.error("Failed to load summary", err);
        setError("Oops your interview summary is unavailable at the moment!");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (sessionCode) {
        loadSummary();
      } else {
        // Fallback if no sessionCode, though shouldn't happen in normal flow
        setError("Oops your interview summary is unavailable at the moment!");
        setLoading(false);
      }
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, [sessionCode]);

  // Effect for scrolling when loading is complete
  useEffect(() => {
    if (loading) return;

    // Add a small delay for DOM update
    setTimeout(() => {
      const el = scrollRef.current
      if (!el) return

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      })
    }, 100);

  }, [loading]);

  return (
    <div className={`${className} relative`}>
      <div className="relative w-32 shrink-0 mr-8 hidden md:block select-none">
        <img
          src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
          alt="Agent Avatar"
          className={`
            w-32 h-32 object-contain rounded-full bg-[#D5621B66] shadow-sm
            absolute left-0
            transition-all duration-1000 ease-in-out
            ${!loading ? 'top-1/2 -translate-y-1/2' : 'top-0 translate-y-0'}
          `}
          onError={(e) => { e.target.src = 'https://placehold.co/190x144?text=Agent'; }}
        />
      </div>
      {/* MOBILE FALLBACK (Static Header for small screens) */}
      <div className="md:hidden mb-6 flex justify-center w-full">
        <img
          src={'https://res.cloudinary.com/djy2jlthj/image/upload/v1765340965/peep-11.png'}
          alt="Agent Avatar"
          className="w-24 h-24 object-contain rounded-full bg-[#D5621B66]"
        />
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} className="flex flex-col min-w-0 flex-1 min-h-0 overflow-y-auto relative">
        {true && <div>
          <p className="font-dm-serif font-normal text-[32px] text-[#58240E] leading-[40.96px] italic whitespace-pre-line m-0">
            That was a wonderful conversation!
          </p>
        </div>}

        <p className="font-hanken font-normal text-[20px] text-black leading-[138%] whitespace-pre-line m-0 mt-6">
          Here are some insights from our Chat!
        </p>

        {/* Interview Summary with Loading State */}
        <div className="relative min-h-[100px] mt-4">
          {loading ? (
            <div className="w-full animate-pulse space-y-4">
              <div className="h-5 bg-[rgba(88,36,14,0.1)] rounded w-3/4"></div>
              <div className="h-5 bg-[rgba(88,36,14,0.1)] rounded w-full"></div>
              <div className="h-5 bg-[rgba(88,36,14,0.1)] rounded w-5/6"></div>
              <div className="h-5 bg-[rgba(88,36,14,0.1)] rounded w-4/5"></div>
            </div>
          ) : null}

          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md font-hanken">
              {error}
            </div>
          )}

          {!loading && summary && (
            <div className="font-hanken font-normal text-[20px] text-black leading-[27.6px] whitespace-pre-line">
              {summary}
            </div>
          )}
        </div>

        <p className="mt-10 font-dm-serif font-normal text-[32px] text-[#58240E] leading-[40.96px] italic whitespace-pre-line">
          Here’s what happens next...
        </p>

        {!loading && <p className="font-hanken font-normal text-[20px] text-black leading-[138%] whitespace-pre-line m-0 mt-10 mb-10">
          You'll receive detailed feedback from our team within 24 hours via email. This will include insights on your responses and information about the next steps in our process.
        </p>}
      </div>
    </div>
  )
}

export default EndingState