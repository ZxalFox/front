import Link from "next/link";
import React from "react";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  return (
    <div className="bg-pink-800 min-h-[4rem]">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/in/diary" className="text-white text-lg font-bold">
          Diário de Emoções
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link href="/in/emotions" className="text-white hover:underline">
                Emoções
              </Link>
            </li>
            <li>
              <button
                className="m-0 flex items-center p-0 hover:cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user_id");
                  window.location.href = "/";
                }}
              >
                <IoIosLogOut size={23} />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
