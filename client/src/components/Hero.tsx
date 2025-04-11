import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-[70vh] bg-gradient-to-r from-amber-100 to-amber-300 px-10 md:px-24 py-10">
      {/* Text Section */}
      <div className="text-center md:text-left space-y-4 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
          Hello!!!
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-700">
          Welcome to
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
          Apni
          <span className="italic text-red-500 bg-red-100 px-2 py-1 rounded-lg">
            Dukan
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-md">
          Discover amazing deals and browse a variety of products tailored just
          for you.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition" onClick={() => (window.location.href = "/products")}>
          Shop Now
        </button>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          className="w-full max-w-md rounded-xl shadow-lg object-cover"
          src="https://media.istockphoto.com/id/1414489347/photo/happy-little-girl-pointing-at-backpack-while-buying-school-supplies-with-her-parents-in.jpg?s=612x612&w=0&k=20&c=ccyEcquLeM7Vt-37qOH1Q-vPps8V_HygXEkYpO6hjhQ="
          alt="family shopping"
        />
      </div>
    </div>
  );
};

export default Hero;
