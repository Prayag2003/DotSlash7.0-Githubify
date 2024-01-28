import React, { useState } from "react";

const Hero = () => {
  const [githubUrl, setGithubUrl] = useState("");

  const handleHero = () => {
    // Sending a POST request to the Flask server
    fetch("http://127.0.0.1:8000/process_repository", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // credentials: 'include',
      body: JSON.stringify({ github_url: githubUrl }),
      redirect: "follow",
    })
      .then((response) => {
        if (response.status === 202) {
          window.location.href = "http://localhost:5173/explore";
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    setGithubUrl(e.target.value);
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
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Understanding Codebase made simpler
          </p>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <input
              type="text"
              id="github-url"
              name="github-url"
              value={githubUrl}
              onChange={handleInputChange}
              className="w-full bg-opacity-50 rounded-2xl border border-gray-600 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-white text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
};

export default Hero;
