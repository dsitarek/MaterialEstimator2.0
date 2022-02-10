import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { getUser } from '../api/auth';
import getMaterialTypes from '../data/dbCalls';

export default function MaterialRow({ material }) {
  const [materialTypes, setMaterialTypes] = useState([]);
  const [formInput, setFormInput] = useState({ materialPN: '' });

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    getMaterialTypes().then(setMaterialTypes);
  }, []);
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
          <select id="materialType" name="materialType" value={formInput.materialPN} aria-labelledby="material-type" onChange={handleChange}>
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
};
