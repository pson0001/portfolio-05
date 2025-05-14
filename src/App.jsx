import c from "./app.module.scss";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import { Routes, Route } from "react-router";
import StudentPortal from "./components/pages/projects/StudentPortal";
import CourseMapper from "./components/pages/projects/CourseMapper";
import Peerview from "./components/pages/projects/Peerview";
import Library from "./components/pages/projects/Library";

function App() {
  return (
    <div className={c.container}>
      <Nav />

      <Routes>
        <Route index element={<Home />} />
        <Route path="student-portal" element={<StudentPortal />} />
        <Route path="course-mapper" element={<CourseMapper />} />
        <Route path="peerview" element={<Peerview />} />
        <Route path="component-library" element={<Library />} />
      </Routes>
    </div>
  );
}

export default App;
