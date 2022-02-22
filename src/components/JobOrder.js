import React from 'react';
import PropTypes from 'prop-types';

export default function JobOrder({ jobNumber }) {
  return (
    <div>
      <h6>{jobNumber}</h6>
      <button type="button" className="btn btn-primary" onClick={() => console.log('click')}>View</button>
      <button type="button" className="btn btn-danger" onClick={() => console.log('click')}>Delete</button>
    </div>
  );
}

JobOrder.propTypes = {
  jobNumber: PropTypes.string.isRequired,
};
