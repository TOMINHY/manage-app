import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import TableUsers from "../components/TableUser";
import PrivateRoutes from "./PrivateRoutes";
import NotFoundPage from "./NotFoundPage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
