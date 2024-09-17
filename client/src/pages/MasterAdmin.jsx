import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/MasterAdmin/Login";
import MasterAdminHome from "../components/MasterAdmin/MasterAdminHome";
import useMasterAdmin from "../store/MasterAdmin";

function MasterAdmin() {
  const { isMasterAuthenticated, getMasterAdmin } = useMasterAdmin();

  useEffect(() => {
    if (isMasterAuthenticated === null) getMasterAdmin();
  }, [isMasterAuthenticated]);

  if (isMasterAuthenticated === null) return <></>;

  if (isMasterAuthenticated === false) return <Login />;

  if (isMasterAuthenticated === true) return <MasterAdminHome />;
}

export default MasterAdmin;
