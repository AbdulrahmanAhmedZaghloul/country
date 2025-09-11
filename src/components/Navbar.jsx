import { HiX } from "react-icons/hi";
import  cityImage  from "../assets/h3logo.png";

export default function Navbar() {
  return (
    <nav className=" bg-slate-200 flex flex-col ">
      {/* Top section */}
      <div
        className=" bg-indigo-900 flex flex-col md:flex-row items-center justify-center
             md:justify-evenly gap-2 md:gap-20 px-5 py-2 md:py-0"
      >
        <div className=" lg:w-1/2 w-full pl-11  flex justify-center md:justify-start">
          <p className="m-0 font-normal text-white text-center text-sm leading-10">
            know all about
            <span className="font-bold mx-1">Countries !!</span>
          </p>
        </div>

        <div className="flex items-start pr-5 gap-2 md:gap-0 ">
          <button
            className="bg-[#d94148] py-2 
                  p-2 md:w-36 text-white rounded-none  text-md font-medium"
          >
            CHOOSE NOW
          </button>

          <button
            className="text-white bg-blue-950 py-2 w-10 sm:w-12 md:w-16 flex
                     items-start justify-center"
          >
            <HiX size={24} className="sm:hidden md:inline" />
            <HiX size={20} className="hidden sm:inline md:hidden" />
          </button>
        </div>

      </div>

      {/* Bottom section */}
      <div className="flex items-center justify-center gap-2 py-5 bg-white">
        <div className="flex items-center justify-center gap-2">
          <img src={cityImage} alt="" />
        </div>
      </div>
    </nav>
  );
}
