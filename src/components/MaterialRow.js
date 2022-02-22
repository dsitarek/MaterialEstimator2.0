import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { getUser } from '../api/auth';

export default function MaterialRow({
  material, index, setMaterialsOrder, materialTypes,
}) {
  const [formInput, setFormInput] = useState({
    materialPN: '3842992425', bundleQty: 20, stickLength: 243, vendor: 'Bosch', bundlePartNumber: '3842553612',
  });

  const handleChange = (e) => {
    setFormInput(() => ({
      materialPN: e.target.value,
      bundleQty: Number(e.target[e.target.selectedIndex].dataset.bundleqty),
      stickLength: Number(e.target[e.target.selectedIndex].dataset.sticklength),
      vendor: e.target[e.target.selectedIndex].dataset.vendor,
      bundlePartNumber: e.target[e.target.selectedIndex].dataset.bundlepartnumber,
    }));
    console.log(e.target[e.target.selectedIndex].dataset.bundleqty);
  };

  useEffect(() => {
    setMaterialsOrder((prevState) => ({
      ...prevState,
      [index]: {
        ...formInput,
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
          <select id="materialPN" name="materialPN" value={formInput.MaterialPN} aria-labelledby="material-pn" onChange={handleChange}>
            {materialTypes.map((mat) => (
              <option
                key={mat.PartNumber}
                value={mat.PartNumber}
                data-bundlepartnumber={mat.BundlePartNumber}
                data-vendor={mat.Vendor}
                data-sticklength={mat.StickLength}
                data-bundleqty={mat.BundleQty}
              >{mat.Description}
              </option>
            ))}
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
    StickLength: PropTypes.number,
    id: PropTypes.number,
    userId: PropTypes.string,
  })).isRequired,
};
