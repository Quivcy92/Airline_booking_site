"use client";
import Input from "@/components/Input/Input";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaPlane } from "react-icons/fa";
import { FaUserTie, FaCalendarDay } from "react-icons/fa6";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SelectInput from "@/components/Input/SelectInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormLabel } from "@chakra-ui/react";
import LocationCard from "@/components/Card/LocationCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchFlights,
  fetchFromLocation,
  fetchToLocation,
  openSearchFlightsModal,
} from "@/redux/features/AppSlice";
import SearchFlightsModal from "@/components/Modal/SearchFlightsModal";
import { useDispatch } from "react-redux";

export default function Home() {
  const passengerRef: any = useRef();
  const toCardRef: any = useRef();
  const fromCardRef: any = useRef();
  const dateRef: any = useRef();
  const dispatch = useAppDispatch();
  const { fromLocation, toLocation } = useAppSelector(
    (state) => state.AppSlice
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [isRoundtrip, setIsRoundTrip] = useState(false);
  const [isFromCard, setIsFromCard] = useState(false);
  const [isToCard, setIsToCard] = useState(false);
  const [formData, setFormData] = useState<{
    from: string;
    to: string;
    ticket: string;
  }>({
    from: "",
    to: "",
    ticket: "economy",
  });

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleFromLocation = [...fromLocation].map((item: any) => {
    return item.name;
  });
  const handleToLocation = [...toLocation].map((item: any) => {
    return item.name;
  });
  // console.log(
  //   handleFromLocation,
  //   formData.to,
  //   formData.from,
  //   "handleToLocation"
  // );
  const [options, setOptions] = useState<any>({
    adult: 1,
    children: 0,
  });
  const handleOption = (name: any, operation: any) => {
    setOptions((prev: any) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleInputChange = (e: any) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClickOutside = (event: any) => {
    if (dateRef.current && !dateRef.current.contains(event.target)) {
      setOpenDate(false);
    }
    if (
      fromCardRef.current &&
      !fromCardRef.current.contains(event.target) &&
      !toCardRef.current.contains(event.target)
    ) {
      setIsFromCard(false);
    }
    if (
      toCardRef.current &&
      !toCardRef.current.contains(event.target) &&
      !fromCardRef.current.contains(event.target)
    ) {
      setIsToCard(false);
    }
    if (passengerRef.current && !passengerRef.current.contains(event.target)) {
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    dispatch(fetchFromLocation());
    dispatch(fetchToLocation());
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-24 px-2 sm:px-8">
      <div className="flex flex-col justify-center items-center p-8 gap-4">
        <h1 className="text-5xl font-semibold text-center max-w-[40rem]">
          Fulfill your dream of experiencing the world
        </h1>
        <div className="flex flex-col pt-4 justify-center items-center gap-8 w-full">
          <div className="w-full h-[1px] bg-[#3A393B]" />
          <div className="w-full h-[1px] bg-[#3A393B]" />
        </div>
        <div className="p-16 w-full flex justify-center items-center">
          <button className="text-white bg-[#3A393B] rounded-2xl px-6 p-4">
            Fly with us
          </button>
        </div>
      </div>
      <div className="sm:p-8 px-4 py-8 transition-all border rounded-xl max-w-[40rem] w-full flex flex-col gap-4 shadow-md">
        <div className="w-full flex justify-start items-center gap-4 sm:gap-8">
          <div
            onClick={() => setIsRoundTrip(false)}
            className="flex justify-center items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-[#ebebeb]"
          >
            <input
              checked={!isRoundtrip}
              readOnly
              className="w-8 h-8 cursor-pointer"
              type="radio"
              name="trip_type"
              id=""
            />
            <strong className="pr-4">One-way</strong>
          </div>
          <div
            onClick={() => setIsRoundTrip(true)}
            className="flex justify-center items-center gap-2 p-2 rounded-full cursor-pointer hover:bg-[#ebebeb]"
          >
            <input
              checked={isRoundtrip}
              className="w-8 h-8 cursor-pointer"
              type="radio"
              readOnly
              name="trip_type"
              id=""
            />
            <strong className="pr-4">Roundtrip</strong>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative " ref={fromCardRef}>
            <div onClick={() => setIsFromCard(true)}>
              <Input
                placeholder={"Origin"}
                islabel
                label="From"
                value={formData.from}
                name={"from"}
                onChange={handleInputChange}
              />
            </div>
            {isFromCard && (
              <LocationCard
                setFormData={setFormData}
                setIsCardOpen={setIsFromCard}
                type={"from"}
                query={formData.from}
              />
            )}
          </div>
          <div className="relative " ref={toCardRef}>
            <div onClick={() => setIsToCard(true)}>
              <Input
                placeholder={"Destination"}
                islabel
                label="To"
                value={formData.to}
                name={"to"}
                onChange={handleInputChange}
              />
            </div>
            {isToCard && (
              <LocationCard
                setFormData={setFormData}
                setIsCardOpen={setIsToCard}
                type={"to"}
                query={formData.to}
              />
            )}
          </div>
        </div>
        <div
          className="cursor-pointer relative flex flex-col justify-start items-start gap-1 w-full"
          ref={dateRef}
        >
          <FormLabel fontSize={14} className="!m-0 text-sm !font-semibold">
            Departure
          </FormLabel>
          <div
            onClick={() => setOpenDate(!openDate)}
            className="hover:bg-[#ebebeb] transition-all border p-4 px-6 text-[#7c7c7c] flex justify-start items-center gap-4 rounded-md w-full"
          >
            <FaCalendarDay fontSize={24} className="headerIcon" />
            <span className="headerSearchText">
              {`${format(dates[0].startDate, "MM/dd/yyyy")} `}{" "}
            </span>
          </div>

          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item: any) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
            />
          )}
        </div>
        {isRoundtrip && (
          <div className="cursor-pointer relative flex flex-col justify-start items-start gap-1 w-full">
            <FormLabel fontSize={14} className="!m-0 text-sm !font-semibold">
              Return
            </FormLabel>
            <div
              onClick={() => setOpenDate(!openDate)}
              className="hover:bg-[#ebebeb] transition-all border p-4 px-6 text-[#7c7c7c] flex justify-start items-center gap-4 rounded-md w-full"
            >
              <FaCalendarDay fontSize={24} className="headerIcon" />
              <span className="headerSearchText">
                {`${format(dates[0].endDate, "MM/dd/yyyy")}`}
              </span>
            </div>
          </div>
        )}
        <SelectInput
          options={["Economy", "Premium", "Business", "First Class"]}
          islabel
          label="Ticket Class"
          name={"ticket"}
          onChange={handleInputChange}
        />
        <div className="cursor-pointer relative" ref={passengerRef}>
          <div
            onClick={() => setOpenOptions(!openOptions)}
            className="hover:bg-[#ebebeb] transition-all border p-4 px-6 text-[#7c7c7c] flex justify-start items-center gap-4 rounded-md"
          >
            <FaUserTie fontSize={24} className="headerIcon" />
            <span className="">
              {`${options.adult} adult · ${options.children} children`}
            </span>
          </div>
          {openOptions && (
            <div className="absolute top-14 w-[13rem] z-10 bg-black text-[#d3d3d3] left-0">
              <div className="px-4 p-2 gap-4 flex justify-between items-center">
                <span className="optionText">Adult</span>
                <div className="flex justify-center items-center gap-2">
                  <button
                    disabled={options.adult <= 1}
                    className="p-2 text-xl border"
                    onClick={() => handleOption("adult", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.adult}</span>
                  <button
                    className="p-2 text-xl border"
                    onClick={() => handleOption("adult", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="px-4 p-2 gap-4 flex justify-between items-center">
                <span className="optionText">Children</span>
                <div className="flex justify-center items-center gap-2">
                  <button
                    disabled={options.children <= 0}
                    className="p-2 text-xl border"
                    onClick={() => handleOption("children", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">
                    {options.children}
                  </span>
                  <button
                    className="p-2 text-xl border"
                    onClick={() => handleOption("children", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center translate-y-16">
          <button
            onClick={() => {
              if (
                Boolean(formData.from === "") ||
                Boolean(formData.to === "") ||
                !handleFromLocation.includes(formData.from) ||
                !handleToLocation.includes(formData.to)
              ) {
                return;
              }

              localStorage.setItem(
                "my-flight-details",
                JSON.stringify({
                  ...formData,
                  ...options,
                  startDate: dates[0].startDate,
                  endDate: dates[0].endDate,
                  isRoundtrip,
                })
              );
              dispatch(
                fetchFlights({
                  originId: formData.from,
                  destinationId: formData.to,
                  roundTrip: isRoundtrip,
                })
              );
              dispatch(openSearchFlightsModal());
            }}
            className="text-white bg-[#3A393B] hover:bg-[#676569] rounded-full px-8 p-4 flex gap-2 justify-center items-center"
          >
            <FaPlane fontSize={22} />
            Search
          </button>
        </div>
      </div>
      <SearchFlightsModal
        formData={formData}
        dates={dates}
        isRoundtrip={isRoundtrip}
        passenger={options}
      />
    </main>
  );
}
