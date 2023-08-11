import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import News from "./component/News/News";
import Homepage from "./component/Homepage/Homepage";
import SavedNews from "./component/SavedNews/SavedNews";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/news/:id" component={News} />
        <ProtectedRoute exact path="/saved-news" component={SavedNews} />
        <Route exact path="/" component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
