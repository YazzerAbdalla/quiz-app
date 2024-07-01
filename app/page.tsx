"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { postQuizEmail } from "./(api)/quizScores";
import { useRouter } from "next/navigation";

// Dynamically import the Home component with no SSR to prevent hydration errors
const HomeComponent = dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

function Home() {
  const [value, setValue] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await postQuizEmail(value);
    if (result?.status === 200) {
      router.push("/quiz"); // Redirect to the quiz page
    }
  };

  return (
    <div className="mt-24 flex w-full flex-col justify-center items-center">
      <div>
        <div
          id="hero"
          className="border-4 border-green-600 py-4 px-16 w-fit text-4xl font-bold"
        >
          Quiz Application
        </div>
      </div>
      <div>
        <div className="mt-4">
          <ol className="list-decimal">
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
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            id="email-input"
            className="flex flex-col justify-center items-center gap-5 mt-8"
          >
            <input
              type="email"
              placeholder="Username*"
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
