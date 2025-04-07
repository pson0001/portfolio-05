import c from "./work.module.scss";
const Work = () => {
  const projects = [
    {
      name: "Student Portal",
      description: "Enable students to do their best",
    },
    {
      name: "Course Mapper",
      description: "Enable students to do their best",
    },
    {
      name: "Monash React Component library",
      description: "Enable students to do their best",
    },
    {
      name: "Peerview",
      description: "Enable students to do their best",
    },
  ];
  return (
    <div className={c.workWrapper}>
      <div className={c.title}>Selected projects</div>
      <div className={c.items}>
        {projects.map((p, index) => (
          <div className={c.item} key={index}>
            <div className={c.img}></div>
            <div className={c.itemTitle}>{p.name}</div>
            <div>{p.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
