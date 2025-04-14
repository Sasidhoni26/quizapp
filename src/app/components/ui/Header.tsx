"use client";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const removeLastSegment = (path: string) => {
    const imppaths = [
      "/admin",
      "/groupiv",
      "/groupii",
      "/syllabus",
      "/otherexams",
      "/quiz_test",
    ];
    if (imppaths.includes(path)) {
      router.push("/home");
      return;
    }
    const pathArray = path?.split("/");
    pathArray.pop();
    router.push((pathArray || [])?.join("/"));
    return;
  };
  console.log(pathname);

  return (
    <header className="bg-white text-lightText p-4 shadow-md z-20">
      <div className="container mx-auto flex justify-start gap-2 items-center">
        {/* Back Button */}
        {pathname != "/home" && (
          <div className="">
            <button
              onClick={() => removeLastSegment(pathname)}
              className="p-1 cursor-pointer bg-blue-500 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
            >
              <ChevronLeftIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        {/* Image and Title */}
        <Link href={"/home"}>
          <div className="flex items-center space-x-4">
            <Image
              src="/images/logo.png"
              alt="TNPSC Logo"
              height={40}
              width={40}
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold text-gray-900">
              TNP<span className="text-[#D5352C]  ">S</span>C Online Test
            </h1>
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
