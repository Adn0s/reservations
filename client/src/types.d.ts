type Maybe<T> = T | undefined;

type Reservation = {
  id?: number;
  name: string;
  store: string;
  status: string;
};

type setReservation = (reservation: Reservation) => void;
