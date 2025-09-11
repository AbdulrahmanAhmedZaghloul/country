// CountryDetailsPage.jsx
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaGlobe,
  FaCalendarDay,
  FaClock,
  FaCity,
} from "react-icons/fa";
import axios from "axios";
import axiosInstance from "../api/config";
import bgImage from "../assets/factsbg2.jpg";

export default function DetailsCountry({ country }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchDetails = async () => {
      try {
        const { data } = await axiosInstance.get(
          `alpha/${country}?fields=population,region,capital,timezones,startOfWeek`
        );
        setDetails(data[0] || data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };

    fetchDetails();
  }, [country]);

  if (!details) return null;

  return (
    <div
      className="w-full h-[50vh] bg-cover bg-no-repeat bg-center text-white p-8 md:p-16"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Title */}
      <div className="flex justify-center mb-12">
        <h1 className="text-white text-3xl md:text-5xl font-bold">
          Read Some Facts
        </h1>
      </div>

      {/* Info blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 text-center gap-10 md:gap-14">
        {/* Population */}
        <div className="hoverRead flex flex-col items-center cursor-pointer md:border  md:border-t-0  md:border-b-0  md:border-l-0   md:border-r-white">
          <div className="p-2 border-[0.2rem] hovercolor border-red-950 rounded-full group-hover:border-white group-hover:text-white transition">
            <div className="hoverborder p-2">
              <FaUsers
                size={60}
                className="hoverFaUsers p-4  text-yellow-500  transition"
              />
            </div>
          </div>
          <p className="hoverP text-xl md:text-2xl font-bold mt-4  transition">
            {details?.population?.toLocaleString()}
          </p>
          <p className="text-base md:text-xl transition">Population</p>
        </div>

        {/* Region */}
        <div className="hoverRead flex flex-col items-center cursor-pointer md:border  md:border-t-0  md:border-b-0  md:border-l-0   md:border-r-white">
          <div className="p-2 border-4 hovercolor border-red-950 rounded-full hover:border-white hover:text-white">
            <div className="hoverborder p-2">
              <FaGlobe
                size={60}
                className="hoverFaUsers p-4 text-yellow-500  transition"
              />
            </div>
          </div>
          <p className="hoverP text-xl md:text-2xl font-bold mt-4 transition">
            {details?.region}
          </p>
          <p className="text-base md:text-xl transition">Region</p>
        </div>

        {/* Start of week */}
        <div className="hoverRead flex flex-col items-center cursor-pointer md:border  md:border-t-0  md:border-b-0  md:border-l-0   md:border-r-white">
          <div className="p-2 hovercolor border-4 border-red-950 rounded-full hover:border-white hover:text-white">
            <div className="hoverborder p-2">
              <FaCalendarDay
                size={60}
                className="text-yellow-500 p-4 hoverFaUsers transition"
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold mt-4 hoverP transition">
            {details?.startOfWeek}
          </p>
          <p className="text-base md:text-xl  transition">Start of Week</p>
        </div>

        {/* Timezone */}
        <div className="hoverRead flex flex-col items-center cursor-pointer md:border  md:border-t-0  md:border-b-0  md:border-l-0   md:border-r-white">
          <div className="p-2 hovercolor border-4 border-red-950 rounded-full hover:border-white hover:text-white">
            <div className="hoverborder p-2">
              <FaClock
                size={60}
                className="hoverFaUsers p-4 text-yellow-500 transition"
              />
            </div>
          </div>
          <p className="text-xl md:text-2xl font-bold mt-4 hoverP transition">
            {details?.timezones[0]}
          </p>
          <p className="text-base md:text-xl transition">Timezone</p>
        </div>

        {/* Capital */}
        <div className="hoverRead flex flex-col items-center cursor-pointer md:border  md:border-t-0  md:border-b-0  md:border-l-0   md:border-r-white">
          <div className="p-2 hovercolor border-4 border-red-950 rounded-full hover:border-white hover:text-white">
            <div className="hoverborder p-2">
              <FaCity
                size={60}
                className="text-yellow-500 hoverFaUsers p-4 transition"
              />
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold mt-4 hoverP transition">
            {details?.capital?.[0]}
          </p>
          <p className="text-base md:text-xl  transition">Capital</p>
        </div>
      </div>
    </div>
  );
}
