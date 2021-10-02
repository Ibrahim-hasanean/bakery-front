// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { indigo } from "@material-ui/core/colors";
import NavBar from "./layout/NavBar";
import ProtectRoute from "./component/ProtectRoutes/ProtectRoute";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/authContext";
import User from "./pages/User";
import Flour from "./pages/Flour";
import Breed from "./pages/Breed";
import Debt from "./pages/Debt";
import Paid from "./pages/Paid";
import Orders from "./pages/Orders";
import Admins from "./pages/Admins";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: indigo["800"],
    },
  },
});
function App() {
  // #0b1e86
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

  return (
    <div className="App">
      <header className="App-header">
        <StylesProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AuthContextProvider>
                <Router>
                  <NavBar />
                  <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectRoute exact path="/" component={Home} />
                    <ProtectRoute exact path="/flour" component={Flour} />
                    <ProtectRoute exact path="/breed" component={Breed} />
                    <ProtectRoute exact path="/debt" component={Debt} />
                    <ProtectRoute exact path="/payed" component={Paid} />
                    <ProtectRoute exact path="/orders" component={Orders} />
                    <ProtectRoute exact path="/admins" component={Admins} />
                    <ProtectRoute exact path="/user/:id" component={User} />
                  </Switch>
                </Router>
              </AuthContextProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </header>
    </div>
  );
}

export default App;
