"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { postQuizEmail } from "./(api)/quizScores";
import { useRouter } from "next/navigation";

// Dynamically import the Home component with no SSR to prevent hydration errors
const HomeComponent = dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

function Home() {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await postQuizEmail(value);
    console.log("🚀 ~ handleSubmit ~ result:", result);
    if (result?.status === 201) {
      router.push(`/quiz/${value}`);
    } else if (result?.response.status === 400) {
      router.push(`/score/${decodeURIComponent(value)}`);
    }
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
          <ol className="list-decimal flex gap-2 flex-col">
            <li className="text-md text-gray-300 font-light">
              You will be asked 10 questions one after another.
            </li>
            <li className="text-md text-gray-300 font-light">
              10 points are awarded for the correct answer.
            </li>
            <li className="text-md text-nowrap text-gray-300 font-light">
              Each question has three options. You can choose only one option.
            </li>
            <li className="text-md text-gray-300 font-light">
              You can review and change answers before the quiz finishes.
            </li>
            <li className="text-md text-gray-300 font-light">
              The result will be declared at the end of the quiz.
            </li>
          </ol>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            id="email-input"
            className="flex flex-col justify-center items-center gap-5 mt-8"
          >
            <input
              type="email"
              placeholder="Email*"
              className="text-black w-72 px-8 rounded py-2"
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-300 w-fit py-2 px-8 rounded text-gray-800"
            >
              Start Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HomeComponent;
