// components/Card.tsx

import Image from "next/image";
import React from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  imgClassName?: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  link,
  imgClassName = "",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-3 flex justify-center items-center">
        <Image
          className={imgClassName || "w-full h-48 object-cover"}
          width={1000}
          height={1000}
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <a
          href={link}
          className="mt-4 w-full inline-block bg-blue-500 text-white py-2 px-4 rounded-full text-center hover:bg-blue-600 transition"
        >
          Start
        </a>
      </div>
    </div>
  );
};

export default Card;
