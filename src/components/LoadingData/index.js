import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const LoadingData = ({ loadingFailed = false, fetchData }) => {
  return (
    <div className="p-4 d-flex align-items-center justify-content-center">
      {loadingFailed ? (
        <div className="p-4 d-flex align-items-center justify-content-center flex-column">
          <h4 className="mb-3">Something wrong, please try again</h4>
          <Button color="primary" onClick={() => fetchData()}>
            Refresh
          </Button>
        </div>
      ) : (
        <ReactLoading
          type="bars"
          className="mr-3"
          color="#3C44B1"
          width={75}
          height={75}
        />
      )}
    </div>
  );
};

LoadingData.propTypes = {
  loadingFailed: PropTypes.bool,
  fetchData: PropTypes.func,
};

export default LoadingData;
