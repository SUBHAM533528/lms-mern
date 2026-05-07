import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const {Navigate} = useContext(AppContext);
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignUp } = useClerk();
  const { user } = useUser();
  const isEducator = user?.publicMetadata?.role === "educator";

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? " bg-white/70" : "bg-cyan-100/70"}`}
    >
      <img onClick={()=> Navigate('/')} src={assets.logo} alt="" className="w-28 lg:w-32 cursor-pointer" />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="cursor-pointer" onClick={()=> {Navigate('/educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>
              <Link to="/my-enrollment">My Enrollment</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignUp()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={()=> {Navigate('/educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'}</button>|{" "}
              <span className="text-sm">|</span>
              <Link to="/my-enrollment" className="text-sm">
                My Enrollment
              </Link>
            </>
          )}
        </div>

        {user ? <UserButton /> : 
          <button onClick={() => openSignUp()} className="p-1 rounded-full cursor-pointer hover:bg-gray-200">
            <img src={assets.user_icon} alt="Sign up" className="w-6 h-6" />
          </button>
        }

      </div>
    </div>
  );
};

export default Navbar;
