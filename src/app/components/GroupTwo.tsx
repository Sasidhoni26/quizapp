// pages/index.tsx

import Card from "./Card";

const GroupTwo: React.FC = () => {
  return (
    <div className="min-h-screen md:h-[91vh] flex flex-col md:flex-row justify-center items-center  bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          TNPSC Group II Exam
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Tamil"
            description="Test your knowledge in Tamil with our detailed quizzes."
            imageUrl="/images/temple.png"
            link="#tamil-quiz"
            imgClassName="w-48 h-48 object-cover"
          />
          <Card
            title="Aptitude"
            description="Sharpen your skills with aptitude quizzes tailored for TNPSC."
            imageUrl="/images/aptitude.png"
            link="#aptitude-quiz"
            imgClassName="w-48 h-48 object-cover"
          />
          <Card
            title="General Studies"
            description="Prepare for general studies with our wide range of quizzes."
            imageUrl="/images/generalstudies.png"
            link="#general-studies-quiz"
            imgClassName="w-48 h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupTwo;
