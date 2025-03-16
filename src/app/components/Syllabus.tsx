// pages/coming-soon.tsx
import Image from "next/image";
import Link from "next/link"; // Import the Link component for navigation
import React from "react";

const ComingSoon: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Centered Image */}
        <div className="mb-6">
          <Image
            src="/images/comingsoon.png" // Replace with the path of your image
            alt="Coming Soon"
            width={500} // Adjust the size as needed
            height={500} // Adjust the size as needed
            className="object-contain"
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-4xl font-bold text-gray-700">Coming Soon</h1>
        <p className="mt-2 text-lg text-gray-500">
          We are working hard to bring this to you.
        </p>

        {/* Home Button */}
        <div className="mt-6">
          <Link href="/home">
            <button className="px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-500 transition duration-300">
              Go to Home Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
