import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Helmet } from "react-helmet";
import ReservationsList from "./ReservationsList";

const IndexPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <Helmet>
        <title>Reservations</title>
      </Helmet>
      <ReservationsList />
    </>
  );
};

export default IndexPage;
