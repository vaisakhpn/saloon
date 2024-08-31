"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { signOut } from "./signOut";
import Link from "next/link";

const DropdownMenu = ({ avatar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const handleSignOut = signOut();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="relative inline-block" ref={dropdownRef}>
        <button type="button" onClick={toggleDropdown}>
          <Image src={avatar} alt="avatar" width={50} height={50} />
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <ul
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
                  onClick={closeDropdown}
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    closeDropdown();
                    handleSignOut();
                  }}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
