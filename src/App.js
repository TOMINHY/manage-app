import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { handleRefresh } from "./redux/actions/userActions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleRefresh());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <Header />
      <Container>
        <AppRoutes />
      </Container>
    </div>
  );
}

export default App;
