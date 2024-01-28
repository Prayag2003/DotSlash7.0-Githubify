import React from "react";

const Explore = () => {
  const handleChatWithBot = () => {
    window.location.href = "/chatwithbot";
  };

  const handleChats = () => {
    window.location.href = "http://localhost:5174/";
  };

  const handleVideoChat = () => {
    window.location.href = "http://localhost:3002";
  };

  const gradientStyle = {
    background: "-webkit-linear-gradient(45deg, #ff5e5e, #845ec2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const gradientStyle2 = {
    background: "-webkit-linear-gradient(45deg, #56ccf2, #2f80ed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <section class="text-gray-600 body-font">
      <div class="container px-28 py-12 mx-auto my-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            <img
              alt="testimonial"
              class="w-28 h-28 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
              src="https://avatars.githubusercontent.com/u/583231?v=4"
            />
          </h1>
          <p
            class="lg:w-2/3 mx-auto leading-relaxed  text-4xl"
            style={gradientStyle2}
          >
            Hey What do you want to explore ?
          </p>
        </div>
        <div class="grid grid-cols-2 gap-0 -m-5 pl-32 ">
          <div class="p-2 lg:w-2/3 md:w-1/2 w-full cursor-pointer">
            <div class="h-full flex items-center border-gray-200 border-2 p-4 rounded-2xl shadow-lg hover:shadow-none">
              <div class="flex-grow" onClick={handleChatWithBot}>
                <h2
                  class=" text-3xl title-font font-extralight text-center"
                  style={gradientStyle}
                >
                  Chat with Bot
                </h2>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-2/3 md:w-1/2 w-full cursor-pointer">
            <div class="h-full flex items-center border-gray-200 border-2 p-4 rounded-2xl shadow-lg hover:shadow-none">
              <div class="flex-grow" onClick={handleChats}>
                <h2
                  class="text-gray-900 text-3xl title-font font-extralight text-center"
                  style={gradientStyle}
                >
                  Contributors Chat
                </h2>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-2/3 md:w-1/2 w-full cursor-pointer">
            <div class="h-full flex items-center border-gray-200 border-2 p-4 rounded-2xl shadow-lg hover:shadow-none">
              <div class="flex-grow" onClick={handleVideoChat}>
                <h2
                  class="text-gray-900 text-3xl title-font font-extralight text-center"
                  style={gradientStyle}
                >
                  Live Connect
                </h2>
              </div>
            </div>
          </div>
          <div class="p-2 lg:w-2/3 md:w-1/2 w-full cursor-pointer">
            <div class="h-full flex items-center border-gray-200 border-2 p-4 rounded-2xl shadow-lg hover:shadow-none">
              <div class="flex-grow" onClick={handleChatWithBot}>
                <h2
                  class="text-gray-900 text-3xl title-font font-extralight text-center"
                  style={gradientStyle}
                >
                  Contact Us
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
