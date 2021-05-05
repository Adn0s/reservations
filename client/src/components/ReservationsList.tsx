import { Link } from "@reach/router";
import React from "react";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import { Route } from "../common/routes";
import useAllReservations from "../hooks/useAllReservations";
import * as ReservationDataService from "../services/ReservationService";
import { ConfirmationDialogProvider } from "./ConfirmationDialog";
import DeleteButton from "./DeleteButton";

const ReservationsTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.5em;
`;
const ReservationName = styled.p`
  font-weight: bold;
  font-size: 1.1em;
`;
const ReservationsList: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    itemRemoved,
    setItemRemoved,
  } = useAllReservations();
  const deleteReservation = (id: number | undefined) => {
    if (!id) {
      return;
    }
    ReservationDataService.remove(id)
      .then(() => {
        setItemRemoved(!itemRemoved);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="flex justify-center w-3/5 ml-auto mr-auto border">
        <div className="flex-col items-center flex-auto space-y-4 border">
          <ReservationsTitle className="">Reservations</ReservationsTitle>
          {isError && <div>Something went wrong ...</div>}
          {isLoading ? (
            <div className="flex items-center justify-center ">
              <Spinner className="w-10 h-10" />
            </div>
          ) : (
            <ConfirmationDialogProvider>
              <div className="flex-col items-center space-y-36 ">
                <ul>
                  <div className="flex-col items-center space-y-2 ">
                    {data.reservations.length === 0 ? (
                      <div className="flex justify-start ">
                        <p>There are no reservations</p>
                      </div>
                    ) : (
                      <div>
                        {data.reservations.map((reservation: Reservation) => (
                          <li key={reservation.id}>
                            <div className="flex justify-between flex-auto pt-4 pb-4 pl-1 pr-1 space-x-4 border-b border-dotted">
                              <ReservationName>
                                {reservation.name}
                              </ReservationName>
                              <div className="flex space-x-5 justify-items-end">
                                {reservation.status === "Todo" && (
                                  <p className="text-red-600">
                                    {reservation.status}
                                  </p>
                                )}
                                {reservation.status === "Ready" && (
                                  <p className="text-green-600">
                                    {reservation.status}
                                  </p>
                                )}
                                {reservation.status === "In progress" && (
                                  <p className="text-yellow-600 ">
                                    {reservation.status}
                                  </p>
                                )}
                                <DeleteButton
                                  name={reservation.name}
                                  callback={() =>
                                    deleteReservation(reservation.id)
                                  }
                                />
                              </div>
                            </div>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </ul>
                <div className="flex justify-end p-5 border border-black">
                  <Link to={Route.CREATE_RESERVATION}>
                    <button className="w-48 p-3 text-white bg-green-500 border border-black rounded-md ">
                      Create Reservation
                    </button>
                  </Link>
                </div>
              </div>
            </ConfirmationDialogProvider>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationsList;
