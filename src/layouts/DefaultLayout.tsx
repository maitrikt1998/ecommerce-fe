import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { Navigate } from "react-router-dom";

const DefaultLayout = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);
  console.log(basicUserInfo);
  if (basicUserInfo && basicUserInfo.status === 1) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default DefaultLayout;