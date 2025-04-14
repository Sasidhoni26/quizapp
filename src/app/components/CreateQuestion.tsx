"use client";
import React, { useState } from "react";
import { post } from "../../../utils/api";

type OptionKeys = "A" | "B" | "C" | "D";
type FormData = {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  subject: string;
  tag: string;
  solution: string;
};

const CreateQuestion = () => {
  const [formData, setFormData] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    answer: "",
    subject: "",
    tag: "",
    solution: "",
  });

  const [questions, setQuestions] = useState([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "answer") {
      setFormData({
        ...formData,
        answer: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setOpenDropdown(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const updatedQuestions: any = [...questions, formData];
    setQuestions(updatedQuestions);
    console.log(formData);
    const editedFormData = { ...formData };
    editedFormData["answer"] =
      editedFormData[`option${editedFormData["answer"]}` as keyof FormData];
    const save = await post(
      `/s1/quiz/auth/saveQuestion?collectionName=${editedFormData?.tag}`,
      editedFormData
    );
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "",
      subject: "",
      tag: "",
      solution: "",
    });
    console.log(save);
    alert("Question saved!");
  };

  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<"subject" | "tag" | null>(
    null
  );

  // Custom Select Dropdown Handler for Subject
  const toggleSubjectDropdown = () => {
    setOpenDropdown(openDropdown === "subject" ? null : "subject");
  };

  // Custom Select Dropdown Handler for Tag
  const toggleTagDropdown = () => {
    setOpenDropdown(openDropdown === "tag" ? null : "tag");
  };

  const handleSubjectSelect = (value: string) => {
    setFormData({ ...formData, subject: value });
    setOpenDropdown(null); // Close dropdown when a subject is selected
  };

  const handleTagSelect = (value: string) => {
    setFormData({ ...formData, tag: value });
    setOpenDropdown(null); // Close dropdown when a tag is selected
  };

  // Static tags array for the Tag dropdown (array of objects with label and value)
  const tags = [
    { label: "Group IV Tamil", value: "group4_tamil" },
    { label: "Group IV GK", value: "group4_gk" },
    { label: "Group IV Aptitude", value: "group4_aptitude" },
    { label: "Group II Tamil", value: "group2_tamil" },
    { label: "Group II GK", value: "group2_gk" },
    { label: "Group II Aptitude", value: "group2_aptitude" },
  ];

  const tagMap = {
    group4_tamil: "Group IV Tamil",
    group4_gk: "Group IV GK",
    group4_aptitude: "Group IV Aptitude",
    group2_tamil: "Group II Tamil",
    group2_gk: "Group II GK",
    group2_aptitude: "Group II Aptitude",
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl text-center font-extrabold mb-8 text-gray-800">
        Create a New Question
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        {/* Question Text */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Question Text <span className="text-red-500">*</span>
          </label>
          <textarea
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            rows={4}
            placeholder="Enter the question here..."
            required
          />
        </div>

        {/* Options */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Options <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="optionA"
              value={formData.optionA}
              onChange={handleInputChange}
              placeholder="Option A"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
              required
            />
            <input
              type="text"
              name="optionB"
              value={formData.optionB}
              onChange={handleInputChange}
              placeholder="Option B"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
              required
            />
            <input
              type="text"
              name="optionC"
              value={formData.optionC}
              onChange={handleInputChange}
              placeholder="Option C"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
              required
            />
            <input
              type="text"
              name="optionD"
              value={formData.optionD}
              onChange={handleInputChange}
              placeholder="Option D"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
              required
            />
          </div>
        </div>

        {/* Correct Answer */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Correct Answer <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {["A", "B", "C", "D"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={formData.answer === option}
                  onChange={handleInputChange}
                  className="mr-2 focus:ring-blue-500"
                  required
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Custom Subject Select */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleSubjectDropdown}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            >
              {formData.subject || "Select a subject"}
            </button>
            {openDropdown === "subject" && (
              <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-10">
                {["Tamil", "Aptitude", "General Studies"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSubjectSelect(option)}
                    className="w-full text-left p-3 text-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Tag Select */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Tag <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleTagDropdown}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            >
              {tagMap[formData?.tag as keyof typeof tagMap] || "Select a tag"}
            </button>
            {openDropdown === "tag" && (
              <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md z-10">
                {tags.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTagSelect(option.value)}
                    className="w-full text-left p-3 text-gray-700 hover:bg-gray-100 focus:outline-none"
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Solution */}
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            Solution (Optional)
          </label>
          <textarea
            name="solution"
            value={formData.solution}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-200"
            rows={4}
            placeholder="Provide an explanation or solution (optional)..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
