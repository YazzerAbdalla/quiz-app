import React from "react";

const page = ({ params }: { params: { email: string } }) => {
  return (
    <div className="pt-14 flex w-full justify-center">
      <div className="m-0 p-0 flex flex-col items-center max-w-[700px] min-w-[545px] gap-8">
        <div
          id="hero"
          className="border-4 w-full border-green-600 py-4 px-16 text-4xl font-bold flex justify-center"
        >
          Quiz Application
        </div>
        <div className="border flex flex-col p-16 ">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default page;
