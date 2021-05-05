import { Link, Redirect } from "@reach/router";
import React, { useState } from "react";
import styled from "styled-components";
import { Route } from "../common/routes";
import * as ReservationDataService from "../services/ReservationService";
import { stores } from "../Stores";

const ReservationsTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 1.5em;
`;

export const ReservationForm: React.FC = () => {
  const initialReservationState = {
    name: "",
    store: "",
    status: "",
  };
  const [reservation, setReservation] = useState(initialReservationState);
  const [submitted, setSubmitted] = useState(false);
  const [inputError, setInputError] = useState({
    name: false,
    store: false,
    status: false,
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setInputError({ ...inputError, [name]: false });
    setReservation({ ...reservation, [name]: value });
  };

  const saveReservation = () => {
    var data = {
      name: reservation.name,
      store: reservation.store,
      status: reservation.status,
    };
    if (data.name === "") {
      setInputError({ ...inputError, name: true });
      return;
    }
    if (data.store === "") {
      setInputError({ ...inputError, store: true });
      return;
    }
    if (data.status === "") {
      setInputError({ ...inputError, status: true });
      return;
    }
    ReservationDataService.create(data)
      .then((response) => {
        setReservation({
          name: response.data.name,
          store: response.data.store,
          status: response.data.status,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex justify-center w-3/5 ml-auto mr-auto border">
      <div className="flex-col items-center flex-auto space-y-4 ">
        <ReservationsTitle className="pl-4">
          Create Reservation
        </ReservationsTitle>
        <div className="submit-form">
          {submitted ? (
            <Redirect noThrow to={Route.HOME} />
          ) : (
            <div>
              <div className="space-y-36">
                <div className="flex-col items-center flex-auto pt-2 pb-2 space-y-4 ">
                  <div className="pl-4 pr-4 form-group">
                    <div className="flex-col items-center pt-2 pb-2 space-y-3">
                      <p
                        className={
                          inputError.name ? "border-b border-red-600" : ""
                        }
                      >
                        Reservation name
                      </p>
                      <input
                        type="text"
                        className="w-full border rounded-sm form-control"
                        id="name"
                        required
                        value={reservation.name}
                        onChange={handleInputChange}
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="pl-4 pr-4 form-group">
                    <div className="flex-col items-center pt-2 pb-2 space-y-2">
                      <p
                        className={
                          inputError.store ? "border-b border-red-600" : ""
                        }
                      >
                        Store
                      </p>
                      <select
                        required
                        id="store"
                        name="store"
                        className="border form-control"
                        onChange={handleInputChange}
                        defaultValue={""}
                      >
                        <option value={""}>-</option>
                        {stores.map((store) => (
                          <option key={store.id} value={store.value}>
                            {store.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="pl-4 pr-4 form-group">
                    <div className="flex-col items-center pt-2 pb-2 space-y-2">
                      <label
                        className={
                          inputError.status ? "border-b border-red-600" : ""
                        }
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <div>
                        <input
                          className="form-control"
                          type="radio"
                          id="todo"
                          name="status"
                          value="Todo"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="Todo">Todo</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="inProgress"
                          name="status"
                          value="In progress"
                          onChange={handleInputChange}
                        />
                        <label className="form-control" htmlFor="In progress">
                          In progress
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="radio"
                          id="ready"
                          name="status"
                          value="Ready"
                          onChange={handleInputChange}
                        />
                        <label htmlFor="other">Ready</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around p-5 border border-black">
                  <Link to={Route.HOME}>
                    <button className="w-48 p-3 text-white bg-gray-500 border border-black rounded-md">
                      Cancel
                    </button>
                  </Link>
                  <button
                    onClick={saveReservation}
                    className="w-48 p-3 text-white bg-green-500 border border-black rounded-md "
                  >
                    Create Reservation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
