import useTheaterAdmin from "../store/TheaterAdmin";
import Login from "../components/TheaterAdmin/Login";
import AdminHome from "../components/TheaterAdmin/AdminHome";
import { useEffect } from "react";

function Admin() {
  const { isAdminAuthenticated, getTheaterAdmin } = useTheaterAdmin();

  useEffect(() => {
    getTheaterAdmin();
  }, []);

  if (isAdminAuthenticated === null) return <></>;
  if (isAdminAuthenticated === false) return <Login />;
  if (isAdminAuthenticated === true) return <AdminHome />;
}

export default Admin;
