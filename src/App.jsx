import { useState } from "react";

import c from "./app.module.scss";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";
import BottomNav from "./components/nav/BottomNav";

function App() {
  const [sPosition, setSPosition] = useState([0, 0]);
  const getSPosition = (position) => {
    console.log(position);
    setSPosition(position);
  };
  return (
    <div className={c.container}>
      <Nav />
      <Home />
      {/* <BottomNav /> */}
    </div>
  );
}

export default App;
