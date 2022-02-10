import React from 'react';
import PropTypes from 'prop-types';

export default function MaterialRow({ material }) {
  return (
    <>
      <tr>
        <th>
          {material.matLength}
        </th>
        <th>
          {material.matQuantity}
        </th>
        <th>
          Material
        </th>
      </tr>
    </>
  );
}

MaterialRow.propTypes = {
  material: PropTypes.shape({
    matLength: PropTypes.number,
    matQuantity: PropTypes.number,
  }).isRequired,
};
