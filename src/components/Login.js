import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const isLoading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);
  useEffect(() => {
    if (account && account.email) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required!", {
        delay: false,
        pauseOnHover: false,
      });
    }
    dispatch(handleLoginRedux(email, password));
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container col-12">
      <h3 className="title">Log in</h3>
      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        className="login-input"
        type="text"
        placeholder="Email or username..."
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div style={{ position: "relative" }}>
        <input
          className="login-input input-password"
          type={isShowPassword ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(event) => handlePressEnter(event)}
        />
        <i
          className={`eye-close ${
            isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
          } `}
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>
      <button
        disabled={email && password ? false : true}
        className={email && password ? "active" : ""}
        onClick={handleLogin}
      >
        {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
        &nbsp;Login
      </button>
      <div className="back" onClick={handleGoBack}>
        <i
          className="fa-solid fa-angles-left fa-shake"
          style={{ "--fa-animation-duration": "2s" }}
        ></i>
        Go back
      </div>
    </div>
  );
};
export default Login;
