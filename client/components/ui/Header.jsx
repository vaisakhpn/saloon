"use client";
import Link from "next/link";
import SearchBox from "../SearchBox";
import { useSelector } from "react-redux";

import DropdownMenu from "../DropdownMenu";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="fixed top-0 left-0 w-full bg-header p-1 z-50 shadow-md">
      <header className="flex flex-row justify-between items-center max-w-6xl mx-auto  p-4 ">
        <Link className="text-black font-bold text-xl sm:text-3xl" href="/">
          Logo
        </Link>
        <div className="sm:flex sm:flex-row flex flex-col sm:gap-5 gap-2 text-xs sm:text-sm">
          <SearchBox label="Kochi.." />
          <SearchBox label="Enter Shop name" />
        </div>
        <div>
          {currentUser ? (
            <div>
              <DropdownMenu avatar={currentUser.avatar}></DropdownMenu>
            </div>
          ) : (
            <button className="bg-green-600 p-1 sm:p-2 px-2 sm:px-5 rounded-full items-center hover:bg-green-700">
              <Link className="text-white text-sm sm:text-lg" href="/sign-in">
                Sign in
              </Link>
            </button>
          )}
        </div>
      </header>
    </div>
  );
}
