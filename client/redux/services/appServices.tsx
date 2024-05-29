import axios from "axios";

const API = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
});

//  Auth Register
export const FetchFromLocation = async (query: any) => {
  const { data } = await API.get("/location", { params: { name: query } });
  console.log(data, "from");

  return data;
};
export const FetchToLocation = async (query: any) => {
  const { data } = await API.get("/location", { params: { name: query } });
  console.log(data, "to");

  return data;
};
export const FetchFlights = async (query: any) => {
  console.log("query",query);
  const { data } = await API.get("/flights", {
    params: {
      originId: query.originId,
      destinationId: query.destinationId,
      roundTrip: query.roundTrip,
    },
  });
  console.log(data, "flights");
  return data;
};

export const ProcessBooking = async (body: any) => {
  console.log(body);
  const { data } = await API.post("/booking", body);
  console.log(data);
  return data;
};

export const FetchFlight = async (id: string) => {
  const { data } = await API.get(`/flights/${id}`);
  console.log(data);
  return data;
};
