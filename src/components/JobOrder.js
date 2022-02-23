import React from 'react';
import PropTypes from 'prop-types';
import OrderView from './OrderView';

export default function JobOrder({ jobNumber }) {
  return (
    <>
      <OrderView job={jobNumber} />
    </>
  );
}

JobOrder.propTypes = {
  jobNumber: PropTypes.string.isRequired,
};
