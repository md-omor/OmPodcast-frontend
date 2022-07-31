import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

const Home = () => {
  const navigate = useNavigate();

  const startRegister = () => {
    navigate("/authenticate", {
      replace: true,
    });
  };
  return (
    <div className="container mx-auto px-4 h-[80vh]">
      <div className="w-full flex justify-center items-center h-full">
        <Card title="Welcome to the awesome OM Podcast!" icon="home_icon">
          <p className="font-Jost text-lg font-medium text-[#C4C5C5] pt-7 lg:w-[393px] w-full lg:px-0 px-[120px] text-center">
            We’re working hard to get OM Podcast ready for everyone! While we
            wrap up the finishing youches, we’re adding people gradually to make
            sure nothing breaks :)
          </p>
          <Button onClick={startRegister} text="Let's go  " />
          <div className="flex mt-5">
            <p className="text-[#0077FF] font-Rubik font-medium text-sm mr-2 cursor-pointer">
              Have an invite link?
            </p>
            {/* <Link to="/login">
              <p className="text-[#0077FF] font-Rubik font-medium text-sm cursor-pointer">
                Sign in
              </p>
            </Link> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
