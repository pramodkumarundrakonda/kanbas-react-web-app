import { Route, Routes, Navigate } from "react-router";
import KanbasNavigation from "./KanbasNavigation";
import Courses from "./Courses";
import Account from "./Account";
import Dashboard from "./Dashboard";
import db from "./Database";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";

function Kanbas() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
  });
  const API_BASE = process.env.REACT_APP_API_BASE;
  const URL = `${API_BASE}/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(URL);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const addNewCourse = async () => {
    const response = await axios.post(URL, course);
    setCourses([...courses,response.data,]);
    setCourse({ name: "" });
  };
  const deleteCourse = async (id) => {
    const response = await axios.delete(`${URL}/${id}`);
    setCourses(courses.filter((c) => c._id !== id));
  };

  const updateCourse = async () => {
    const response = await axios.put(
      `${URL}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return response.data;
        }
        return c;
      })
    );
  };



  return (
    <Provider store={store}>
      <div className="content d-flex-inline">
        <KanbasNavigation />
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Account" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />

            <Route
              path="Courses/:courseId/*"
              element={<Courses courses={courses} />}
            />
            <Route path="Calendar" element={<h1>Calendar</h1>} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
export default Kanbas;
