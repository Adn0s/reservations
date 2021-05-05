import { useState, useEffect } from "react";
import * as ReservationDataService from "../services/ReservationService";

const useAllReservations = () => {
  const [data, setData] = useState({ reservations: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await ReservationDataService.getAll();
        setData({ reservations: result.data });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [itemRemoved]);

  return { data, isLoading, isError, itemRemoved, setItemRemoved };
};
export default useAllReservations;
