import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalComfirm = (props) => {
  const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } =
    props;
  const handleComfirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user succeed!", {
        delay: false,
        pauseOnHover: false,
      });
      handleDeleteUserFromModal(dataUserDelete);
      handleClose();
    } else {
      toast.error("Error delete user", {
        delay: false,
        pauseOnHover: false,
      });
    }
  };
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          <p style={{ marginBottom: 0 }}> Are you sure delete this user?</p>
          <strong>{`Email: ${dataUserDelete.email}`}</strong>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleComfirmDelete}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalComfirm;
