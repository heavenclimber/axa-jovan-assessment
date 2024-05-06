import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import "./styles.scss";

const ModalPrompt = ({
  open = false,
  confirmText = "Confirm",
  title = "",
  handleSubmit,
  cancelButton = false,
  handleCancel,
  disabled = false,
  disabledCancel = false,
  loading = false,
  cancelText = "Cancel",
  titleColor = "#2a2a2a",
  children,
}) => {
  return (
    <Modal
      className="prompt-inventory"
      zIndex={2000}
      backdrop="static"
      centered
      size={"lg"}
      isOpen={open}
    >
      <ModalBody className="px-4">
        <div className="text-center py-3 px-5">
          <h3 className="prompt-title" style={{ color: titleColor }}>
            {title}
          </h3>
          {children}
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ gap: 32 }}
          >
            {cancelButton && (
              <Button
                onClick={handleCancel}
                outline
                color="primary"
                className="prompt-button"
                disabled={disabledCancel || loading}
              >
                <span className="btn-wrapper--label">{cancelText}</span>
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              color="primary"
              className="prompt-button"
              disabled={disabled || loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-lg"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <span className="btn-wrapper--label">{confirmText}</span>
              )}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalPrompt;
