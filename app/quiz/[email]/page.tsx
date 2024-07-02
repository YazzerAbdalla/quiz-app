"use client";
import { editeQuizScore } from "@/app/(api)/quizScores";
import { putQuizScore } from "@/app/api/(services)/serviceQuizScore";
import { MyChoicesProps } from "@/types/myChoices";
import { quiz } from "@/types/quiz";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const QuizPage = ({ params }: { params: { email: string } }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChoosed, setIsChoosed] = useState({ isChoosed: false, option: "" });
  const [myChoices, setMyChoices] = useState<MyChoicesProps[]>([]);
  console.log("🚀 ~ QuizPage ~ myChoices:", myChoices);
  const router = useRouter();

  const handleChooseOption = (e: React.MouseEvent<HTMLDivElement>) => {
    const newChoice = {
      id: quiz[currentIndex].id,
      choice: e.currentTarget.id,
      answer: quiz[currentIndex].answer,
    };

    setMyChoices((prevChoices) => {
      const updatedChoices = [...prevChoices];
      if (updatedChoices[currentIndex]) {
        updatedChoices[currentIndex] = newChoice;
      } else {
        updatedChoices.push(newChoice);
      }
      return updatedChoices;
    });

    setIsChoosed({ isChoosed: true, option: e.currentTarget.id });
  };

  const handleNextClick = async () => {
    let score = 0;
    if (currentIndex === 9) {
      const calcTheScore = () => {
        myChoices.map((item) => {
          if (item.answer === item.choice) {
            score += 10;
          }
        });
        return score;
      };
      const result = await editeQuizScore({
        email: decodeURIComponent(params.email),
        score: calcTheScore(),
      });
      console.log("🚀 ~ handleNextClick ~ result:", result);

      return router.push(`/score/${params.email}`);
    }
    setCurrentIndex((prev) => prev + 1);
    setIsChoosed({ isChoosed: false, option: "" });
  };

  const handlePrevClick = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="pt-14 flex lg:w-full justify-center">
      <div className="m-0 p-0 flex flex-col items-center lg:max-w-[700px] lg:min-w-[545px] gap-8">
        <div
          id="hero"
          className="border-4 w-full border-green-600 py-4 px-16 lg:text-4xl text-3xl font-bold flex justify-center"
        >
          Quiz Application
        </div>
        <div className=" w-full flex flex-col p-12 ">
          <h1 className="font-semibold lg:text-xl">
            {`${currentIndex + 1}-  `}
            {quiz[currentIndex].question}
          </h1>
          <div className="mt-12 flex flex-col gap-7">
            <div
              id="a"
              onClick={(e) => handleChooseOption(e)}
              className="flex text-gray-400 hover:text-white items-center gap-6"
            >
              <div
                className={`w-8 cursor-pointer p-1 h-8 border-[3px] rounded-full ${
                  (isChoosed.isChoosed && isChoosed.option === "a") ||
                  (myChoices[currentIndex] &&
                    myChoices[currentIndex].choice === "a")
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    (isChoosed.isChoosed && isChoosed.option === "a") ||
                    (myChoices[currentIndex] &&
                      myChoices[currentIndex].choice === "a")
                      ? "bg-green-500"
                      : ""
                  }`}
                ></div>
              </div>
              <h1 className="cursor-pointer">{quiz[currentIndex].options.a}</h1>
            </div>

            <hr className=" border-gray-800" />
            <div
              id="b"
              onClick={(e) => handleChooseOption(e)}
              className="flex text-gray-400 hover:text-white items-center gap-6"
            >
              <div
                className={`w-8 cursor-pointer p-1 h-8 border-[3px] rounded-full ${
                  (isChoosed.isChoosed && isChoosed.option === "b") ||
                  (myChoices[currentIndex] &&
                    myChoices[currentIndex].choice === "b")
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    (isChoosed.isChoosed && isChoosed.option === "b") ||
                    (myChoices[currentIndex] &&
                      myChoices[currentIndex].choice === "b")
                      ? "bg-green-500"
                      : ""
                  }`}
                ></div>
              </div>
              <h1 className="cursor-pointer">{quiz[currentIndex].options.b}</h1>
            </div>
            <hr className=" border-gray-800" />

            <div
              id="c"
              onClick={(e) => handleChooseOption(e)}
              className="flex text-gray-400 hover:text-white items-center gap-6"
            >
              <div
                className={`w-8 cursor-pointer p-1 h-8 border-[3px] rounded-full ${
                  (isChoosed.isChoosed && isChoosed.option === "c") ||
                  (myChoices[currentIndex] &&
                    myChoices[currentIndex].choice === "c")
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    (isChoosed.isChoosed && isChoosed.option === "c") ||
                    (myChoices[currentIndex] &&
                      myChoices[currentIndex].choice === "c")
                      ? "bg-green-500"
                      : ""
                  }`}
                ></div>
              </div>
              <h1 className="cursor-pointer">{quiz[currentIndex].options.c}</h1>
            </div>
            <hr className=" border-gray-800" />

            <div
              id="d"
              onClick={(e) => handleChooseOption(e)}
              className="flex text-gray-400 hover:text-white items-center gap-6"
            >
              <div
                className={`w-8 cursor-pointer p-1 h-8 border-[3px] rounded-full ${
                  (isChoosed.isChoosed && isChoosed.option === "d") ||
                  (myChoices[currentIndex] &&
                    myChoices[currentIndex].choice === "d")
                    ? "border-green-500"
                    : "border-gray-400"
                }`}
              >
                <div
                  className={`w-full h-full rounded-full ${
                    (isChoosed.isChoosed && isChoosed.option === "d") ||
                    (myChoices[currentIndex] &&
                      myChoices[currentIndex].choice === "d")
                      ? "bg-green-500"
                      : ""
                  }`}
                ></div>
              </div>
              <h1 className="cursor-pointer">{quiz[currentIndex].options.d}</h1>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={handlePrevClick}
            type="submit"
            className={`bg-yellow-300 hover:bg-white w-fit py-2 px-8 rounded text-gray-800 ${
              currentIndex === 0 ? "invisible" : ""
            }`}
          >
            Prev
          </button>
          <button
            onClick={handleNextClick}
            type="submit"
            className="bg-green-400 w-fit hover:bg-white px-8 rounded text-gray-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
