import React, { useState } from "react";

const [textData, setTextData] = useState(
  "https://github.com/Prayag2003/tweet-tube-backend"
);

function Hero() {
  const handleHero = () => {
    setTextData(textData);
    window.location.href = "/explore";
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-8xl text-6xl font-large title-font mb-4 text-white-1000">
            <span
              style={{
                background: "-webkit-linear-gradient(45deg, #ff5e5e, #845ec2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Githubify
            </span>
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
            Understanding Codebase made simpler
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="https://github.com/Prayag2003/tweet-tube-backend"
              className="w-full  bg-opacity-20 rounded-2xl border border-gray-600 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-white opacity-0.3 text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button
            onClick={handleHero}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Go
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
