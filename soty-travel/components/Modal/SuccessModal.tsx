"use client";
import { closeSuccessModal } from "@/redux/features/AppSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline, IoDownloadOutline } from "react-icons/io5";

type Props = {};

const SuccessModal = (props: Props) => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const router = useRouter();
  const { isSuccessModal } = useAppSelector((state) => state.AppSlice);
  const dispatch = useAppDispatch();

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      dispatch(closeSuccessModal());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isSuccessModal && (
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
            className={`md:px-16 px-4 relative max-w-[40rem] text-black p-8 w-full flex flex-col justify-center items-center gap-4 bg-white rounded-lg z-[60]`}
          >
            <div
              onClick={() => dispatch(closeSuccessModal())}
              className=" absolute top-2 right-2 p-1 flex justify-center items-center cursor-pointer"
            >
              <IoCloseCircleOutline fontSize={32} />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-[#1D9D21]">
              <IoIosCheckmarkCircleOutline fontSize={72} />
              <p className="text-2xl font-semibold">Payment Success</p>
            </div>
            <div className="p-4 bg-[#F8F8F8] flex flex-col gap-2 w-full">
              <div className="flex w-full justify-between items-center text-[#9B9898] gap-2">
                <h4 className="text-sm">Payment type</h4>
                <h4 className="text-sm">Net Banking</h4>
              </div>
              <div className="h-[1px] w-full bg-[#DADADA]" />
              <div className="flex w-full justify-between items-center text-[#9B9898] gap-2">
                <h4 className="text-sm">Phone Number</h4>
                <h4 className="text-sm">08010000100</h4>
              </div>
              <div className="h-[1px] w-full bg-[#DADADA]" />
              <div className="flex w-full justify-between items-center text-[#9B9898] gap-2">
                <h4 className="text-sm">Email Address</h4>
                <h4 className="text-sm">email@dmain.com</h4>
              </div>
              <div className="h-[1px] w-full bg-[#DADADA]" />
              <div className="flex w-full justify-between items-center text-[#9B9898] gap-2">
                <h4 className="text-sm">Transaction ID</h4>
                <h4 className="text-sm">08010000100</h4>
              </div>
              <div className="h-[1px] w-full bg-[#DADADA]" />
              <div className="flex w-full justify-between items-center text-[#9B9898] gap-2">
                <h4 className="text-sm">Amount Paid</h4>
                <h4 className="text-sm">$44.50</h4>
              </div>
              <div className="h-[1px] w-full bg-[#DADADA]" />
              <div className="flex w-full justify-center gap-2 cursor-pointer items-end text-[#9B9898]">
                <IoDownloadOutline fontSize={24} />
                <h4 className="text-sm">Download</h4>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div
                onClick={() => {
                  dispatch(closeSuccessModal());
                  router.push("/shop");
                }}
                className="cursor-pointer flex justify-center items-center text-white rounded-md px-4 p-2 w-full bg-[#2F8FCD]"
              >
                Back to shop
              </div>
              <span className="flex justify-center items-center text-white rounded-md px-4 p-2 w-full bg-[#1C3F95]">
                Order Status
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
