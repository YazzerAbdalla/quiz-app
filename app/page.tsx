
export default function Home() {
  return (
    <div className="mt-24 flex w-full flex-col justify-center items-center">
      <div className="">
        <div
          id="hero"
          className="border-4 border-green-600 py-4 px-16 w-fit text-4xl font-bold"
        >
          Quiz Application
        </div>
      </div>
      <div className="">
        <div className="mt-4">
          <ol className="list-decimal">
            <li className="text-md text-gray-300 font-light">
              You will be asked 10 questions one after another.
            </li>
            <li className="text-md text-gray-300 font-light">
              10 points is awarded fro the correct answer.
            </li>
            <li className="text-md text-nowrap text-gray-300 font-light">
              Each question has three otions. You can choose only one options.
            </li>
            <li className="text-md text-gray-300 font-light">
              You can review and change answers before the quiz finish.
            </li>
            <li className="text-md text-gray-300 font-light">
              The result will be declared at the end of the quiz
            </li>
          </ol>
        </div>
      </div>
      <div className="">
        <div
          id="email-input"
          className=" flex flex-col justify-center items-center gap-5 mt-8"
        >
          <input
            type="text"
            placeholder="Username*"
            className="text-black w-72 px-8 rounded py-2"

          />
          <button className="bg-yellow-300 w-fit py-2 px-8 rounded text-gray-800">
            Sart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
