import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FetchFlight,
  FetchFlights,
  FetchFromLocation,
  FetchToLocation,
  ProcessBooking,
} from "../services/appServices";

export const fetchFromLocation: any = createAsyncThunk(
  "fetch/from/location",
  async (userData, thunkApi) => {
    try {
      return await FetchFromLocation(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const fetchToLocation: any = createAsyncThunk(
  "fetch/to/location",
  async (userData, thunkApi) => {
    try {
      return await FetchToLocation(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const fetchFlight: any = createAsyncThunk(
  "fetch/one/flight",
  async (id: string, thunkApi) => {
    try {
      return await FetchFlight(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const fetchFlights: any = createAsyncThunk(
  "fetch/flights",
  async (flightdata, thunkApi) => {
    try {
      return await FetchFlights(flightdata);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const processBooking: any = createAsyncThunk(
  "post/processBooking",
  async (flightdata, thunkApi) => {
    try {
      return await ProcessBooking(flightdata);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
interface QueryParamsTypes {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
interface FlightType {
  id: string;
  airlineId: string;
  originId: string;
  destinationId: string;
  price: number;
  roundTrip: true;
  departureDate: string;
  arrivalDate: string;
  createdAt: string;
  updatedAt: string;
  airline: {
    id: string;
    name: string;
  };
  origin: {
    id: string;
    name: string;
    code: string;
  };
  destination: {
    id: string;
    name: string;
    code: string;
  };
}
const QueryParams: QueryParamsTypes = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};
interface initialTypes {
  openSubNav: boolean;
  isSuccessModal: boolean;
  isSearchFlightModal: boolean;
  isFilterNav: boolean;
  errorMessage: string;
  isFromLocationState: QueryParamsTypes;
  isToLocationState: QueryParamsTypes;
  isFlightState: QueryParamsTypes;
  isFlightsState: QueryParamsTypes;
  isProcessBooking: QueryParamsTypes;
  formIdData: { from: string; to: string };
  fromLocation: [];
  toLocation: [];
  flights: FlightType[];
  flight: FlightType | null;
  stripeUrl: string | null;
}

const initialState: initialTypes = {
  openSubNav: false,
  isSuccessModal: false,
  isSearchFlightModal: false,
  isFilterNav: false,
  isFromLocationState: QueryParams,
  isToLocationState: QueryParams,
  isFlightState: QueryParams,
  isProcessBooking: QueryParams,
  isFlightsState: QueryParams,
  fromLocation: [],
  toLocation: [],
  flights: [],
  errorMessage: "",
  formIdData: {
    from: "",
    to: "",
  },
  flight: null,
  stripeUrl: null,
};

export const AppSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setFormIdData: (state, { payload }) => {
      if (payload.from) state.formIdData.from = payload.from;
      if (payload.to) state.formIdData.to = payload.to;
    },
    openSearchFlightsModal: (state) => {
      state.isSearchFlightModal = true;
    },
    closeSearchFlightsModal: (state) => {
      state.isSearchFlightModal = false;
    },
    setSubNav: (state) => {
      state.openSubNav = !state.openSubNav;
    },
    closeSubNav: (state) => {
      state.openSubNav = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromLocation.fulfilled, (state, { payload }) => {
        state.isFromLocationState.isLoading = false;
        state.isFromLocationState.isSuccess = true;
        state.isFromLocationState.isError = false;
        state.fromLocation = payload.data;
      })
      .addCase(fetchFromLocation.rejected, (state, { payload }) => {
        state.isFromLocationState.isLoading = false;
        state.isFromLocationState.isSuccess = false;
        state.isFromLocationState.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchFromLocation.pending, (state, { payload }) => {
        state.isFromLocationState.isLoading = true;
        state.isFromLocationState.isSuccess = false;
        state.isFromLocationState.isError = false;
      });
    builder
      .addCase(fetchToLocation.fulfilled, (state, { payload }) => {
        state.isToLocationState.isLoading = false;
        state.isToLocationState.isSuccess = true;
        state.isToLocationState.isError = false;
        state.toLocation = payload.data;
      })
      .addCase(fetchToLocation.rejected, (state, { payload }) => {
        state.isToLocationState.isLoading = false;
        state.isToLocationState.isSuccess = false;
        state.isToLocationState.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchToLocation.pending, (state, { payload }) => {
        state.isToLocationState.isLoading = true;
        state.isToLocationState.isSuccess = false;
        state.isToLocationState.isError = false;
      });
    builder
      .addCase(fetchFlights.fulfilled, (state, { payload }) => {
        state.isFlightsState.isLoading = false;
        state.isFlightsState.isSuccess = true;
        state.isFlightsState.isError = false;
        state.flights = payload.data;
      })
      .addCase(fetchFlights.rejected, (state, { payload }) => {
        state.isFlightsState.isLoading = false;
        state.isFlightsState.isSuccess = false;
        state.isFlightsState.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchFlights.pending, (state, { payload }) => {
        state.isFlightsState.isLoading = true;
        state.isFlightsState.isSuccess = false;
        state.isFlightsState.isError = false;
      });
    builder
      .addCase(fetchFlight.fulfilled, (state, { payload }) => {
        state.isFlightState.isLoading = false;
        state.isFlightState.isSuccess = true;
        state.isFlightState.isError = false;
        state.flight = payload.data;
      })
      .addCase(fetchFlight.rejected, (state, { payload }) => {
        state.isFlightState.isLoading = false;
        state.isFlightState.isSuccess = false;
        state.isFlightState.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(fetchFlight.pending, (state, { payload }) => {
        state.isFlightState.isLoading = true;
        state.isFlightState.isSuccess = false;
        state.isFlightState.isError = false;
      });
    builder
      .addCase(processBooking.fulfilled, (state, { payload }) => {
        state.isProcessBooking.isLoading = false;
        state.isProcessBooking.isSuccess = true;
        state.isProcessBooking.isError = false;
        state.stripeUrl = payload.data.url;
      })
      .addCase(processBooking.rejected, (state, { payload }) => {
        state.isProcessBooking.isLoading = false;
        state.isProcessBooking.isSuccess = false;
        state.isProcessBooking.isError = true;
        state.errorMessage = payload.message;
      })
      .addCase(processBooking.pending, (state, { payload }) => {
        state.isProcessBooking.isLoading = true;
        state.isProcessBooking.isSuccess = false;
        state.isProcessBooking.isError = false;
      });
  },
});
export const {
  setSubNav,
  closeSubNav,
  openSearchFlightsModal,
  closeSearchFlightsModal,
  setFormIdData,
  // closeSuccessModal,
  // openFilterNav,
  // closeFilterNav,
  // openFailureModal,
  // closeFailureModal,
} = AppSlice.actions;
export default AppSlice.reducer;
