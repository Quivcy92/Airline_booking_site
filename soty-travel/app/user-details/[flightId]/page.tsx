/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Input from "@/components/Input/Input";
import SelectInput from "@/components/Input/SelectInput";
import { fetchFlight, processBooking } from "@/redux/features/AppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsDashLg } from "react-icons/bs";
import { Spinner, useToast } from "@chakra-ui/react";
type Props = {};

const page = (props: Props) => {
  const { flightId } = useParams();
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isProcessBooking, stripeUrl, errorMessage } = useAppSelector(
    (state) => state.AppSlice
  );
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
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    flightId,
    ticket_class: flightData.ticket,
    no_of_tickets: flightData.adult + flightData.children,
  });
  useEffect(() => {
    const data = localStorage.getItem("my-flight-details");

    let flightdata = data ? JSON.parse(data) : null;
    if (flightdata) setFlightData(flightdata);
  }, []);
  const dispatch = useAppDispatch();
  const {} = useAppSelector((state) => state.AppSlice);
  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlePlaceOrder = () => {
    if (isLoading) return;
    const isFormDataValid = Object.values(formData).every(
      (value) => value !== ""
    );
    if (isFormDataValid) {
      setIsLoading(true);
      dispatch(processBooking(formData));
    } else {
      toast({
        title: "Input Field Incomplete",
        description: "Put in the required information to proceed",
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "top-accent",
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    if (isProcessBooking.isSuccess && stripeUrl) {
      console.log(stripeUrl);
      router.push(stripeUrl);
    }
    if (
      (isProcessBooking.isSuccess && !stripeUrl) ||
      isProcessBooking.isError
    ) {
      toast({
        title: "Payment Failed",
        description: errorMessage,
        status: "error",
        duration: 2000,
        isClosable: true,
        variant: "top-accent",
        position: "top-right",
      });
    }
  }, [isProcessBooking, router, stripeUrl, toast, errorMessage]);

  useEffect(() => {
    dispatch(fetchFlight(flightId));
    setIsLoading(false);
  }, [dispatch, flightId]);
  return (
    <div className="flex flex-col gap-2 justify-start items-center w-full">
      <div className="sm:p-8 p-4 pt-12 max-w-[60rem] w-full flex flex-col justify-start items-start gap-2">
        <p className="text-[#666666] text-lg">
          Flight from{" "}
          <span className="text-black">
            {flightData.from} to {flightData.to}
          </span>
        </p>
        <p className="text-[#666666] text-lg">
          Ticket Class:{" "}
          <span className="text-black capitalize">{flightData.ticket}</span>
        </p>
      </div>
      <div className="sm:p-8 p-4 sm:pt-4 flex flex-col justify-start items-start max-w-[60rem] w-full gap-4">
        <div className="flex flex-col gap-2 justify-start items-start w-full max-w-60 sm:max-w-80">
          <span className="text-lg font-semibold">Booking Info</span>
          <div className="flex justify-center items-center h-[4px] w-full rounded-full bg-black" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Input
            placeholder="Enter your first name"
            name={"first_name"}
            onChange={handleInputChange}
            islabel
            label="First Name"
          />
          <Input
            placeholder="Enter your last name"
            name={"last_name"}
            onChange={handleInputChange}
            islabel
            label="Last Name"
          />
          <Input
            placeholder="Enter your mobile number"
            name={"mobile_number"}
            onChange={handleInputChange}
            islabel
            label="Mobile Number"
          />
          <Input
            placeholder="Enter your email"
            name={"email"}
            onChange={handleInputChange}
            islabel
            label="Email Address"
          />
        </div>
        <div className="flex justify-end items-center w-full pb-16">
          <button
            onClick={handlePlaceOrder}
            className="p-3 h-12 sm:w-48 px-8 bg-black transition-all w-full hover:bg-[#464646] text-white rounded-md"
          >
            {isLoading ? <Spinner /> : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
