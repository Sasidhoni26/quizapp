// components/Header.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-lightText p-4 shadow-md z-20  ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Image and Title */}
        <Link href={"/home"}>
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo.svg"
              alt="TNPSC Logo"
              height={40}
              width={40}
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold">TNPSC Online Test</h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="hover:text-gray-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-gray-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-gray-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
