import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { db } from "../firebase";

const FacultyList = () => {
  const [faculties, setFaulties] = useState([]);
  const history = useHistory();
  useEffect(() => {
    db.collection("faculties").onSnapshot((snapShot) => {
      setFaulties(snapShot.docs.map((doc) => doc.data()));
    });
  }, []);
  console.log(faculties);
  return (
    <div className="pt-10 h-screen pl-24">
      <h1 class="text-3xl font-bold py-8 lg:pt-0">Faculty List</h1>
      <Autocomplete
        id="Faculties"
        options={faculties}
        getOptionLabel={(option) => `${option.name} ${option.lastName}`}
        style={{ width: 300 }}
        onChange={(e, newValue) =>
          history.push({
            pathname: "/facultyinfo",
            state: { faculty: newValue },
          })
        }
        renderInput={(params) => (
          <TextField {...params} label="Select a Faculty" variant="outlined" />
        )}
      />
    </div>
  );
};

export default FacultyList;
