import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";
import Card from "../components/shared/Card";

const Home = () => {
  const navigate = useNavigate();

  const startRegister = () => {
    navigate("/register", {
      replace: true,
    });
  };
  return (
    <div className="container mx-auto px-4 h-[80vh]">
      <div className="w-full flex justify-center items-center h-full">
        <div className="bg-[#1D1D1D] lg:w-[650px] w-full h-[437px] py-16 flex flex-col items-center">
          <Card title="Welcome to the awesome OM Podcast!">
            <p className="font-Jost text-lg font-medium text-[#C4C5C5] pt-7 lg:w-[393px] w-full lg:px-0 px-[120px] text-center">
              We’re working hard to get OM Podcast ready for everyone! While we
              wrap up the finishing youches, we’re adding people gradually to
              make sure nothing breaks :)
            </p>
            <Button onClick={startRegister} text=" Get your username" />
            <div className="flex mt-5">
              <p className="text-[#0077FF] font-Rubik font-medium text-sm mr-2 cursor-pointer">
                Have an invite link?
              </p>
              <Link to="/login">
                <p className="text-[#0077FF] font-Rubik font-medium text-sm cursor-pointer">
                  Sign in
                </p>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
