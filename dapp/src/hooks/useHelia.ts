import { useContext } from "react";
import { HeliaContext } from "../contexts/HeliaProvider";

export const useHelia = () => {
  const { helia, fs, error, starting } = useContext(HeliaContext);
  return { helia, fs, error, starting };
};
