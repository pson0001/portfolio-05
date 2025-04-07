import c from "./app.module.scss";
import Home from "./components/home/Home";
import Nav from "./components/nav/Nav";

function App() {
  return (
    <div className={c.container}>
      <Nav />
      <Home />
    </div>
  );
}

export default App;
