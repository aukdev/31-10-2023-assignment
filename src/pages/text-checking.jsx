import { useState } from "react";
import {
  AiOutlineCloudUpload,
  AiFillCloseCircle,
  AiFillWarning,
} from "react-icons/ai";
import { defamativeFetch } from "../api/api";

const TextChecking = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [comment, setComment] = useState("");
  const [prediction, setPrediction] = useState(undefined);
  const [error, setError] = useState(false);

  // comment submit
  const commentSubmit = () => {
    setIsSubmit(true);
    defamativeFetch({ comment })
      .then((res) => {
        const { prediction } = res;
        setPrediction(prediction);
        setIsSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setIsSubmit(false);
      });
  };

  return (
    <div className=" w-full h-screen pb-7 overflow-hidden bg-[url('/img/bg.png')] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-end">
      <div className=" w-[90%] h-[80%] relative p-5 bg-white rounded-2xl rounded-tl-none drop-shadow-lg border border-blue-400">
        <div className=" absolute -top-12 pt-3 left-0 h-12 w-[250px] bg-white rounded-t-2xl drop-shadow-md flex justify-center border border-blue-400">
          <AiOutlineCloudUpload className=" text-3xl mr-3 text-black" />
          <h3 className=" font-bold">Upload Command</h3>
        </div>
        <div className=" absolute top-[-1px] left-[0px] w-[250px] h-5 bg-white" />
        {/* text area */}
        <div className="w-full h-3/4 relative drop-shadow-lg rounded-xl overflow-hidden border border-blue-400">
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (prediction !== undefined) {
                setPrediction(undefined);
              }
            }}
            className=" w-full h-full bg-white p-6 outline-none resize-none"
            placeholder="Enter Command Manually"
          />
          {isSubmit && (
            <div className=" absolute top-0 left-0 w-full h-full bg-slate-50/70 flex flex-col items-center justify-center">
              <div className=" flex items-center">
                {error && (
                  <AiFillWarning className=" text-yellow-600 text-lg mr-2" />
                )}
                <p className=" mr-3 text-blue-600 font-semibold">
                  {error
                    ? "Checking Error! Text too long"
                    : "Please wait... We’re checking your text"}
                </p>
                <AiFillCloseCircle
                  onClick={
                    error
                      ? () => {
                          setIsSubmit(false);
                          setError(false);
                        }
                      : () => {}
                  }
                  className=" text-lg text-red-600"
                />
              </div>
            </div>
          )}
        </div>
        <div className=" w-full flex flex-col items-center">
          <button
            disabled={isSubmit}
            onClick={commentSubmit}
            className=" bg-blue-600 disabled:bg-blue-400 mt-7 py-1 px-9 rounded-md text-white font-semibold"
          >
            Submit
          </button>
          {prediction === undefined ? (
            <p className=" mt-5 text-sm font-semibold">
              Your text checking percentage will show here
            </p>
          ) : (
            <p
              className={` mt-5 text-sm font-semibold ${
                prediction === "offensive"
                  ? "text-red-600"
                  : prediction === "normal"
                  ? "text-green-600"
                  : " text-yellow-600"
              }`}
            >
              {prediction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextChecking;
