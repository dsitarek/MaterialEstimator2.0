import React, { useState } from 'react';
import MaterialRow from '../components/MaterialRow';

export default function Home() {
  const [formInput, setFormInput] = useState({ materialLine: '', toMetric: true });
  const [materials, setMaterials] = useState({ matObjArr: [] });

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    const ischecked = formInput[e.target.name];
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: !ischecked }));
  };

  const convertToMetric = (length) => length / 25.4;

  const materialInputSplitter = (input) => {
    const lengthsAndQuantities = [];
    const splitMats = input.split(' ');
    splitMats.forEach((element) => {
      const mat = element.split('*');
      let matLength = Number(mat[0]);
      const matQuantity = Number(mat[1]);

      if (formInput.toMetric) {
        matLength = convertToMetric(matLength);
      }

      lengthsAndQuantities.push({
        matLength,
        matQuantity,
      });
    });
    return lengthsAndQuantities;
  };

  const submitLengthsAndQuantities = (e, lengthsAndQuantities) => {
    e.preventDefault();
    setMaterials({ matObjArr: materialInputSplitter(lengthsAndQuantities) });
  };

  return (
    <div className="search-container">
      <form onSubmit={(e) => submitLengthsAndQuantities(e, formInput.materialLine)} className="material-entry-form-container">
        <input type="text" name="materialLine" placeholder="Enter Lengths and Quantities" className="input" value={formInput.materialLine} onChange={handleChange} tabIndex="0" />
        <input type="checkbox" name="toMetric" checked={formInput.toMetric} onChange={handleCheckbox} />
        <button className="btn-success material-input-btn" type="submit">Submit</button>
      </form>
      {materials.matObjArr
        ? (
          <div className="material-table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    Length
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Material
                  </th>
                </tr>
              </thead>
              <tbody>
                {materials.matObjArr ? materials.matObjArr.map((material) => <MaterialRow key={`material.matLength-${Date.now()}`} material={material} />) : ''}
              </tbody>
            </table>
          </div>
        ) : ''}
    </div>
  );
}
