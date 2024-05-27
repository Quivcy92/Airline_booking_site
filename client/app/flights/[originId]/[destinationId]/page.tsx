/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { fetchFlights } from "@/redux/features/AppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import { BiEdit, BiEditAlt } from "react-icons/bi";
import { TbPointFilled } from "react-icons/tb";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import { BsCurrencyEuro } from "react-icons/bs";
import { Spinner } from "@chakra-ui/react";
import Button from "@/components/Input/Button";

type Props = {};

const page = (props: Props) => {
  const { originId, destinationId } = useParams();
  const dispatch = useAppDispatch();
  const [flightData, setFlightData] = useState<{
    adult: number;
    children: number;
    endDate: number;
    startDate: number;
    ticket: string;
    to: string;
    from: string;
    isRoundtrip: boolean;
  }>({
    adult: 1,
    children: 0,
    endDate: Date.now(),
    startDate: Date.now(),
    ticket: "economy",
    to: "",
    from: "",
    isRoundtrip: false,
  });
  const { isFlightsState, flights } = useAppSelector((state) => state.AppSlice);
  const router = useRouter();
  const dateA = new Date(flightData.startDate);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const time_options: any = {
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = `${dateA.toLocaleDateString("en-US", options)}`;

  useEffect(() => {
    const data = localStorage.getItem("my-flight-details");
    let flightdata = data ? JSON.parse(data) : null;
    if (flightdata) setFlightData(flightdata);

    if (isFlightsState.isError) router.push("/");
    if (!originId || !destinationId) router.push("/");
  }, [router, isFlightsState, originId, destinationId]);
  useEffect(() => {
    dispatch(
      fetchFlights({
        originId,
        destinationId,
        roundTrip: flightData.isRoundtrip,
      })
    );
  }, [destinationId, dispatch, flightData.isRoundtrip, originId]);
  return (
    <div className="flex flex-col gap-2 justify-start items-center w-full">
      <div
        className="bg-[#3A393B] lg:px-32 md:px-16 sm:px-8 px-4 flex flex-col justify-center items-center
       w-full"
      >
        <div className="sm:flex hidden sm:gap-4 gap-2 w-full justify-between items-center ">
          <div className="sm:py-4 p-2 sm:px-8 flex text-sm font-semibold justify-between items-center gap-2 text-white">
            <span className="max-w-32 truncate">{flightData.from}</span>
            <FaArrowRight className="g text-blue-400" />
            <span className="max-w-32 truncate">{flightData.to}</span>
          </div>
          <div className="sm:p-4 whitespace-nowrap p-2 sm:px-8 border-x text-sm font-semibold text-white">
            {formattedDate}
          </div>
          <div className="text-white text-sm font-semibold sm:p-4 p-2 sm:px-8 capitalize">
            {flightData.adult + flightData.children}{" "}
            {flightData.adult + flightData.children > 1
              ? "Passengers"
              : "Passenger"}
            {""}, {flightData.ticket}
          </div>
        </div>
        <div className="sm:hidden flex w-full justify-between items-center">
          <div className="flex flex-col p-4 gap-1">
            <div className="flex text-xl font-semibold justify-between items-center gap-2 text-white">
              <span className="max-w-32 truncate">{flightData.from}</span>
              <FaArrowRight className="g text-blue-400" />
              <span className="max-w-32 truncate">{flightData.to}</span>
            </div>
            <div className="flex justify-center text-white items-center w-full gap-2">
              <div className="whitespace-nowrap text-sm ">{formattedDate}</div>
              <TbPointFilled />
              <div className="text-white text-sm capitalize">
                {flightData.adult + flightData.children}{" "}
                {flightData.adult + flightData.children > 1
                  ? "Passengers"
                  : "Passenger"}
                {""}, {flightData.ticket}
              </div>
            </div>
          </div>
          {/* <div className="text-white p-2">
            <FaEdit fontSize={28} />
          </div> */}
        </div>
      </div>
      <div className="lg:px-32 md:px-16 sm:px-8 p-4 max-w-[70rem] w-full flex justify-start items-center">
        <p className="text-[#666666] text-lg">
          Flights from{" "}
          <span className="text-black">
            {flightData.from} to {flightData.to}
          </span>
        </p>
      </div>
      <div className="max-w-[70rem] pb-16 lg:px-32 md:px-16 sm:px-8 p-4 flex flex-col justify-center w-full items-center">
        <div className="flex flex-col gap-2 w-full">
          {flights.map((flight) => {
            const flightA = new Date(flight.departureDate);
            const flightB = new Date(flight.arrivalDate);

            const formattedTime = `${flightA.toLocaleTimeString(
              "en-US",
              time_options
            )}`;
            const formattedTime_2 = `${flightB.toLocaleTimeString(
              "en-US",
              time_options
            )}`;
            return (
              <div
                key={flight.id}
                className="flex flex-col lg:flex-row w-full border"
              >
                <div className="grid grid-cols-3 w-full lg:w-[60%] gap-1 p-4 py-6">
                  <div className="flex justify-start items-center gap-2 p-2">
                    <MdOutlineFlightTakeoff fontSize={28} />
                    <span className="whitespace text-xs text-blue-400 font-semibold whitespace-nowrap sm:max-w-max max-w-36 truncate">
                      {flight.airline.name}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2 p-2">
                    <div className="flex gap-2 justify-start items-center">
                      <span className="whitespace text-sm font-semibold whitespace-nowrap sm:max-w-max max-w-36 truncate">
                        {formattedTime}
                      </span>
                      <span className="whitespace text-sm whitespace-nowrap sm:max-w-max max-w-36 truncate">
                        ({flight.origin.code})
                      </span>
                    </div>
                    <span className="whitespace text-sm whitespace-nowrap sm:max-w-44 max-w-36 truncate">
                      {flightData.from}
                    </span>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-2 p-2">
                    <div className="flex gap-2 justify-start items-center">
                      <span className="whitespace text-sm font-semibold whitespace-nowrap sm:max-w-max max-w-36 truncate">
                        {formattedTime_2}
                      </span>
                      <span className="whitespace text-sm whitespace-nowrap sm:max-w-max max-w-36 truncate">
                        ({flight.destination.code})
                      </span>
                    </div>
                    <span className="whitespace text-sm whitespace-nowrap sm:max-w-44 max-w-36 truncate">
                      {flightData.to}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center lg:w-[40%] items-start w-full">
                  <div className="flex justify-start items-center w-[40%]">
                    <span className="bg-[#f8f8f8] border-l-2 border-orange-400 text-sm flex w-full justify-center items-center p-4">
                      Pay Full Fare
                    </span>
                  </div>
                  <div className="bg-[#f8f8f8] flex justify-center items-center flex-col p-4 gap-2 w-[60%]">
                    <div className="text-3xl text-blue-500 font-semibold flex justify-center items-center">
                      <BsCurrencyEuro />
                      <span className="">{flight.price.toLocaleString()}</span>
                    </div>
                    <div className="">
                      <Button id={flight.id} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default page;
