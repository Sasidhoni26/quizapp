import React from 'react';

interface QuestionProps {
  question: Question;
  selectedOption: number;
  onOptionSelect: (optionIndex: number) => void;
}

const QuestionCard: React.FC<QuestionProps> = ({
  question,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium text-gray-800 mb-4">{question?.text}</h2>
      <div className="space-y-3">
        {question.options.map((option, index:number) => (
          <label key={index} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="option"
              checked={selectedOption === index}
              onChange={() => onOptionSelect(index)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;