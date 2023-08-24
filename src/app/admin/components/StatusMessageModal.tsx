import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const StatusMessageModal = ({
  show,
  HandlerClose,
  Content,
}: {
  show: boolean;
  HandlerClose: () => void;
  Content: { message: string; status: boolean };
}) => {
  return (
    <Modal
      size="sm"
      centered
      show={show}
      onHide={HandlerClose}
      className="StatusMessModal"
    >
      <div className="SMModalWrapp">
        <div className="SMModal">
          <div className="ModalIcon">
            <span style={{ color: Content.status ? "#54a461" : "red" }}>
              <i className="bi bi-exclamation-circle"></i>
            </span>
          </div>
          <p className="ModalText">{Content.message}</p>
          <button className="btn ingdent-btn py-1 mt-0" onClick={HandlerClose}>
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StatusMessageModal;
