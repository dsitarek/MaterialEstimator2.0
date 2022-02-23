import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MaterialRow from '../components/MaterialRow';
import { getMaterialTypes, createOrder } from '../data/dbCalls';

export default function Home() {
  const [formInput, setFormInput] = useState({ materialLine: '', toMetric: true, jobNumberInput: '' });
  const [materials, setMaterials] = useState({ matObjArr: [] });
  const [materialsOrder, setMaterialsOrder] = useState({});
  const [materialTypes, setMaterialTypes] = useState([]);

  useEffect(() => {
    getMaterialTypes().then(setMaterialTypes);
  }, []);

  const handleChange = (e) => {
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    const ischecked = formInput[e.target.name];
    setFormInput((prevState) => ({ ...prevState, [e.target.name]: !ischecked }));
  };

  const convertToMetric = (length) => (Math.round((length / 25.4) * 1000)) / 1000;

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
        key: `${matLength}-${matQuantity}-${uuidv4()}`,
      });
    });
    return lengthsAndQuantities;
  };

  const submitLengthsAndQuantities = (e, lengthsAndQuantities) => {
    e.preventDefault();
    setMaterials({ matObjArr: materialInputSplitter(lengthsAndQuantities) });
  };

  const submitOrder = (materialTable) => {
    const order = [];

    Object.values(materialTable).forEach((line) => order.push({
      ...line,
      jobNumber: formInput.jobNumberInput,
      date: new Date(),
    }));

    createOrder(order);
  };

  return (
    <div className="estimation-container">
      <div className="estimation-form-container">
        <form onSubmit={(e) => submitLengthsAndQuantities(e, formInput.materialLine)} className="material-entry-form-container">
          <textarea rows="2" cols="100" name="materialLine" placeholder="Enter Lengths and Quantities" className="material-input" value={formInput.materialLine} onChange={handleChange} tabIndex="0" />
          <input type="checkbox" name="toMetric" checked={formInput.toMetric} onChange={handleCheckbox} />
          <button className="btn-primary material-input-btn" type="submit">Submit</button>
        </form>
      </div>
      {materials.matObjArr.length > 0
        ? (
          <div className="material-container">
            <div className="material-table-container">
              <table className="material-table">
                <thead>
                  <tr>
                    <th className="material-table-header">
                      Length
                    </th>
                    <th className="material-table-header">
                      Quantity
                    </th>
                    <th className="material-table-header">
                      Material
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {materials.matObjArr ? materials.matObjArr.map((material, index) => <MaterialRow key={`${material.key}`} material={material} setMaterialsOrder={setMaterialsOrder} materialTypes={materialTypes} index={index} />) : ''}
                </tbody>
              </table>
            </div>
            <div className="order-create-group">
              <button type="button" className="btn btn-success" onClick={() => submitOrder(materialsOrder)}>Create Order</button>
              <input type="text" name="jobNumberInput" placeholder="Enter Job Number" className="input" value={formInput.jobNumberInput} onChange={handleChange} tabIndex="0" />
            </div>
          </div>
        ) : ''}
    </div>
  );
}
