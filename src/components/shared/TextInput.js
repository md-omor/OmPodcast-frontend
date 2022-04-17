import React from "react";

const TextInput = (props) => {
  return (
    <>
      <input
        type="text"
        {...props}
        className="bg-[#262626] px-5 py-2 text-white border-none outline-none rounded-xl mt-10"
      />
    </>
  );
};

export default TextInput;
