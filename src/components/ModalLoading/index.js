import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const ModalLoading = ({
  loading = false,
  type = 'spin',
  subtext = '',
  size = '5rem',
  color = '#3C44B1',
}) => {
  return (
    <Modal zIndex={2000} centered size={'sm'} isOpen={loading}>
      <ModalBody className="p-5">
        <div className="d-flex align-items-center text-primary justify-content-center flex-column">
          {type === 'spin' ? (
            <span
              className="spinner-border spinner-border-lg"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <ReactLoading
              type={type}
              className="mr-3"
              color={color}
              width={size}
              height={size}
            />
          )}
          {subtext && (
            <div
              className="mt-2"
              style={{ fontWeight: 400, fontSize: 16, color: '#3B3E6680' }}>
              {subtext}
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

ModalLoading.propTypes = {
  loading: PropTypes.bool,
};

export default ModalLoading;
