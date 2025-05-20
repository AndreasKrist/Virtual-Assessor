export default function QuizProgress({ currentSection, totalSections }) {
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${(currentSection / totalSections) * 100}%` }}
        ></div>
      </div>
      <p className="text-center text-sm mt-2 text-gray-600">
        Section {currentSection} of {totalSections}
      </p>
    </div>
  );
}