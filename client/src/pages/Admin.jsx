import useTheaterAdmin from "../store/TheaterAdmin";
import Login from "../components/TheaterAdmin/Login"
import AdminHome from "../components/TheaterAdmin/AdminHome"

function Admin() {
  const { isAdminAuthenticated } = useTheaterAdmin();

  if (isAdminAuthenticated === null) return <></>;
  if (isAdminAuthenticated === false) return <Login />;
  if (isAdminAuthenticated === true) return <AdminHome />;
}

export default Admin;
