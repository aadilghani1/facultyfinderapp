import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Reviews = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    db.collection("faculties")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        setFeedbacks(snapshot?.data()?.feedbacks);
      });
  });
  return (
    <div className="pt-10 h-screen pl-24">
      <h1 class="text-3xl font-bold py-8 lg:pt-0">Feedbacks</h1>

      {feedbacks?.map((feedback, i) => (
        <div className="flex my-2 max-w-3xl w-auto  py-3 px-5 justify-between  bg-white hover:bg-gray-50 cursor-pointer shadow-xl rounded-lg">
          <h1 class="text-xl text-gray-500 font-semibold py-8 lg:pt-0">
            {i + 1}: {feedback}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
