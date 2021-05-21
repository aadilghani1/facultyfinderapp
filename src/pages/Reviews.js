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
        <h1 class="text-xl font-semibold py-8 lg:pt-0">
          {i + 1}: {feedback}
        </h1>
      ))}
    </div>
  );
};

export default Reviews;
