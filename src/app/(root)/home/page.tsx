"use client";
// pages/index.tsx
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Home = () => {
  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-16 px-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold leading-tight mb-6">
          Prepare for TNPSC Exams with Interactive Quizzes
        </h2>
        <p className="mt-4 text-lg max-w-xl mx-auto mb-8">
          Ace your exams with our well-structured quizzes designed specifically
          for TNPSC aspirants. Test your knowledge and improve your skills!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
          <Link href={"/groupiv"}>
            <button className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-blue-900 rounded-full text-lg font-medium shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 mb-4 sm:mb-0">
              Start Quiz Now
            </button>
          </Link>
          <Link href={`/admin`}>
            <button className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-blue-900 rounded-full text-lg font-medium shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
              Admin
            </button>
          </Link>
        </div>
      </section>

      {/* Cards Section */}
      <section className="container mx-auto py-12" id="syllabus">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Syllabus Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            {/* Syllabus Image */}
            <div className="flex justify-center mb-4">
              <Image
                src="/images/syllabus.png" // Use the path of the uploaded image here
                alt="Syllabus Image"
                height={1000}
                width={1000}
                className="h-20 w-auto object-cover"
              />
            </div>

            {/* Syllabus Title */}
            <h3 className="text-xl text-center font-semibold text-blue-600">
              Syllabus
            </h3>

            {/* Syllabus Description */}
            <p className="mt-4 text-gray-700 text-center">
              Find the complete syllabus for TNPSC exams. Get detailed subjects,
              topics, and exam guidelines.
            </p>

            {/* View Syllabus Button */}
            <Link href={"/syllabus"}>
              <button className="mt-6 cursor-pointer flex justify-center items-center w-full px-6 py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-500">
                View Syllabus
              </button>
            </Link>
          </div>

          {/* Group 4 Exam Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            id="group4"
          >
            {/* Group 4 Image */}
            <div className="flex justify-center mb-4">
              <Image
                src="/images/vao.png" // Use the path of the uploaded image here
                alt="Group 4 Exam Image"
                height={1000}
                width={1000}
                className="h-20 w-auto object-cover"
              />
            </div>

            {/* Group 4 Title */}
            <h3 className="text-xl text-center font-semibold text-blue-600">
              Group 4 Exam
            </h3>

            {/* Group 4 Description */}
            <p className="mt-4 text-gray-700 text-center">
              Prepare for the Group 4 exam with quizzes based on past papers and
              key concepts.
            </p>

            {/* Start Quiz Button */}
            <Link href={"/groupiv"}>
              <button className="cursor-pointer mt-6 px-6 flex justify-center items-center w-full py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-500">
                Start Group 4 Quiz
              </button>
            </Link>
          </div>

          {/* Group 2 Exam Card */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            id="group2"
          >
            {/* Group 2 Image */}
            <div className="flex justify-center mb-4">
              <Image
                src="/images/group2.png" // Use the path of the uploaded image here
                alt="Group 2 Exam Image"
                height={1000}
                width={1000}
                className="h-20 w-auto object-cover"
              />
            </div>

            {/* Group 2 Title */}
            <h3 className="text-xl text-center font-semibold text-blue-600">
              Group 2 Exam
            </h3>

            {/* Group 2 Description */}
            <p className="mt-4 text-gray-700 text-center">
              Get ready for the Group 2 exam with targeted quizzes and study
              materials.
            </p>

            {/* Start Quiz Button */}
            <Link href={"/groupii"}>
              <button className="cursor-pointer mt-6 px-6 flex justify-center items-center w-full py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-500">
                Start Group 2 Quiz
              </button>
            </Link>
          </div>

          {/* Second Row (1 Card Centered) */}
          <div className="lg:col-span-3 flex justify-center">
            <div
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              id="other-exams"
            >
              {/* Other Exams Image */}
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/otherexams.png" // Use the path of the uploaded image here
                  alt="Other Exams Image"
                  height={1000}
                  width={1000}
                  className="h-20 w-auto object-cover"
                />
              </div>

              {/* Other Exams Title */}
              <h3 className="text-xl text-center font-semibold text-blue-600">
                Other Exams
              </h3>

              {/* Other Exams Description */}
              <p className="mt-4 text-gray-700 text-center">
                Explore quizzes for other TNPSC-related exams with comprehensive
                materials.
              </p>

              {/* Explore Button */}
              <Link href={"/otherexams"}>
                <button className="cursor-pointer mt-6 px-6 flex justify-center items-center w-full py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-500">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2025 TNPSC Exam Prep | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
