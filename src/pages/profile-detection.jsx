import { useState } from "react";
import { LiaRobotSolid } from "react-icons/lia";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { identificationFetch } from "../api/api";

const inputs = {
  name: "Name",
  favourites_count: "Favorite's Count",
  screen_name: "Screen Name",
  listed_count: "Listed Count",
  statuses_count: "Statuses Count",
  profile_background_color: "Profile Background Color",
  followers_count: "Followers Count",
  profile_link_color: "Profile Link Color",
  friends_count: "Friends Count",
};

const inputDataKeys = Object.keys(inputs);

const ProfileDetection = () => {
  const [prediction, setPrediction] = useState(undefined);
  const [inputData, setInputData] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //   input onchange
  const inputChange = (key, value) => {
    if (prediction !== undefined) {
      setPrediction(undefined);
    }
    setInputData((pre) => {
      const temp = { ...pre };
      temp[key] = value;
      return temp;
    });
  };

  //   data submit
  const dataSubmit = () => {
    setIsSubmit(true);
    identificationFetch(inputData)
      .then((res) => {
        const { prediction } = res;
        setPrediction(prediction);
        setIsSubmit(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmit(false);
      });
    // console.log(inputData);
  };

  return (
    <div className=" w-full h-screen pb-7 overflow-hidden bg-[url('/img/bg.png')] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-end">
      <div className=" w-[90%] h-[87%] relative p-5 bg-white rounded-2xl rounded-tl-none drop-shadow-lg border border-blue-400">
        <div className=" absolute -top-12 pt-3 left-0 h-12 w-[250px] bg-white rounded-t-2xl drop-shadow-md flex justify-center border border-blue-400">
          <LiaRobotSolid className=" text-3xl -mt-[1px] mr-3 text-blue-600" />
          <h3 className=" font-bold text-blue-600">Bot Profile Detection</h3>
        </div>
        <div className=" absolute top-[-1px] left-[0px] w-[250px] h-5 bg-white" />
        <h3 className=" ml-12 mb-7 text-lg font-semibold">
          Enter the Bot Details Here
        </h3>
        {/* Input Sections */}
        <div className=" w-full px-12 grid grid-cols-2 gap-x-12 gap-y-4">
          {inputDataKeys.map((inputkey) => (
            <input
              key={inputkey}
              className=" outline-none py-2 px-3 border border-blue-400 rounded-md drop-shadow-md"
              name={inputkey}
              value={inputData[inputkey] ? inputData[inputkey] : ""}
              onChange={(e) => inputChange(inputkey, e.target.value)}
              placeholder={inputs[inputkey]}
            />
          ))}
        </div>
        <div className=" w-full flex flex-col items-center">
          <button
            disabled={isSubmit}
            onClick={dataSubmit}
            className=" bg-blue-600 disabled:bg-blue-400 mt-14 py-1 px-9 rounded-md text-white font-semibold"
          >
            Submit
          </button>
          {prediction === undefined ? (
            <p
              className={` mt-5 text-sm font-semibold ${
                isSubmit && "text-blue-600"
              }`}
            >
              {isSubmit
                ? "Please wait... We’re checking your text"
                : "Your Bot Profile Status will show here"}
            </p>
          ) : (
            <div className=" mt-5 flex items-center">
              {prediction === "real" ? (
                <AiOutlineCheckCircle className=" text-lg text-green-600" />
              ) : (
                <AiOutlineCloseCircle className=" text-lg text-red-600" />
              )}
              <p
                className={` text-sm ml-1 font-bold ${
                  prediction === "real" ? "text-green-600" : "text-red-600"
                }`}
              >
                {`${prediction}`.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetection;
