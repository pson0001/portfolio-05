import { Link } from "react-router";
import c from "./work.module.scss";
import gate from "../assets/projects/gate.png";
import portal from "../assets/projects/portal.png";
import mapper from "../assets/projects/mapper.png";
import peerview from "../assets/projects/peerview.png";
import library from "../assets/projects/library.png";

const Work = () => {
  const projects = [
    {
      name: "Something new and smart",
      description: "Under construction...",
      img: gate,
      shadow: false,
    },
    {
      name: "Student Portal",
      path: "student-portal",
      description:
        "The new Monash University Hub — the student portal for 80,000+ students",
      img: portal,
      shadow: true,
    },
    {
      name: "Course Mapper",
      path: "student-portal",
      description:
        "Generating over 60,000 personalized digital course plans for students",
      img: mapper,
      shadow: true,
    },

    {
      name: "Peerview",
      path: "peerview",
      description:
        "Facilitating seamless academic peer review processes across 10 faculties.",
      img: peerview,
      shadow: true,
    },
    {
      name: "Monash React Component library",
      path: "component-library",
      description:
        "Enabling component sharing across diverse projects and preventing redundant work duplication.",
      img: library,
      shadow: true,
    },
  ];
  return (
    <div className={c.workWrapper}>
      <div className={c.title}>Selected projects</div>
      <div className={c.items}>
        {projects.map((p, index) => (
          <Link
            to={p?.path}
            className={`${c.item} ${!p.path && c.noAccess}`}
            key={index}
          >
            <div className={`${c.img} ${!p.shadow && c.noShadow}`}>
              <img src={p.img} alt="current" />
            </div>
            <div className={c.itemTitle}>{p.name}</div>
            <div className={c.itemDescription}>{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Work;
