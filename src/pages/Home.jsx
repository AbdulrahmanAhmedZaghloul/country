import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import axios from "axios";
import url1 from "../assets/slide1.jpg";
import url2 from "../assets/slide2.jpg";
import url3 from "../assets/slide3.jpg";
import world from "../assets/world.jpg";
import playicon from "../assets/playicon.png";

export default function Home({ setSelectedCountry }) {
  const slides = [
    { url: `${url1}`, caption: "Hanging Gardens of Babylon" },
    { url: `${url2}`, caption: "Temple of Artemis" },
    { url: `${url3}`, caption: "Great Pyramids of Giza" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [countries, setCountries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        console.log(data);
        
        const countryList = data
          .map((c) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
         
      } catch (err) {
        console.log("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full relative">
      {/* Slider */}
      <div
        className="w-full h-[80vh] bg-cover bg-center duration-500"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      ></div>

      {/* Hero text */}
      <div className="absolute top-[100px]  left-1/2 md:left-1/4 -translate-x-1/2 md:translate-x-0 text-center md:text-left text-white  px-4">
        <h1 className="text-5xl leading-[3rem] font-bold">
          Seven Wonders
          <br />
          of the Ancient World
        </h1>
        <p className="mt-4 text-sm md:text-lg italic text-gray-200">
          {slides[currentIndex].caption}
        </p>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-[250px] left-1   text-white text-2xl md:text-4xl  bg-black/40 rounded-full hover:bg-black/70 transition"
      >
        <HiChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-[250px] right-3   text-white text-2xl md:text-4xl  bg-black/40 rounded-full hover:bg-black/70 transition"
      >
        <HiChevronRight />
      </button>

      <div className="relative w-full m-auto bg-[#40407e] py-6">
        <div className="lg:w-[85%] m-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4 md:px-6 py-8 md:py-0">
          <div className="lg:w-[30%] w-full flex justify-end  lg:relative -top-10 md:-top-[4rem] ">
            <div className="relative w-full flex justify-end ">
              <img
                className="w-full h-[14rem] cursor-pointer rounded  hover:opacity-90 transition"
                src={world}
                alt="World"
                loading="lazy"
                decoding="async"
                onClick={() => setIsModalOpen(true)}
              />

              <strong className="absolute top-8 text-white bg-[#40407e] p-4 py-1 rounded-l-none rounded-sm tracking-[0.1rem] left-0">
                World wide
              </strong>
            </div>
          </div>

          <div className="lg:w-[70%]">
            <div className="md:w-10/12 text-white text-center md:text-left">
           
              <h1 className="text-md md:text-2xl font-bold">
                Welcome to World Countries
              </h1>
           
              <p className="text-sm md:text-md leading-relaxed mt-2">
                Here we go, we can go all around the world, we will visit every
                corner of this earth, you and I we will visit everywhere.
              </p>

              <select
                className="w-full p-2 md:p-3 rounded-md text-black border-none mt-4"
                defaultValue=""
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="" disabled>
                  Select a Country
                </option>
                {countries.map((country) => (
                  <option
                    className="bg-slate-900 text-white"
                    key={country.code}
                    value={country.code}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
           
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-[90%] max-w-3xl bg-white rounded-lg shadow-2xl">
            <div className="w-full aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/V1508wboZXk?si=nxQdcesOhGSfHVzI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-semibold text-gray-700">
                City Tour
              </span>
              <button
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-700 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100"
                onClick={() => setIsModalOpen(false)}
              >
                CLOSE <span aria-hidden>×</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
