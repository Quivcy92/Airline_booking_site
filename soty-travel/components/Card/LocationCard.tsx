import {
  fetchFromLocation,
  fetchToLocation,
  setFormIdData,
} from "@/redux/features/AppSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

type Props = {
  type: "to" | "from";
  query: string;
  setIsCardOpen: (t: any) => void;
  setFormData: (t: any) => void;
};

const LocationCard = ({ setIsCardOpen, query, setFormData, type }: Props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const { fromLocation, toLocation, isFromLocationState, isToLocationState } =
    useAppSelector((state) => state.AppSlice);

  useEffect(() => {
    switch (type) {
      case "from":
        switch (true) {
          case isFromLocationState.isSuccess:
            setisLoading(false);
            setData(fromLocation);
            break;
          case isFromLocationState.isLoading:
            setisLoading(true);
            break;
          case isFromLocationState.isError:
            setisLoading(false);
            break;
          default:
            break;
        }
        break;
      case "to":
        switch (true) {
          case isToLocationState.isSuccess:
            setisLoading(false);
            setData(toLocation);
            break;
          case isToLocationState.isLoading:
            setisLoading(true);
            break;
          case isToLocationState.isError:
            setisLoading(false);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }, [
    fromLocation,
    isFromLocationState.isError,
    isFromLocationState.isLoading,
    isFromLocationState.isSuccess,
    isToLocationState.isError,
    isToLocationState.isLoading,
    isToLocationState.isSuccess,
    toLocation,
    type,
  ]);
  useEffect(() => {
    switch (type) {
      case "from":
        if (query && query.length >= 3) {
          dispatch(fetchFromLocation(query));
          break;
        }
        dispatch(fetchFromLocation());
        break;
      case "to":
        if (query && query.length >= 3) {
          dispatch(fetchToLocation(query));
          break;
        }
        dispatch(fetchToLocation());
      default:
        break;
    }
  }, [dispatch, type, query]);

  const handleCardItemSelect = (item: { id: string; name: string }) => {
    switch (type) {
      case "from":
        dispatch(setFormIdData({ from: item.id }));
        setFormData((prev: any) => ({ ...prev, from: item.name }));
        setIsCardOpen(false);
        return;
      case "to":
        dispatch(setFormIdData({ to: item.id }));
        setFormData((prev: any) => ({ ...prev, to: item.name }));
        setIsCardOpen(false);
        return;
      default:
        break;
    }
  };

  return (
    <div className="z-20 max-h-48 absolute min-h-16 overflow-y-auto flex flex-col w-full justify-start gap-1 items-start top-16 border text-indigo-800 bg-white overflow-x-hidden">
      {isLoading && <Spinner />}

      {!isLoading && data.length ? (
        data.map((item: { id: string; name: string }) => (
          <div
            onClick={() => handleCardItemSelect(item)}
            className="hover:bg-gray-100 p-2 w-full text-ellipsis cursor-pointer text-black text-sm"
            key={item.id}
          >
            {item.name}
          </div>
        ))
      ) : (
        <h4 className="p-2">No location meets this criteria</h4>
      )}
    </div>
  );
};

export default LocationCard;
