import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./styles.scss";

const PhotoList = ({ data = [], goBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState({});

  const selectPhoto = (e = {}) => {
    setSelectedPhoto(e);
  };

  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-start"
        style={{ marginBottom: 15 }}
      >
        <Modal
          centered
          size="lg"
          backdrop
          isOpen={selectedPhoto?.url}
          toggle={() => {
            setSelectedPhoto({});
          }}
        >
          <ModalHeader
            toggle={() => {
              setSelectedPhoto({});
            }}
          >
            <strong>{selectedPhoto?.title}</strong>
          </ModalHeader>
          <ModalBody>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={selectedPhoto?.url}
                alt={selectedPhoto?.url}
                class="photo-thumbnail"
              />
            </div>
          </ModalBody>
        </Modal>
        <Button
          color="primary"
          outline
          onClick={() => {
            goBack();
          }}
        >
          Back
        </Button>
      </div>
      <div class="photo-card-list">
        {data?.map((e) => {
          return (
            <div
              class="photo-card"
              onClick={() => {
                selectPhoto(e);
              }}
            >
              <img
                src={e?.thumbnailUrl}
                alt={e?.thumbnailUrl}
                class="photo-thumbnail"
              />
              <div class="photo-details">
                <h2 class="photo-title">{e?.title}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoList;
