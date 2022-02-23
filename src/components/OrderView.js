import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CalculatedMaterial from './CalculatedMaterial';
import { getJobMaterials } from '../data/dbCalls';

export default function OrderView({ job }) {
  const [jobMaterials, setJobMaterials] = useState([]);

  const calculateJobMaterials = (mats) => {
    const totalMaterials = {};
    mats.forEach((material) => {
      totalMaterials[material.description] = {
        totalLength: 0, totalSticks: 0, recommendedBundles: 0, materialPN: material.materialPN, bundlePartNumber: material.bundlePartNumber, bundleQty: material.bundleQty,
      };
    });
    mats.forEach((material) => {
      totalMaterials[material.description].totalLength += material.materialLength;
    });
    mats.forEach((material) => {
      totalMaterials[material.description].totalSticks = totalMaterials[material.description].totalLength / material.stickLength;
      totalMaterials[material.description].recommendedBundles = totalMaterials[material.description].totalSticks / (material.bundleQty * 0.8);
    });

    const matsArray = [];

    (Object.entries(totalMaterials)).forEach(([key, value]) => matsArray.push({ description: key, ...value }));

    setJobMaterials(matsArray);
  };

  useEffect(() => {
    getJobMaterials(job).then((mats) => calculateJobMaterials(mats));
  }, []);

  return (
    <div className="job-calculation-continer">
      <h4>{job}</h4>
      <div>
        {jobMaterials ? jobMaterials.map((material) => <CalculatedMaterial key={material.materialPN} material={material} />) : ''}
        <button type="button" className="btn btn-danger delete-job-btn" onClick={() => console.log('delete')}>Delete</button>
      </div>
    </div>
  );
}

OrderView.defaultProps = {
  job: null,
};

OrderView.propTypes = {
  job: PropTypes.string,
};
