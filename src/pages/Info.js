import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";

function Developing() {
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState("");
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    if (user.role === "faculty") {
      db.collection("faculties")
        .doc(user.uid)
        .onSnapshot((snapshot) => {
          setDisplay(snapshot?.data()?.description);
        });
    }
  }, [toggle, display, user?.uid, user?.role]);
  const sendDescription = (e) => {
    e.preventDefault();
    db.collection("faculties")
      .doc(user.uid)
      .update({ description: description })
      .then(() => {
        setDescription("");
        setToggle(!toggle);
      });
  };
  return (
    <div>
      {console.log(user)}
      <div class="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        <div
          id="profile"
          class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-100 mx-6 lg:mx-0"
        >
          <div class="p-4 md:p-12 text-center lg:text-left">
            <div class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center">
              <img
                src={user?.photoURL}
                alt=""
                className="h-48 w-48 rounded-full"
              />
            </div>

            <h1 class="text-3xl font-bold pt-8 lg:pt-0">{user?.name}</h1>
            <div class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p class="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg
                class="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
              </svg>{" "}
              {user?.role === "student" ? "Student 📚 " : ""}
              {user?.role === "faculty" ? "Faculty 📝 " : ""}
            </p>
            <p class="pt-4 text-base  flex items-center justify-center lg:justify-start">
              <svg
                version="1.0"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="1200px"
                height="1200px"
                viewBox="0 0 1200 1200"
                enable-background="new 0 0 1200 1200"
                className="h-5 w-5 mr-3"
              >
                <g>
                  <path
                    fill="#1E653A"
                    d="M152.165,337.386l-2.966-2.561l-2.335,3.16c-0.42,0.359-2.052,0.98-3.026,1.348
		c-3.159,1.198-7.083,2.688-7.608,6.559c-0.478,3.579,2.501,6.207,4.688,7.802L599.325,708.48l489.901-357.542v538.937H110.787
		l-0.029-525.826c1.483-12.625-2.067-17.955-5.317-20.202c-2.815-1.954-6.335-2.187-9.419-0.6c-3.056,1.573-4.973,4.628-5.018,8.02
		v558.383h1017.989V312.01L599.686,683.756L152.165,337.386z"
                  />
                  <path
                    fill="#1E653A"
                    d="M1088.598,290.349H139.121L599.79,646.993L1088.598,290.349z M1027.948,310.124L600.15,622.275
		L196.971,310.124H1027.948z"
                  />
                </g>
              </svg>{" "}
              Email: {user?.email}
            </p>
            <p class="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg
                class="h-4 fill-current text-green-700 pr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
              </svg>{" "}
              Location - AB1, 4th floor Cabin No:- 8
            </p>
            <p class="pt-8 text-sm">
              {user.role === "faculty" ? (
                display?.length > 0 ? (
                  `Description: ${display}`
                ) : (
                  <div className="flex flex-row space-x-2 w-full  py-3 px-5 justify-between items-center bg-white shadow-xl rounded-lg">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="text-md text-gray-600  font-medium  focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={sendDescription}
                      className="px-7 py-3 rounded-md bg-purple-500 text-white text-lg focus:outline-none"
                    >
                      Send
                    </button>
                  </div>
                )
              ) : display.length > 0 ? (
                display
              ) : (
                ""
              )}
            </p>
          </div>
        </div>

        <div class="w-full lg:w-2/5">
          <img
            src={user?.photoURL}
            class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Developing;
