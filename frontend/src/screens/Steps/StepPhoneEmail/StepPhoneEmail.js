import React, { useState } from "react";
import Email from "./Email";
import Phone from "./Phone";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  return (
    <div className="flex items-center justify-center mt-24 flex-col ">
      <div className="justify-end flex lg:w-[650px] w-full mb-5">
        <button
          className={`${
            type === "phone" ? "bg-[#0077FF]" : "bg-[#262626]"
          }  rounded-xl mr-3 w-14 h-14 flex items-center justify-center`}
          onClick={() => setType("phone")}
        >
          <img src="/assets/phone_android.svg" alt="phone" />
        </button>
        <button
          className={`${
            type === "email" ? "bg-[#0077FF]" : "bg-[#262626]"
          }  rounded-xl mr-3 w-14 h-14 flex items-center justify-center`}
          onClick={() => setType("email")}
        >
          <img src="/assets/email.svg" alt="email" />
        </button>
      </div>

      <Component onNext={onNext} />
    </div>
  );
};

export default StepPhoneEmail;
