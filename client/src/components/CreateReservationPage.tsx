import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Helmet } from "react-helmet";
import { ReservationForm } from "./ReservationForm";

const CreateReservationPage: React.FC<RouteComponentProps> = () => {

  return (
    <>
      <Helmet>
        <title>Create Reservation</title>
      </Helmet>
      <ReservationForm />
    </>
  );
};

export default CreateReservationPage;
