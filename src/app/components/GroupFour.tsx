import Link from "next/link"; // For navigation
import Card from "../components/Card";

const GroupFour: React.FC = () => {
  return (
    <div className="min-h-screen md:h-[91vh] flex flex-col md:flex-row justify-center items-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Back button in the top left corner */}

      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          TNPSC Group IV and VAO Exam
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title="Tamil"
            description="Test your knowledge in Tamil with our detailed quizzes."
            imageUrl="/images/temple.png"
            link={`/quiz_test?collectionName=group4_tamil`}
            imgClassName="w-48 h-48 object-cover"
          />
          <Card
            title="Aptitude"
            description="Sharpen your skills with aptitude quizzes tailored for TNPSC."
            imageUrl="/images/aptitude.png"
            link={`/quiz_test?collectionName=group4_aptitude`}
            imgClassName="w-48 h-48 object-cover"
          />
          <Card
            title="General Studies"
            description="Prepare for general studies with our wide range of quizzes."
            imageUrl="/images/generalstudies.png"
            link={`/quiz_test?collectionName=group4_gk`}
            imgClassName="w-48 h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default GroupFour;
