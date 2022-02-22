import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { getUser } from '../api/auth';

export default function MaterialRow({
  material, index, setMaterialsOrder, materialTypes,
}) {
  const [formInput, setFormInput] = useState({ materialType: '3842992425' });

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setMaterialsOrder((prevState) => ({
      ...prevState,
      [index]: {
        materialPN: formInput.materialType,
        materialLength: material.matLength,
        materialQuantity: material.matQuantity,
      },
    }));
  }, [formInput]);

  return (
    <>
      <tr>
        <th>
          {material.matLength}&#34;
        </th>
        <th>
          {material.matQuantity}
        </th>
        <th>
          <select id="materialType" name="materialType" value={formInput.materialType} aria-labelledby="material-type" onChange={handleChange}>
            {materialTypes.map((mat) => <option key={mat.PartNumber} value={mat.PartNumber}>{mat.Description}</option>)}
          </select>
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
  index: PropTypes.number.isRequired,
  setMaterialsOrder: PropTypes.func.isRequired,
  materialTypes: PropTypes.arrayOf(PropTypes.shape({
    BundlePartNumber: PropTypes.string,
    BundleQty: PropTypes.number,
    Description: PropTypes.string,
    PartNumber: PropTypes.string,
    Vendor: PropTypes.string,
    id: PropTypes.number,
    userId: PropTypes.string,
  })).isRequired,
};
