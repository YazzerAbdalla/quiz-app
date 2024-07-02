"use client";
import { getOneQuizInfo } from "@/app/(api)/quizScores";
import QuizScoresProp from "@/types/score";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ScorePage = ({ params }: { params: { email: string } }) => {
  const decodedEmail = decodeURIComponent(params.email);
  const [userQuizInfo, setUserQuizInfo] = useState<
    { _id: string } & QuizScoresProp
  >({ _id: "asd", email: "ladsd", score: 0 });

  const router = useRouter();

  useEffect(() => {
    getOneQuizInfo(decodedEmail).then((result) => {
      setUserQuizInfo(result.data.message.data);
    });
  }, []);
  const handleRestart = () => {
    router.push(`/quiz/${userQuizInfo.email}`);
  };

  return (
    <div className="pt-14 flex w-full justify-center">
      <div className="m-0 p-0 flex flex-col items-center max-w-[700px] min-w-[545px] gap-8">
        <div
          id="hero"
          className="border-4 w-full border-green-600 py-4 px-16 text-4xl font-bold flex justify-center"
        >
          Quiz Application
        </div>
        <div className="border flex flex-col gap-4 p-16 w-full border-gray-400">
          <div className="w-full flex justify-between">
            <h1>Email</h1>
            <h1>{decodedEmail}</h1>
          </div>
          <div className="w-full flex justify-between">
            <h1>Total Quiz Points:</h1>
            <h1>100</h1>
          </div>
          <div className="w-full flex justify-between">
            <h1>Total Questions:</h1>
            <h1>10</h1>
          </div>
          <div className="w-full flex justify-between">
            <h1>Score</h1>
            <h1>{userQuizInfo?.score}</h1>
          </div>
          <div className="w-full flex justify-between">
            <h1>Quiz Result</h1>
            <h1
              className={` font-medium ${
                userQuizInfo.score >= 50 ? "text-green-400" : "text-red-500"
              }`}
            >
              {userQuizInfo.score >= 50 ? "Passed" : "Faild"}
            </h1>
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="bg-yellow-300 w-fit py-2 px-8 rounded text-gray-800"
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
