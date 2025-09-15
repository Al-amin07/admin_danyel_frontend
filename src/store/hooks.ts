// import { AppDispatch, AppRootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootState } from "./store";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<AppRootState>();

export { useAppDispatch, useAppSelector };
