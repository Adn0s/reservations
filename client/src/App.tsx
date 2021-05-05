import React from "react";
import { Redirect, Router } from "@reach/router"
import { Route } from "./common/routes";
import IndexPage from "./components/IndexPage";
import CreateReservationPage from "./components/CreateReservationPage";


const App: React.FC = () => {
  return (
    <Router>
      <IndexPage path={Route.HOME} />
      <CreateReservationPage path={Route.CREATE_RESERVATION} />
      <Redirect from="*" to={Route.HOME} noThrow />
    </Router>
  );
};

export default App;
