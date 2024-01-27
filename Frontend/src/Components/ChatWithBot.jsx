import React from "react";

const ChatWithBot = () => {
  return (
    <>
      <footer class="text-gray-600 body-font h-96">
        <div class="text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            <img
              alt="testimonial"
              class="w-28 h-28 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
              src="https://avatars.githubusercontent.com/u/583231?v=4"
            />
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed  text-2xl">
            Hey $Name, What do you want to explore ?
          </p>
        <div class="flex absolute bottom-20 py-10 left-48 lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div class="relative flex-grow w-full">
            <input
              type="text"
              id="full-name"
              name="full-name"
              class="w-full bg-gray-100 bg-opacity-50 rounded-2xl border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        </div>

      </footer>
    </>
  );
};

export default ChatWithBot;
