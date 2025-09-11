import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../api/config";

export default function InfoCountry({ country }) {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    if (!country) return;

    const fetchCountryData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "all?fields=name,flags,coatOfArms,independent,unMember,cca2"
        );
        const selected = data.find((c) => c.cca2 === country);
        setCountryData(selected || null);
      } catch (err) {
        console.log("Error fetching country data:", err);
      }
    };

    fetchCountryData();
  }, [country]);

  if (!countryData) return null;

  return (
    <div className="w-full  bg-gray-100 p-6">
      <div className="md:w-[80%] m-auto">
        <div className="mb-8 md:w-[60%]">
          <h2 className=" text-[2.5rem] font-[700] tracking-widest mb-2 text-left ">
            Country Information
          </h2>
          <p className="mt-4 text-gray-700 text-left">
            For the beginning of a new paragraph marks a change of topic or a
            step in the development of an argument or of a story in writing
            essays or other compositions too include.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {/* Flag */}
          <div className=" group flex flex-col items-center p-10 bg-white rounded-lg shadow-md">
            <div className="group-hover:-translate-y-2 transition-transform duration-300">
              <img
                src={countryData?.flags?.png}
                alt="Flag"
                className="w-20 h-20 object-contain mb-2"
              />
              <span className="font-semibold ">Flag</span>
            </div>
          </div>

          {/* Coat of Arms */}
          <div className="group flex flex-col items-center p-10 bg-white rounded-lg shadow-md">
            <div className="group-hover:-translate-y-2 transition-transform duration-300">
              {countryData?.coatOfArms?.png ? (
                <img
                  src={countryData?.coatOfArms?.png}
                  alt="Coat of Arms"
                  className="w-20 h-20 object-contain mb-2"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mb-2">
                  N/A
                </div>
              )}
              <span className="font-semibold">Coat of Arms</span>
            </div>
          </div>

          {/* UN membership */}
          <div className="group flex flex-col items-center p-10 bg-white rounded-lg shadow-md">
            <div className="group-hover:-translate-y-2 transition-transform duration-300">
              <span className="w-20 h-20  flex items-center justify-center text-white mb-2">
                <img src="https://th.bing.com/th/id/R.fdbdeaea88c622c90d942746aedf469a?rik=qWvwUhvOpO3MVw&pid=ImgRaw&r=0" />
              </span>
              <span className="font-semibold">
                {countryData?.unMember ? "✔" : "✖"}
              </span>
            </div>
          </div>

          <div className="group flex flex-col items-center p-10 bg-white rounded-lg shadow-md">
            <div className="group-hover:-translate-y-2 transition-transform duration-300">
              <span className="w-20 h-20  flex items-center justify-center text-white mb-2">
                <img src="https://cdn-icons-png.flaticon.com/256/11929/11929973.png" />
              </span>

              <div className="flex flex-row">
                <span className="font-semibold">Independent</span>

                <span className="font-semibold mx-2">
                  {countryData?.independent ? "✔" : "✖"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
