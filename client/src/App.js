import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";

function App() {
  return (
    <section className="app">
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </section>
  );
}

export default App;
