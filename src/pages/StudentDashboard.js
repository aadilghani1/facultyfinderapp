import FacultyList from "./FacultyList";
import Developing from "./Info";

const StudentDashboard = () => {
  return (
    <div className="text-3xl w-full">
      <Developing />
      <FacultyList />
    </div>
  );
};

export default StudentDashboard;
