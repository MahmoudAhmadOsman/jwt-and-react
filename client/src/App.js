import Home from "./components/Home";
import Navbar from "./components/Navbar";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Contact from "./components/Contact";
import Todos from "./components/Todos";
import Admin from "./components/Admin";
import PrivateRoute from "./privateRoutes/PrivateRoute";
import Restricted from "./components/Restricted";
import RestrictedPrivateRoute from "./privateRoutes/RestrictedPrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <section className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <RestrictedPrivateRoute path="/login" component={Login} />
          <RestrictedPrivateRoute path="/register" component={Register} />
          <RestrictedPrivateRoute path="/restricted" component={Restricted} />

          {/* Protected Route */}
          <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />

          {/* Protected Route */}
          <PrivateRoute
            path="/todos"
            roles={["user", "admin"]}
            component={Todos}
          />
          <Route path="/restricted" component={Restricted} />
          {/* <Route path="/restricted">
            <Restricted />
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </section>
  );
}

export default App;
