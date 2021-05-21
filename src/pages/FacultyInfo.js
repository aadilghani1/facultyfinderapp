import { Avatar } from "@material-ui/core";
import { useState } from "react";
import { db } from "../firebase";

const FacultyInfo = ({ faculty }) => {
  const [feedback, setFeedback] = useState("");
  const sendFeedback = (e) => {
    e.preventDefault();
    db.collection("faculties")
      .doc(faculty.id)
      .update({
        feedbacks: [...faculty.feedbacks, feedback],
      })
      .then(() => setFeedback(""))
      .catch((err) => console.log(err));
  };
  return (
    <div className="pl-40 py-14 flex flex-col space-y-7">
      <div className="p-5 rounded-sm shadow-lg max-w-lg flex flex-col space-y-3">
        <div className="flex space-x-4">
          <Avatar src={faculty.photoURL} />
          <h3 className="text-gray-700 text-2xl">
            {faculty.name} {faculty.lastName}
          </h3>
        </div>
        <h3 className="pl-14 text-gray-700 text-xl">Email: {faculty.email}</h3>
        <h3 className="pl-14 text-gray-700 text-xl">Faculty Id:{faculty.id}</h3>
      </div>
      <div className="flex flex-row space-x-2 p-5 justify-between items-center bg-white shadow-xl rounded-md  max-w-xl">
        <div className="flex flex-col">
          <p className="text-gray-400 text-xs ">Give your Feedbacks</p>
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-auto text-md text-gray-600 border-none font-medium focus:outline-none"
          />
        </div>
        <button
          onClick={sendFeedback}
          className="px-8 py-2 rounded-md bg-purple-500 text-white text-lg focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default FacultyInfo;
