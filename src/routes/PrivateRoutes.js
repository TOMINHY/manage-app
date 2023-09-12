import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
const PrivateRoutes = (props) => {
  const user = useSelector((state) => state.user.account);
  if (user && !user.email) {
    return (
      <>
        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permission access this route</p>
        </Alert>
      </>
    );
  }

  return <>{props.children}</>;
};
export default PrivateRoutes;
