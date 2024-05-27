"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline, IoDownloadOutline } from "react-icons/io5";
import { FaPlane, FaYoutube } from "react-icons/fa";
import { Flex, Progress, Spinner } from "@chakra-ui/react";
import { closeSearchFlightsModal } from "@/redux/features/AppSlice";

type Props = {
  passenger: {
    adult: number;
    children: number;
  };
  isRoundtrip: boolean;
  dates: { startDate: Date; endDate: Date; key: string }[];
  formData: {
    from: string;
    to: string;
    ticket: string;
  };
};

const SearchFlightsModal = ({
  isRoundtrip,
  dates,
  formData,
  passenger,
}: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const router = useRouter();
  const { isSearchFlightModal, isFlightsState, formIdData } = useAppSelector(
    (state) => state.AppSlice
  );
  const dispatch = useAppDispatch();
  const dateA = new Date(dates[0].startDate);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
  };
  const formattedDate = `${dateA.toLocaleDateString("en-US", options)}`;

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      // dispatch(closeFailureModal());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isFlightsState.isSuccess && isSearchFlightModal) {
      router.push(`/flights/${formIdData.from}/${formIdData.to}`);
      dispatch(closeSearchFlightsModal());
    }
  }, [isFlightsState, dispatch, router, isSearchFlightModal, formIdData]);

  return (
    <AnimatePresence mode="wait">
      {isSearchFlightModal && (
        <motion.div
          key={"susccess-modal-overlay"}
          ref={modalOverlayRef}
          className="
                    z-50 fixed inset-0
                    flex items-center justify-center
                    bg-[#00000066] p-8 backdrop-filter backdrop-blur-sm h-screen overflow-hidden
                  "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              delay: 0.25,
              ease: "easeOut",
              duration: 0.25,
            },
          }}
          transition={{ delay: 0, ease: "easeOut", duration: 0.25 }}
        >
          <motion.div
            key={"success-modal"}
            ref={modalRef}
            initial={{ y: "-1000%" }}
            animate={{ y: "0" }}
            exit={{
              y: "-1000%",
              transition: {
                delay: 0,
                ease: "easeOut",
                duration: 0.25,
              },
            }}
            transition={{
              delay: 0.25,
              ease: "easeOut",
              duration: 0.25,
              type: "spring",
            }}
            className={`px-16 relative max-w-[30rem] text-black p-8 w-full flex flex-col justify-center items-center gap-4 bg-white rounded-lg z-[60]`}
          >
            <h4 className="text-[#6d6d6d]">Finding the best fares for you</h4>
            <div className="text-black font-bold flex w-full justify-between items-center gap-2">
              <h4>{formData.from}</h4>
              <FaPlane fontSize={22} />

              <h4>{formData.to}</h4>
            </div>
            <div className="text-[#6d6d6d] text-sm font-semibold">
              {formattedDate}
            </div>
            <h4 className="text-[#6d6d6d] capitalize text-sm font-semibold">
              {passenger.adult + passenger.children}{" "}
              {passenger.adult + passenger.children > 1
                ? "Passengers"
                : "Passenger"}
              {""}, {formData.ticket}
            </h4>
            <div></div>

            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.600"
              size="xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default SearchFlightsModal;
