declare interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
}

declare interface QuestionCardProps {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  tag: string;
  solution: string;
  subject?: string;
}
